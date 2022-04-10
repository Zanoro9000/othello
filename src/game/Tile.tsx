import React from 'react';
import { useAppSelector } from '../redux/hooks';
import { GamePiece, TILE_COLOR } from '../redux/slices/gameSlice';
import './Tile.scss';

export type TileClassNames = 'black' | 'white' | 'available' | ''

const getTileClassName = (type: TILE_COLOR): TileClassNames => {
  switch (type) {
    case TILE_COLOR.AVAILABLE: return 'available';
    case TILE_COLOR.BLACK: return 'black';
    case TILE_COLOR.WHITE: return 'white';
    default: return '';
  }
};

export type TileProps = {
  tile: GamePiece,
}

export function Tile({ tile }: TileProps) {
  const { startingPlayer, turn } = useAppSelector((s) => ({ startingPlayer: s.game.startingPlayer, turn: s.game.turn }));

  // startingPlayer is enum of color, so either 0 or 1
  const turnColor: TILE_COLOR = turn % 2 === startingPlayer ? startingPlayer : 1 - startingPlayer;

  return <div className={`tile ${getTileClassName(tile.type)} turn-${getTileClassName(turnColor)}`} />;
}

export function StaticTile({ tile }: TileProps) {
  return <div className={`tile ${getTileClassName(tile.type)}`} />;
}
