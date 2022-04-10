import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  GamePiece, placePiece, Player, TILE_COLOR,
} from '../redux/slices/gameSlice';
import { getTileColor } from './gameHelpers';
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

export function Tile({ row, col, type }: GamePiece) {
  const dispatch = useAppDispatch();
  const { startingPlayer, turn } = useAppSelector((s) => ({ startingPlayer: s.game.startingPlayer, turn: s.game.turn }));

  const onClick = () => {
    dispatch(placePiece({ row, col, type: getTileColor(turn, startingPlayer) }));
  };

  // startingPlayer is enum of color, so either 0 or 1
  const turnColor: TILE_COLOR = turn % 2 === startingPlayer ? startingPlayer : 1 - startingPlayer;

  // button for accessibility
  const Component = type === TILE_COLOR.AVAILABLE
    ? (props: React.HTMLAttributes<HTMLButtonElement>) => <button onClick={onClick} {...props} />
    : (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />;

  return <Component className={`tile ${getTileClassName(type)} turn-${getTileClassName(turnColor)}`} />;
}

export type StaticTileProps = {
  color: Player,
  size?: string | number,
  text?: string | number,
}

export function StaticTile({ color, size = '50px', text = '' }: StaticTileProps) {
  return (
    <div className={`tile ${getTileClassName(color)}`} style={{ width: size, height: size, lineHeight: size }}>
      <div className="tileText">{text}</div>
    </div>
  );
}
