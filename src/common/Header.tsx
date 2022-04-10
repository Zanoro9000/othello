import React from 'react';
import './Header.scss';

export function Header() {
  return (
    <div className="header">
      <div className="title">Othello</div>
      <div className="buttonContainer">
        <button type="button">New Game</button>
      </div>
    </div>
  );
}
