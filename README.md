# Othello
Gainlife Coding Challenge - Othello

# Prompt
Program the game “Othello” (https://www.eothello.com/) as a SPA using Typescript, React, and Webpack.

Please provide a zip file containing a git repository of the application.

The app should be able to be run locally (using webpack dev-server) with following commands

unzip othello.zip && cd othello && npm install
npm start

It should run on Unix systems.

Document your steps to solving the game logic / writing the webpage in your commits.

While this is a silly game, let’s treat it as a business problem. Please make your code extensible, so that it can support any requirements that the business team might throw your way (how might they want to change the game to make it more interesting or easier to sell).

Feel free to program any ideas that you come up with that change the original game (while still supporting the vanilla Othello), or in a follow up meeting with me show me how you planned to support the feature (and that the current code will support it)

Don’t write a backend, login page, or anything else that is a distraction from the actual challenge


# Steps and Goals
## Required
1. Set up infrastructure ✅
    - React
    - Webpack
    - Typescript
    - EsLint
    - SCSS
2. Redux w/ Toolkit ✅
3. Game board ✅ 
4. Tiles ✅
5. Game logic ✅
6. Show winner ✅

## Future Features
- Save and resume game state
  - Local Storage serialized game state
- Replay game history
- Landing screen
  - Continue
    - Resume game state implemented
  - New Game ✅
    - Local Multiplayer ✅
    - AI ✅
    - Online
- Tile animations ✅
  - Show tiles flipping and changing color
- Theming
  - Ability to change total colors/theme
- Game customization
  - Custom rulesets
    - Try to have min tiles
  - Starting configs
    - Board size
    - Board shape

# Postmortem
## What I did well
- The game logic is set up without hard-coded constants, even the board size or starting player, so custom boardsizes or starting players would be easy
- Loading a different starting layout would be easy as well with the reducer set up to load a new game
  - Didn't provide a way for this since I didn't want to get too heavy into new-game config
- Tile animations and hover are clean and simple
- Everything is pretty readable and colors are not over-used
- Tiles are buttons so they are accessible to keyboard input
- AI logic is "replacable" in that there are already two difficulties so that adding more would not take significant more effort
- Changing the win condition (Custom Rulesets) would be very easy to do if asked to do so
- With current helpers, serializing the state of the game would have been simple to load from localstorage or a server
- With redux, implementing "time travel" through the game would be easy and could be done with a placed tileset, using written helpers or serializing the entire game state
## What I could have done better
- Added a component library for a true "new game" setup with config options
- Styled the buttons and win text better, for a more aesthetic approach
  - Could have re-used the "waiting on AI" popover for the board to pop-up a You Won or You Lost message
- No support built in for custom board shape (although eOthello just greys out some tiles on the board, and could be done fairly simply with a DISABLED type that the logic would ignore)
- No error-checking for invalid inputs
  - The current design only allows input on "valid tiles" but I'm 100% sure there's a way to get around some invalid inputs
  - You can probably currently break the AI by placing a tile for them quickly using tab because buttons aren't disabled if its not your turn
    - I think it would clean up and just "skip" the AI's input but that's obv not a good thing
- Theming
  - Would want to find a more integrated solution for being able to change the theme on the fly (dark mode, etc.)
- Saving and continuing games/running multiple games
  - Could do this locally but would need UI for it and then have a load from serialized reducer

## Overall Thoughts
- I enjoyed the challenge, it was a simple enough game to execute well even if not familiar with it while also being able to show a developers skill and design process

