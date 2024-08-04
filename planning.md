# War Card Game Planning Example:

## Browser Based Game Project Documentation Review

### Requirements

- Code / Conventions:

  - game includes win/loss logic and messages in the HTML 
  - game should have win/loss condition (and a gameover UI)
  - application has css / js directories with separate files
  - game meets all additional requirements of the project requirements
  - game should be deployed to github pages from the project repo
  - game runs without errors
  - game conforms to code conventions covered in class
  - all unused code is removed from repo before submitting final version of the project
  - prompt and alert functions are not used in final version of the project
  - final code is properly formatted and indented
  - CSS layout tools are used for the styling (flex or grid)

- User Experience / Accessiblity

  - users are provided some written instructions somewhere on the page
  - text is readable and includes a high-contrast font color
  - all image assets have an alt text attribute
  - all text must be selectable (machine-readable)

- Version Control
  - project uses git to manage version control
  - project codebase is stored on github
  - project repo is named to match the game
  - project repo includes a README.md file with the following content:
    - logo/screenshot of game UI
    - games name and background information
    - getting Started section with link to deployment and planning materials
    - citations / attributions for content that you used for inspiration / guidance
    - technologies used
    - future features / ice box / next steps
  - project will be presented (live or by recording) on the presentation.

### Recommended Games

- Playing card game of your choice approved by an instructor
- Game chosen - War
  - Requirements:
    - win condition
    - theme (styling)
    - uses card game starter
    - provide instructor with initial data structure (variables)

### Project Details

- KISS - keep it simple
- MVP - minimum viable product - only core functionality and basic styling
- Includes a theme
- Build the smallest amount of features to test as you go
- Review Planning BBG
- Review How to build a game doc - DONE
  - have init
  - use data centric approach - game state is recorded in the correct data structures
  - use render functions to update UI - cache DOM nodes if used in multiple functions

### Deliverables (Draft)

## User Stories

- As a user, I want to see a landing page when I arrive at the website to know I’m in the right place.
- AAU, I want to see clearly labeled button for starting the game on the landing page, so I can control when I am ready to start.
- AAU, I want to see information and/or instructions about the game so I know how I will play the game.
- AAU, after the game has started, I would like to see a message, or score, showing the number of cards each player has in their hand.
- AAU, after the game has started, I would like a random selection of cards dealt to each player.
- AAU, after the game has started, I want to see clearly labeled button to 'draw' a card - to progress the game.
- AAU, when I click the 'draw' button, I want to see my 'top' card from my hand. After my card is drawn, the computer's card should be shown.
- AAU, after a card is drawn for the player and computer, I would like to see a message that tell's me if I won the turn.
- AAU, after drawing my card, if I won I would like to see my card count increase
- AAU, after drawing my card, if I lost I would like to see my card count decrease
- AAU, after drawing my card, if my card value matches the computer, I would like to see a 'War' message appear on the screen.
- AAU, if 'War' is active I would like to see one card draw (face-down), and a second card drawn face up for each player
- AAU, depending on the outcome of war turn, I would like to see game status message update and player deck counts change.
- AAU, if I run out of cards in my hand (at the start of a turn, or during war turn), I would like to know that the computer 'won' the game.
- AAU, if my opponent run has not cards left (at the start of a turn, or during war turn), I would like to know that I 'won' the game.
- AAU, if either player has won, I want to see a 'game over' message appear and a 'play again?' button replace the current cards.
- AAU, If I click the 'play again' button, I want the game to restart and the deck of cards to be shuffled.

## Psuedocode

```js
/* 
Feature: Landing Page 
Requirements: 
- HTML content displaying name of game
- HTML content including game icon
- HTML styling that separates the header from the gameboard
*/

/* 
Feature: Start Game UI 
Requirements: 
- HTML content displaying a start button
- MVP: DOM el caching start button
- DOM el - on click should be hidden  
- event listener for start button - on click - start game functionality is called 
- event handler should also reveal game ui and trigger deck / shuffle functionality 
*/

/* 
Feature: Game Instructions 
Requirements: 
- MVP: HTML content displaying at bottom of screen - lorem ipsum okay to start 
- Stretch: content is hidden while game is running
*/

/* 
Feature: Game UI (game message, cards counts, turns won, etc) 
Requirements: 
- HTML Content container to include message, player and computer card counts, turns won
- DOM el - cache container
- DOM el - container should be hidden on page load
- DOM el - container should be revealed on start
- DOM el - message should be initial state 
- DOM el - card counts for players (2)
- DOM el - win counts for players (2)
*/

/* 
Feature: Create deck and deal shuffled cards 
Requirements:
- variable for playerDeck []
- variable for computerDeck []
- variable for playerWarDeck []
- variable for computerWarDeck []
- class for creating cards { suit, face, value, className, asset }
- class for creating deck
- class method to shuffle deck []
- class method to deal shuffled deck to hands (param - p1, p2)
*/

/* 
Feature: Draw card UI interaction 
Requirements: 
- DOM el - draw button
- event listener for draw button - calls handleDraw()
- handler - handleDraw() function to pop() last Card {} for players from respective decks
  - variable - playerCard 
  - variable - computerCard
- handleDraw() disables button until winner of turn is determined 
- handleDraw() calls playerTurn() and computerTurn() that draws cards and calls renderCard()

*/
/* 
Feature: Render players' current card 
Requirements: 
- HTML content for assigning player card content 
- HTML content for assigning computer card content 
- render function to display current cards (params or global variables?) for each player's container area. 
- renderCurrentCards() calls determineWinner() (stretch after delay) - refactored
*/

/* 
Feature: Determine Winner 
Requirements: 
- variable - playerWins
- variable - computerWins
- Function (p1Deck, p2Deck)
- evaluates the last card object arguments for match (WAR) - call triggerWar() / return
- evaluate cards - if value of card1 > card2 - winner is player1 else player2 
- move cards to bottom of correct hand
- update _Wins variable
- removes disabled attribute for draw button (after delay) 
- call renderGameUI()
*/

/* 
Feature: Update Game UI with game status (Player and Computer) 
Requirements: 
- function - called in render() - updates game message DOM el
- function - renderWins() - updates playerWin / computerWin DOM el
- functions - renderPlayerHands() players hand Size - (deck.length)
*/

/* 
Feature: Update Game UI for War Turn 

Requirements: 
- draw 2 cards from players hands 
- insert 2 cards (for each player) into respective war decks
- evaluate last card in player's war decks (determine winner or game over)
- call hideDrawButton()
- call renderWarHands()
- delay - call determineWarWinner()
  - if war - call triggerWar() functions again
  - if round won - trigger - exitWar()
*/

/* 
Feature: Render War Hands for each player 
Requirements: 
- params - renderWarCards(p1Cards, p2Cards)
- use iterator to render multiple cards (one face up, one or more face down)
*/

/* 
Feature: Exit war and UI updates 
Requirements: 
- function - exitWar()
- After war ends, update winner's deck 
- revealDrawButton() - (stretch - on delay)

*/

/* 
Feature: Game over for empty player deck 
Requirements: 
function - checkWin() - called after each turn - before draw()
- variable - playerDeck - check length if empty
- calls endGame( winner )

*/

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

/* 
Feature: Restart game on 'play again' interaction 
Requirements: 
dom element - resetButtonEl (hidden after game load / initial reset listener)
function - resetGame() - triggered by reset/restart button after win

*/

// ICEBOX Features
// TODO - create testGameOver function
// TODO - create testWar function
// TODO - create testWarChain function
// TODO - refactor state to class instances (Player)
```
