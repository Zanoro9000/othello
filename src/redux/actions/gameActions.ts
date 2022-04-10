import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { blackNoTurnStartingPieces, defaultStartingPieces } from '../../game/gameHelpers';
import { GameState, setInitialState, setOptions } from '../slices/gameSlice';
import { RootState } from '../store';

export const setDefaultStart = (options?: Partial<GameState>): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) => {
    const { game: { rows, cols } } = getState();
    dispatch(setInitialState(defaultStartingPieces(rows, cols)));
    if (options) dispatch(setOptions(options));
  };

export const setBlackNoTurnStart = (options?: Partial<GameState>): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) => {
    const { game: { rows, cols } } = getState();
    dispatch(setInitialState(blackNoTurnStartingPieces(rows, cols)));
    if (options) dispatch(setOptions(options));
  };
