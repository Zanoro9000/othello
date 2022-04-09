import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './slices/gameSlice'

export const appStore = configureStore({
  reducer: {
    game: gameReducer,
  }
})

export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch