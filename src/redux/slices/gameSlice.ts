import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import {
  clearAvailablePieces,
  getFlippableTiles,
  getOtherPlayer,
  getTileColor,
  getValidNewPieces, makeEmptyGrid, makeGrid, mFillGrid,
} from '../../game/gameHelpers';
import type { RootState } from '../store';

export enum TILE_COLOR {
  BLACK,
  WHITE,
  AVAILABLE
}

export type Player = TILE_COLOR.BLACK | TILE_COLOR.WHITE

export type GamePiece = {
  row: number;
  col: number;
  type: TILE_COLOR;
}

export type PlacedGamePiece = GamePiece & { type: Player }

export enum STATE {
  STARTING,
  PLAYING,
  FINISHED
}

export enum DIFFICULTY {
  EASY,
  MEDIUM,
  HARD
}

export enum GAME_TYPE {
  LOCAL_MULTIPLAYER,
  AI,
  ONLINE
}

export type GameState = {
  state: STATE;
  turn: number;
  startingPlayer: Player;
  rows: number;
  cols: number;
  gameState: GamePiece[][]
  gameType: GAME_TYPE;
  user: {
    player: Player;
    name: string,
  }
  ai: {
    player: Player;
    difficulty: DIFFICULTY;
    speed: number;
  }
}

// Define the initial state using that type
const initialState: GameState = {
  turn: 0,
  state: STATE.STARTING,
  startingPlayer: TILE_COLOR.BLACK,
  rows: 8,
  cols: 8,
  gameState: makeEmptyGrid(8, 8),
  gameType: GAME_TYPE.LOCAL_MULTIPLAYER,
  user: {
    player: TILE_COLOR.BLACK,
    name: 'Player 1',
  },
  ai: {
    player: TILE_COLOR.WHITE,
    difficulty: DIFFICULTY.MEDIUM,
    speed: 2,
  },
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    reset: () => initialState,
    setOptions: (state, action: PayloadAction<Partial<GameState>>) => ({ ...state, ...action.payload }),
    setInitialState: (state, action: PayloadAction<GamePiece[]>) => {
      let turn = 0;
      const newGrid = makeGrid(state.rows, state.cols, action.payload);
      const validNewPieces = getValidNewPieces(newGrid, turn);
      if (validNewPieces.length === 0) turn += 1;
      state.gameState = validNewPieces.length > 0
        ? mFillGrid(newGrid, validNewPieces)
        : mFillGrid(newGrid, getValidNewPieces(newGrid, turn));
      state.state = STATE.PLAYING;
      state.turn = turn;
    },
    placePiece: (state, action: PayloadAction<PlacedGamePiece>) => {
      let newTurn = state.turn + 1;
      const newGrid = clearAvailablePieces(mFillGrid(state.gameState, [action.payload]));
      const flippableTiles = getFlippableTiles(newGrid, action.payload.row, action.payload.col, action.payload.type);
      const flippedTiles = flippableTiles.map((t) => ({ ...t, type: getOtherPlayer(t.type) }));
      mFillGrid(newGrid, flippedTiles);
      const validNewPieces = getValidNewPieces(newGrid, getTileColor(newTurn, state.startingPlayer));

      if (validNewPieces.length > 0) {
        state.gameState = mFillGrid(newGrid, validNewPieces);
        state.turn = newTurn;
        state.state = STATE.PLAYING;
      } else {
        newTurn += 1;
        const skippedTurnValidPieces = getValidNewPieces(newGrid, getTileColor(newTurn, state.startingPlayer));
        if (skippedTurnValidPieces.length > 0) {
          state.gameState = mFillGrid(newGrid, skippedTurnValidPieces);
          state.turn = newTurn;
          state.state = STATE.PLAYING;
        } else {
          state.gameState = mFillGrid(newGrid, skippedTurnValidPieces);
          state.turn = newTurn;
          state.state = STATE.FINISHED;
        }
      }
    },
  },
});

export const {
  reset, setOptions, setInitialState, placePiece,
} = gameSlice.actions;

export const useGameSelector = <T>(s: (a: GameState) => T) =>
  useSelector<RootState, T>((state) => s(state.game));

export default gameSlice.reducer;
