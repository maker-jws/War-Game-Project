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
// PSEUDOCODE
// ICEBOX
/* 
Feature: Game over for empty computer deck 
Requirements: 
function - continueGame() - called after each turn - before draw()
- variable - computerDeck - check length if empty
- calls determineWinner()
*/

/* 
Feature: Game over Message and Play Again UI 
Requirements:
resetButtonEl - DOM (hidden by default)

function - determineWinner() - called by gameOver( )
function - renderWinner()
  - updates game message
  - hides draw button
  - reveals reset button
*/

/* 
Feature: Restart game on 'play again' interaction 
Requirements: 
dom element - resetButtonEl (hidden after game load / initial reset listener)
function - resetGame() - triggered by reset/restart button after win

*/

// COMPLETED FEATURE  

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
- DOM el - cache container - BLOCKER
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

// Future Features
// TODO - create testGameOver function
// TODO - create testWar function
// TODO - create testWarChain function
// TODO - refactor state to class instances (Player)
// CURRENT Feature
/* 
Feature: Game over for empty computer deck 
Requirements: 
function - checkWin() - called after each turn - before draw()
- variable - computerDeck - check length if empty
- calls endGame( winner ) 
*/
```
