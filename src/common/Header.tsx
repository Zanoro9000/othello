import React from 'react';
import { setBlackNoTurnStart, setDefaultStart } from '../redux/actions/gameActions';
import { useAppDispatch } from '../redux/hooks';
import { DIFFICULTY, GAME_TYPE, TILE_COLOR } from '../redux/slices/gameSlice';
import './Header.scss';

export function Header() {
  const dispatch = useAppDispatch();

  const onNewLocalGame = () => {
    dispatch(setDefaultStart({ gameType: GAME_TYPE.LOCAL_MULTIPLAYER }));
  };

  const onNewAIGame = (difficulty: DIFFICULTY) => () => {
    dispatch(setDefaultStart({ gameType: GAME_TYPE.AI, ai: { player: TILE_COLOR.WHITE, difficulty, speed: 2 } }));
  };

  const onSkipTurnGame = () => {
    dispatch(setBlackNoTurnStart({ gameType: GAME_TYPE.LOCAL_MULTIPLAYER }));
  };

  return (
    <div className="header">
      <div className="title">Othello</div>
      <div className="buttonContainer">
        <button type="button" onClick={onNewLocalGame}>New Game (Local)</button>
        <button type="button" onClick={onNewAIGame(DIFFICULTY.EASY)}>New Game (AI Easy)</button>
        <button type="button" onClick={onSkipTurnGame}>Skip Turn Game</button>
        <button type="button" onClick={onNewAIGame(DIFFICULTY.MEDIUM)}>New Game (AI Med)</button>
      </div>
    </div>
  );
}
