import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';
import type { RootState } from '../store'

enum COLOR {
  BLACK,
  WHITE
}

type GamePiece = {
  row: number;
  col: number;
  type: COLOR;
}

export type GameState = {
  turn: number;
  startingPlayer: COLOR;
  rows: number;
  cols: number;
  gameState: GamePiece[]
}

// Define the initial state using that type
const initialState: GameState = {
  turn: 0,
  startingPlayer: COLOR.BLACK,
  rows: 8,
  cols: 8,
  gameState: [],
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    reset: () => initialState,
    placePiece: (state, action: PayloadAction<GamePiece>) => {
      state.gameState.push(action.payload)
    }
  }
})

export const { reset } = gameSlice.actions

export const useGameSelector = <T>(s: (a: GameState) => T) => useSelector<RootState, T>((state) => s(state.game))

export default gameSlice.reducer