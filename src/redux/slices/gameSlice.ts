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

export type GameState = {
  state: STATE;
  turn: number;
  startingPlayer: Player;
  rows: number;
  cols: number;
  gameState: GamePiece[][]
}

// Define the initial state using that type
const initialState: GameState = {
  turn: 0,
  state: STATE.STARTING,
  startingPlayer: TILE_COLOR.BLACK,
  rows: 8,
  cols: 8,
  gameState: makeEmptyGrid(8, 8),
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    reset: () => initialState,
    setInitialState: (state, action: PayloadAction<GamePiece[]>) => {
      state.turn = 0;
      const newGrid = makeGrid(state.rows, state.cols, action.payload);
      state.gameState = mFillGrid(newGrid, getValidNewPieces(newGrid, 0));
      state.state = STATE.PLAYING;
    },
    placePiece: (state, action: PayloadAction<PlacedGamePiece>) => {
      const newTurn = state.turn + 1;
      const newGrid = clearAvailablePieces(mFillGrid(state.gameState, [action.payload]));
      const flippableTiles = getFlippableTiles(newGrid, action.payload.row, action.payload.col, action.payload.type);
      const flippedTiles = flippableTiles.map((t) => ({ ...t, type: getOtherPlayer(t.type) }));
      mFillGrid(newGrid, flippedTiles);
      const validNewPieces = getValidNewPieces(newGrid, getTileColor(newTurn, state.startingPlayer));
      state.gameState = mFillGrid(newGrid, validNewPieces);
      state.turn = newTurn;
      state.state = validNewPieces.length > 0 ? STATE.PLAYING : STATE.FINISHED;
    },
  },
});

export const { reset, setInitialState, placePiece } = gameSlice.actions;

export const useGameSelector = <T>(s: (a: GameState) => T) =>
  useSelector<RootState, T>((state) => s(state.game));

export default gameSlice.reducer;
