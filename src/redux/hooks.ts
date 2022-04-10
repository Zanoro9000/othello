import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFlippableTiles, getPieces, getTileColor } from '../game/gameHelpers';
import {
  DIFFICULTY, GamePiece, GameState, GAME_TYPE, placePiece, Player, STATE, TILE_COLOR, useGameSelector,
} from './slices/gameSlice';
import { AppDispatch, RootState } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(s: ((a: RootState) => T)) => useSelector<RootState, T>(s);

const placeRandom = (
  dispatch: ThunkDispatch<{game: GameState;}, undefined, AnyAction> & Dispatch<AnyAction>,
  gameState: GamePiece[][],
  player: Player,
) => {
  const pieces = getPieces(gameState, TILE_COLOR.AVAILABLE);
  const piece = pieces[Math.round(Math.random() * (pieces.length - 1))];
  dispatch(placePiece({ ...piece, type: player }));
};

const placeCurrentMax = (
  dispatch: ThunkDispatch<{game: GameState;}, undefined, AnyAction> & Dispatch<AnyAction>,
  gameState: GamePiece[][],
  player: Player,
) => {
  const pieces = getPieces(gameState, TILE_COLOR.AVAILABLE);
  const tiles = pieces.map((p) => getFlippableTiles(gameState, p.row, p.col, player));
  const lengths = tiles.map((t) => t.length);
  const max = Math.max(...lengths);
  const piece = pieces[lengths.indexOf(max)];
  dispatch(placePiece({ ...piece, type: player }));
};

export const useAI = () => {
  const [thinking, setThinking] = useState(false);
  const dispatch = useAppDispatch();
  const {
    turn,
    startingPlayer,
    gameType,
    ai,
    gameState,
    state,
  } = useGameSelector((s) => ({
    turn: s.turn,
    startingPlayer: s.startingPlayer,
    gameType: s.gameType,
    ai: s.ai,
    gameState: s.gameState,
    state: s.state,
  }));

  useEffect(() => {
    if (state !== STATE.FINISHED && gameType === GAME_TYPE.AI && ai.player === getTileColor(turn, startingPlayer)) {
      setThinking(true);
      const t = setTimeout(() => {
        setThinking(false);
        switch (ai.difficulty) {
          case DIFFICULTY.MEDIUM: return placeCurrentMax(dispatch, gameState, ai.player);
          default: return placeRandom(dispatch, gameState, ai.player);
        }
      }, ai.speed * 1000);
      return () => {
        setThinking(false);
        clearTimeout(t);
      };
    }
    return undefined;
  }, [dispatch, turn, startingPlayer, gameType, ai, gameState]);

  return thinking;
};
