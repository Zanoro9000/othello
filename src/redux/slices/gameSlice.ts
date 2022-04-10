import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { makeEmptyGrid, makeGrid } from '../../game/gameHelpers';
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

export type GameState = {
  turn: number;
  startingPlayer: Player;
  rows: number;
  cols: number;
  gameState: GamePiece[][]
}

// Define the initial state using that type
const initialState: GameState = {
  turn: 0,
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
      state.gameState = makeGrid(state.rows, state.cols, action.payload);
    },
    placePiece: (state, action: PayloadAction<GamePiece>) => {
      state.gameState[action.payload.row][action.payload.col] = action.payload;
    },
  },
});

export const { reset } = gameSlice.actions;

export const useGameSelector = <T>(s: (a: GameState) => T) =>
  useSelector<RootState, T>((state) => s(state.game));

export default gameSlice.reducer;
