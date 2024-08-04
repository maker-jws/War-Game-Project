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
const computerCardsEl = document.querySelector('#computer-cards-wrap')
const playerCardsEl = document.querySelector('#player-cards-wrap')
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

// PSEUDOCODE

// CURRENT Feature
/* 
Feature: Game over for empty computer deck 
Requirements: 
function - checkWin() - called after each turn - before draw()
- variable - computerDeck - check length if empty
- calls endGame( winner ) 
*/

/* 
Feature: Game over Message and Play Again UI 
Requirements:
function - renderWin() - called by endGame( winner )

  - updates game message
  - hides game board
  - reveals reset
*/

// ICEBOX
/* 
Feature: Restart game on 'play again' interaction 
Requirements: 
dom element - resetButtonEl (hidden after game load / initial reset listener)
function - resetGame() - triggered by reset/restart button after win

*/

// DONE

/* 

Feature: Exit war and UI updates 
Requirements: 
- function - handleWarWinner() 
- called by checkWinner() to evaluate last card in player's war decks (determine winner or game over) - DONE
    - if war occurs again in checkWinner() - call handleWar() recurse - DONE
    - if war round won inside later handlewWarWinner() - DONE

- handleWarWinner(winner) - called inside checkWinner()
  - update state and reset war decks and current cards - DONE
  - call revealDrawButton() - DONE

/* 
Feature: Render War Hands for Each Player 
Requirements: 
- params - renderWarCards(cards, target) - DONE
- reset innerHTML
- use iterator to render multiple cards (one face up, one or more face down)
*/

/* 
Feature: Update Game UI for War Turn 
Requirements: 

- add current player cards to respective warDecks - DONE
- call handleWar()
-   draw 2 cards from players hands if available or gameOver()- DONE
-   insert 2 cards (for each player) into respective war decks - DONE
-   call renderWarCards() - with all necessary arguments (clear current card HTML first) - DONE
-   call checkWinner()
*/

/* 
Feature: Update Game UI with game status (Player and Computer) 
Requirements: 
- function - renderMessage() - called in handleDraw() - updates game message DOM el - DONE
- function - renderGameStats() - updates playerWin / computerWin DOM el, deck counts - DONE 
- functions - renderPlayerHands() players hand Size - (deck.length) - Redudant - DONE
*/

/* 
Feature: Render players' current card 
Requirements: 
- HTML content for assigning player card content - DONE
- HTML content for assigning computer card content - DONE 
- variable - p1Card -> set in playerTurn()
- variable - p2Card -> set in computerTurn()
- renderCard() function to display current cards (data) for each player's container area (target). - DONE
- renderCard() is called by handleDraw() - for both players - DONE 
- Additional params added later - faceup, war, offset, - DONE
*/

/* 
Feature: Draw card UI interaction 
Requirements: 
- DOM el - draw button
- event listener for draw button - calls handleDraw()
- handler - handleDraw() function to pop() last Card {} for players from respective decks
  - variable - p1Card - updated in playerTurn() - DONE
  - variable - p2Card (computer)- updated in playerTurn() - DONE
- HandleDraw() disables button until winner of turn is determined - DONE
- handleDraw() calls playerTurn() and computerTurn() - which set state and render current cards - DONE 
*/

/* 
Feature: Create deck and deal shuffled cards 
Requirements:
- variable for playerDeck [] - DONE
- variable for computerDeck [] - DONE 
- variable for pWarDeck [] - DONE 
- variable for cWarDeck [] - DONE 
- class for creating cards { suit, face, value, className, asset, } - DONE
- class for creating deck - DONE
- class method to shuffle deck [] - DONE 
- class method to return shuffled deck to hands (param - p1, p2) - DONE 
*/

/*
Feature: Game UI (game message, cards counts, turns won, etc) 

Requirements: 
- HTML Content container to include message, player and computer card counts, turns won
- DOM el - cache container - DONE
- DOM el - container should be hidden on page load - DONE
- DOM el - container should be revealed on start - DONE 
- DOM el - message should be initial state - DONE
- DOM el - card counts for players (2) - DONE
- DOM el - win counts for players (2) - DONE
*/

/* 
Feature: Start Game UI 
Requirements: 
- HTML content displaying a start button - DONE
- MVP: DOM el caching start button - DONE
- DOM el - on click instructions should be hidden  - DONE 
- event listener for start button - on click - start game functionality is called - DONE
- event handler should also reveal game ui and trigger deck / shuffle functionality - DONE
*/

/* 
Feature: Game Instructions 
Requirements: 
- MVP: HTML content displaying at bottom of screen - lorem ipsum okay to start - DONE
- Stretch: content is hidden while game is running - DONE 
*/

/* 
Feature: Landing Page 
Requirements: 
- HTML content displaying name of game - DONE
- HTML content including game icon - DONE
- HTML styling that separates the header from the gameboard - DONE
*/
