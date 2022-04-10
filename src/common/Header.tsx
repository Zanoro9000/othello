import React from 'react';
import { setDefaultStart } from '../redux/actions/gameActions';
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

  return (
    <div className="header">
      <div className="title">Othello</div>
      <div className="buttonContainer">
        <button type="button" onClick={onNewLocalGame}>New Game (Local)</button>
        <button type="button" onClick={onNewAIGame(DIFFICULTY.EASY)}>New Game (AI Easy)</button>
        <button type="button" onClick={onNewAIGame(DIFFICULTY.MEDIUM)}>New Game (AI Med)</button>
      </div>
    </div>
  );
}
