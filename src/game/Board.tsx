import React from 'react';
import { useGameSelector } from '../redux/slices/gameSlice';
import { GridSpace } from './GridSpace';
import './Board.scss';

export function Board() {
  const { rows, gameState } = useGameSelector((s) => s);

  return (
    <div className="gameBoard" style={{ gridTemplateRows: `repeat(${rows}, 1fr)` }}>
      {gameState.map((gr, r) => (
        <div key={`row_${r}`} className="gridRow">
          {gr.map((tile, c) => <GridSpace key={`space_${r}x${c}`} tile={tile} />)}
        </div>
      ))}
    </div>
  );
}
