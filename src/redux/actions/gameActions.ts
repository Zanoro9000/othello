import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { defaultStartingPieces } from '../../game/gameHelpers';
import { GameState, setInitialState, setOptions } from '../slices/gameSlice';
import { RootState } from '../store';

export const setDefaultStart = (options?: Partial<GameState>): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) => {
    const { game: { rows, cols } } = getState();
    dispatch(setInitialState(defaultStartingPieces(rows, cols)));
    if (options) dispatch(setOptions(options));
  };
