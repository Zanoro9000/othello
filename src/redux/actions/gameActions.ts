import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { defaultStartingPieces } from '../../game/gameHelpers';
import { setInitialState } from '../slices/gameSlice';
import { RootState } from '../store';

export const setDefaultStart = (): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) => {
    const { game: { rows, cols } } = getState();
    dispatch(setInitialState(defaultStartingPieces(rows, cols)));
  };
