import React from "react";
import { GamePiece, TILE_COLOR } from "../redux/slices/gameSlice";
import './Tile.scss'

export type TileClassNames = 'black' | 'white' | 'available' | ''

const getTileClassName = (tile: GamePiece): TileClassNames => {
  switch (tile.type) {
    case TILE_COLOR.AVAILABLE: return 'available';
    case TILE_COLOR.BLACK: return 'black';
    case TILE_COLOR.WHITE: return 'white';
    default: return '';
  }
}

export type TileProps = {
  tile: GamePiece
}

export function Tile({ tile }: TileProps) {
  return <div className={`tile ${getTileClassName(tile)}`} />
}