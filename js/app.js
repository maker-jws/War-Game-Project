// VARIABLES
let playerDeck;
let computerDeck;
let playerWins = 0;
let computerWins = 0;
let gameWinner = null;
let p1Card = null;
let p2Card = null;
let pWarDeck = [];
let cWarDeck = [];
let debug = false;

// DOM CACHE
// UI - layout
const gameBoardEl = document.querySelector("#gameboard");
const instructionsEl = document.querySelector("#instructions");
const computerCardsEl = document.querySelector("#computer-cards .card-wrap");
const playerCardsEl = document.querySelector("#player-cards .card-wrap");

// UI - buttons
const drawCardEl = document.querySelector("#draw-button");
const resetButtonEl = document.querySelector("#reset-button");
const startButtonEl = document.querySelector("#start-game");
// UI - game state
const gameMessageEl = document.querySelector("#game-message");
const computerDeckSizeEl = document.querySelector("#computer-deck-size");
const playerDeckSizeEl = document.querySelector("#player-deck-size");
const computerWinsEl = document.querySelector("#computer-wins");
const playerWinsEl = document.querySelector("#player-wins");


// FUNCTIONS
const disableDrawButton = () => (drawCardEl.disabled = true);
const enableDrawButton = () => (drawCardEl.disabled = false);
const renderMessage = (msg) => (gameMessageEl.textContent = msg);

const renderGameStats = () => {
  computerDeckSizeEl.textContent = computerDeck.length;
  playerDeckSizeEl.textContent = playerDeck.length;
  computerWinsEl.textContent = computerWins;
  playerWinsEl.textContent = playerWins;
};

const createDeck = (isTest = false) => {
  const deck = isTest ? new TestDeck() : new Deck();
  deck.createDeck(isTest);
  deck.shuffle();
  deck.shuffle();
  deck.shuffle();
  return deck.split();
};

const resetCards = () => {
  p1Card = null;
  p2Card = null;
};

const resetWarDecks = () => {
  pWarDeck = [];
  cWarDeck = [];
};

const resetPlayerStats = () => {
  playerWins = 0;
  computerWins = 0;
  playerDeck = null;
  computerDeck = null;
  resetCards();
  resetWarDecks();
};

const renderWinner = () => {
  drawCardEl.classList.add("hidden");
  playerCardsEl.classList.remove("hidden");
  renderMessage(`Game Over - Winner is: ${gameWinner}`);
};

const renderCard = (
  data,
  target,
  faceDown = false,
  war = false,
  offset = 0
) => {
  if (!war) target.innerHTML = "";

  const newCard = document.createElement("div");
  newCard.classList.add("card", "flex-ctr-ctr", data.asset);
  newCard.setAttribute("data-value", data.value);

  if (war) {
    newCard.style.top = `${0.66 * offset}px`;
    newCard.style.left = `${offset}px`;
  }

  if (faceDown) {
    newCard.classList.add("face-down");
  } else {
    newCard.textContent = `${data.face}-${data.suit}`;
  }

  target.appendChild(newCard);
};

const renderWarCards = (cards, target) => {
  target.innerHTML = "";
  cards.forEach((card, idx) => {
    renderCard(card, target, idx + 1 < cards.length, true, 15 * idx);
  });
};

const gameOver = () => {
  renderWinner();
  resetPlayerStats();
};

const continueGame = () => {
  return playerDeck.length && computerDeck.length;
};

const determineWinner = () => {
  if (playerDeck.length > computerDeck.length) {
    gameWinner = "The Player";
  } else {
    gameWinner = "The Computer";
  }
};

const checkGameWinner = () => {
  determineWinner();
  return gameOver();
};

const handleWar = () => {
  // check if game is over at Start of War
  if (playerDeck.length < 2 || computerDeck.length < 2) {
    return checkGameWinner();
  }

  pWarDeck.push(playerDeck.pop(), playerDeck.pop());
  cWarDeck.push(computerDeck.pop(), computerDeck.pop());

  p1Card = pWarDeck.at(-1);
  p2Card = cWarDeck.at(-1);

  renderWarCards(pWarDeck, playerCardsEl);
  renderWarCards(cWarDeck, computerCardsEl);

  checkWinner(true);
};

const playerTurn = () => {
  p1Card = playerDeck.pop();
  p1Card && renderCard(p1Card, playerCardsEl, false);
};

const computerTurn = () => {
  p2Card = computerDeck.pop();
  p2Card && renderCard(p2Card, computerCardsEl, true);
  renderCard(p2Card, computerCardsEl, false);
};

const handleWarWinner = (winner) => {
  renderMessage(`The war winner is ${winner}`);

  if (winner === "player") {
    playerDeck.unshift(...pWarDeck, ...cWarDeck);
    playerWins++;
  } else {
    computerDeck.unshift(...cWarDeck, ...pWarDeck);
    computerWins++;
  }

  resetCards();
  resetWarDecks();

  renderGameStats();

  setTimeout(enableDrawButton, 2000);
};

const handleWinner = (winner) => {
  renderMessage(`The winner is '${winner[0].toUpperCase() + winner.slice(1)}'`);

  if (winner === "player") {
    playerDeck.unshift(p2Card, p1Card);
    playerWins++;
  } else {
    computerDeck.unshift(p1Card, p2Card);
    computerWins++;
  }

  resetCards();
  renderGameStats();

  setTimeout(enableDrawButton, 1500);
};

const checkWinner = (war = false) => {
  renderGameStats();

  if (p1Card && p2Card) {
    let roundWinner;
    if (p1Card.value === p2Card.value) {
      renderMessage("It is war");
      pWarDeck.push(p1Card);
      cWarDeck.push(p2Card);
      return handleWar();
    } else if (p1Card.value > p2Card.value) {
      roundWinner = "player";
    } else {
      roundWinner = "computer";
    }

    if (war) {
      handleWarWinner(roundWinner);
    } else {
      handleWinner(roundWinner);
    }
  } else {
    return checkGameWinner();
  }

  if (!continueGame()) {
    return checkGameWinner();
  }
};

const handleDraw = () => {
  if (!continueGame()) {
    return checkGameWinner();
  }

  disableDrawButton();
  playerTurn();
  computerTurn();
  checkWinner();
};

const resetGame = () => {
  gameBoardEl.style.display = "none";
  instructionsEl.style.display = "block";
  resetButtonEl.classList.add("hidden");
  enableDrawButton();
  renderMessage("");
};

const startGame = () => {
  gameBoardEl.style.display = "flex";
  instructionsEl.style.display = "none";
  drawCardEl.classList.remove("hidden");

  const [p1, p2] = createDeck(debug);
  playerDeck = p1;
  computerDeck = p2;

  renderMessage("Press 'Draw Card' button to start");
  renderGameStats();
};

// EVENT LISTENERS
startButtonEl.addEventListener("click", startGame);
resetButtonEl.addEventListener("click", resetGame);
drawCardEl.addEventListener("click", handleDraw);
