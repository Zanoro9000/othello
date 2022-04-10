import React from 'react';
import { useGameSelector } from '../redux/slices/gameSlice';
import './Board.scss';
import { Tile } from './Tile';

export function Board() {
  const gameState = useGameSelector((s) => s.gameState);
  return (
    <div className="gameBoard" style={{ gridTemplateRows: `repeat(${gameState.length}, 1fr)` }}>
      {gameState.map((gr, r) => (
        <div key={`row_${r}`} className="gridRow">
          {gr.map((tile, c) => (
            <div key={`space_${r}x${c}`} className="gridSpace">
              {tile?.type !== undefined && <Tile key={`tile_${r}x${c}`} row={r} col={c} type={tile?.type} />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
