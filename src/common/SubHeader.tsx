import React from 'react';
import { getScore, getTileColor } from '../game/gameHelpers';
import { StaticTile } from '../game/Tile';
import { useAppSelector } from '../redux/hooks';
import { TILE_COLOR } from '../redux/slices/gameSlice';
import './SubHeader.scss';

export function SubHeader() {
  const { turn, startingPlayer, gameState } = useAppSelector((a) => a.game);

  const { [TILE_COLOR.BLACK]: black, [TILE_COLOR.WHITE]: white } = getScore(gameState);

  return (
    <div className="subheader">
      <div className="score">
        <StaticTile color={TILE_COLOR.BLACK} text={black} />
        <div className="player1">Player 1</div>
        <div className="turnSelector">{getTileColor(turn, startingPlayer) === TILE_COLOR.BLACK ? '<' : '>'}</div>
        <div className="player2">Player 2</div>
        <StaticTile color={TILE_COLOR.WHITE} text={white} />
      </div>
    </div>
  );
}
