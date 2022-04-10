import React from 'react';
import { setDefaultStart } from '../redux/actions/gameActions';
import { useAppDispatch } from '../redux/hooks';
import './Header.scss';

export function Header() {
  const dispatch = useAppDispatch();

  const onNewGame = () => {
    dispatch(setDefaultStart());
  };

  return (
    <div className="header">
      <div className="title">Othello</div>
      <div className="buttonContainer">
        <button type="button" onClick={onNewGame}>New Game</button>
      </div>
    </div>
  );
}
