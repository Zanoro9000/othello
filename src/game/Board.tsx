import React from 'react';
import { useAI } from '../redux/hooks';
import { TILE_COLOR, useGameSelector } from '../redux/slices/gameSlice';
import './Board.scss';
import { PlacedTile, AvailableTile } from './Tile';

export function Board() {
  const thinking = useAI();
  const gameState = useGameSelector((s) => s.gameState);
  return (
    <div className="gameBoard" style={{ gridTemplateRows: `repeat(${gameState.length}, 1fr)` }}>
      {thinking && <div className="boardOverlay" />}
      {gameState.map((gr, r) => (
        <div key={`row_${r}`} className="gridRow">
          {gr.map((tile, c) => (
            <div key={`space_${r}x${c}`} className="gridSpace">
              {tile === null
                ? null
                : tile?.type === TILE_COLOR.AVAILABLE
                  ? <AvailableTile key={`tile_${r}x${c}`} row={r} col={c} type={tile.type} />
                  : <PlacedTile key={`tile_${r}x${c}`} row={r} col={c} type={tile.type} />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
