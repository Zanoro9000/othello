import React from "react";
import { GamePiece } from "../redux/slices/gameSlice";
import './GridSpace.scss'
import { Tile } from "./Tile";

export type GridSpaceProps = {
  tile: GamePiece
}

export function GridSpace({ tile }: GridSpaceProps) {
  return <div className="gridSpace">{tile && <Tile tile={tile} />}</div>
}