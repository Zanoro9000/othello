# othello
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
6. Show winner

## Future Features
- Save and resume game state
  - Local Storage serialized game state
- Replay game history
- Landing screen
  - Continue
    - Resume game state implemented
  - New Game ✅
    - Local Multiplayer ✅
    - AI
    - Online
- Tile animations
  - Show tiles flipping and changing color ✅
- Theming
  - Ability to change total colors/theme
- Game customization
  - Custom rulesets
    - Try to have min tiles
  - Starting configs
    - Board size
    - Board shape

