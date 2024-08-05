// CONSTANTS

// VARIABLES
let playerDeck
let computerDeck
let playerWins = 0
let computerWins = 0
let gameWinner = null
let p1Card = null
let p2Card = null
let pWarDeck = []
let cWarDeck = []
let debug = false
// DOM CACHE
// UI - layout
const gameBoardEl = document.querySelector('#gameboard')
const instructionsEl = document.querySelector('#instructions')
const computerCardsEl = document.querySelector('#computer-cards .card-wrap')
const playerCardsEl = document.querySelector('#player-cards .card-wrap')

// UI - buttons
const drawCardEl = document.querySelector('#draw-button')
const startButtonEl = document.querySelector('#start-game')
// UI - game state
const gameMessageEl = document.querySelector('#game-message')
const computerDeckSizeEl = document.querySelector('#computer-deck-size')
const playerDeckSizeEl = document.querySelector('#player-deck-size')
const computerWinsEl = document.querySelector('#computer-wins')
const playerWinsEl = document.querySelector('#player-wins')

// CLASSES

class Card {
  constructor(value, suit, face, asset = 'card') {
    this.value = value
    this.suit = suit
    this.face = face
    this.asset = asset
  }
}

class Deck {
  static suits = ['heart', 'diamond', 'spades', 'clubs']
  static values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  static faces = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
    'A',
  ]
  constructor() {
    this.cards = []
  }

  createDeck(isTest = false) {
    const newDeck = []
    let ClassRef = isTest ? TestDeck : Deck
    ClassRef.suits.forEach((suit) => {
      ClassRef.values.forEach((val, idx) => {
        newDeck.push(new Card(val, suit, ClassRef.faces[idx]))
      })
    })
    this.cards = newDeck
  }
  shuffle() {
    // fisher-yates algo: source geeks for geeks
    for (let i = this.cards.length - 1; i > 0; i--) {
      // Pick a random index from 0 to i inclusive
      let j = Math.floor(Math.random() * (i + 1))

      // Swap arr[i] with the element
      // at random index
      ;[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
    }
  }
  split() {
    const p1 = []
    const p2 = []
    let count = 0
    while (this.cards.length) {
      let card = this.cards.splice(
        Math.floor(Math.random() * this.cards.length),
        1
      )
      if (count % 2 == 0) {
        p1.push(...card)
      } else {
        p2.push(...card)
      }
      count++
    }

    return [p1, p2]
  }
}

class TestDeck extends Deck {
  static suits = ['heart', 'diamond']
  static values = [2, 3, 4, 5, 6, 7, 8]
  static faces = ['2', '3', '4', '5', '6', '7', '8']
}

// FUNCTIONS

const disableDrawButton = () => (drawCardEl.disabled = true)
const enableDrawButton = () => (drawCardEl.disabled = false)

const renderMessage = (msg) => {
  gameMessageEl.textContent = msg
}

const renderGameStats = () => {
  computerDeckSizeEl.textContent = computerDeck.length
  playerDeckSizeEl.textContent = playerDeck.length
  computerWinsEl.textContent = computerWins
  playerWinsEl.textContent = playerWins
}

const createDeck = (isTest = false) => {
  const deck = isTest ? new TestDeck() : new Deck()
  deck.createDeck(isTest)
  deck.shuffle()
  deck.shuffle()
  deck.shuffle()
  return deck.split()
}

const renderCard = (
  data,
  target,
  faceDown = false,
  war = false,
  offset = 0
) => {
  if (!war) target.innerHTML = ''

  const newCard = document.createElement('div')
  newCard.classList.add('card', data.asset)
  newCard.setAttribute('data-value', data.value)

  if (war) {
    newCard.style.top = `${0.66 * offset}px`
    newCard.style.left = `${offset}px`
  }

  if (faceDown) {
    newCard.classList.add('face-down')
  } else {
    newCard.textContent = `${data.face}-${data.suit}`
  }

  target.appendChild(newCard)
}

const renderWarCards = (cards, target) => {
  target.innerHTML = ''
  cards.forEach((card, idx) => {
    renderCard(card, target, idx + 1 < cards.length, true, 15 * idx)
  })
}

const gameOver = () => {
  renderMessage(`Game Over - Winner is: ${gameWinner || 'TBD'}`)
}

const handleWar = () => {
  // check if game is over at Start of War
  if (playerDeck.length < 2 || computerDeck.length < 2) {
    if (playerDeck.length > computerDeck.length) {
      gameWinner = 'The Player'
    } else {
      gameWinner = 'The Computer'
    }
    return gameOver()
  }

  pWarDeck.push(playerDeck.pop(), playerDeck.pop())
  cWarDeck.push(computerDeck.pop(), computerDeck.pop())

  p1Card = pWarDeck.at(-1)
  p2Card = cWarDeck.at(-1)

  renderWarCards(pWarDeck, playerCardsEl)
  renderWarCards(cWarDeck, computerCardsEl)

  checkWinner(true)
}

const playerTurn = () => {
  p1Card = playerDeck.pop()
  p1Card && renderCard(p1Card, playerCardsEl, false)
}

const computerTurn = () => {
  p2Card = computerDeck.pop()
  p2Card && renderCard(p2Card, computerCardsEl, true)
  renderCard(p2Card, computerCardsEl, false)
}

const handleWarWinner = (winner) => {
  renderMessage(`The war winner is ${winner}`)

  if (winner === 'player') {
    playerDeck.unshift(...pWarDeck, ...cWarDeck)
    playerWins++
  } else {
    computerDeck.unshift(...cWarDeck, ...pWarDeck)
    computerWins++
  }

  p1Card = null
  p2Card = null
  pWarDeck = []
  cWarDeck = []

  renderGameStats()

  setTimeout(enableDrawButton, 2000)
}

const handleWinner = (winner) => {
  renderMessage(`The winner is ${winner}`)

  if (winner === 'player') {
    playerDeck.unshift(p2Card, p1Card)
    playerWins++
  } else {
    computerDeck.unshift(p1Card, p2Card)
    computerWins++
  }

  p1Card = null
  p2Card = null

  renderGameStats()
  setTimeout(enableDrawButton, 1500)
}

const checkWinner = (war = false) => {
  if (p1Card && p2Card) {
    let roundWinner
    if (p1Card.value === p2Card.value) {
      renderMessage('It is war')
      pWarDeck.push(p1Card)
      cWarDeck.push(p2Card)
      return handleWar()
    } else if (p1Card.value > p2Card.value) {
      roundWinner = 'player'
    } else {
      roundWinner = 'computer'
    }
    if (war) {
      handleWarWinner(roundWinner)
    } else {
      handleWinner(roundWinner)
    }
  } else {
    gameOver()
  }
}

const handleDraw = () => {
  disableDrawButton()
  playerTurn()
  computerTurn()
  checkWinner()
}

const startGame = () => {
  gameBoardEl.style.display = 'flex'
  instructionsEl.style.display = 'none'
  renderMessage('Press Draw Card to Start Game')

  const [p1, p2] = createDeck(debug)
  playerDeck = p1
  computerDeck = p2
  renderGameStats()
}

// EVENT LISTENERS
startButtonEl.addEventListener('click', startGame)
drawCardEl.addEventListener('click', handleDraw)

