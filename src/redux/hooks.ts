import { useDispatch, useSelector } from "react-redux"
import { GameState } from "./slices/gameSlice"
import { AppDispatch, RootState } from "./store"

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = <T>(s: (a: RootState) => T) => useSelector<RootState, T>(s)