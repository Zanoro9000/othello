import React from 'react';
import { getScore, getTileColor } from '../game/gameHelpers';
import { StaticTile } from '../game/Tile';
import { useAppSelector } from '../redux/hooks';
import { STATE, TILE_COLOR } from '../redux/slices/gameSlice';
import './SubHeader.scss';

export function SubHeader() {
  const {
    turn, startingPlayer, gameState, state,
  } = useAppSelector((a) => a.game);

  const { [TILE_COLOR.BLACK]: black, [TILE_COLOR.WHITE]: white } = getScore(gameState);

  const tile1Winner = state === STATE.FINISHED && black > white ? 'winner' : '';
  const tile2Winner = state === STATE.FINISHED && black < white ? 'winner' : '';
  const draw = state === STATE.FINISHED && black === white ? 'draw' : '';

  return (
    <div className="subheader">
      <div className="score">
        <div className={`player1Score ${tile1Winner} ${draw}`}>
          <div className="player1Section">
            <StaticTile color={TILE_COLOR.BLACK} text={black} />
            <div className="player1">Player 1</div>
          </div>
          {tile1Winner && <div className="winnerText">Winner!</div>}
          {draw && <div className="winnerText">Draw</div>}
        </div>
        <div className="turnSelector">{getTileColor(turn, startingPlayer) === TILE_COLOR.BLACK ? '<' : '>'}</div>
        <div className={`player2Score ${tile2Winner} ${draw}`}>
          <div className="player2Section">
            <div className="player2">Player 2</div>
            <StaticTile color={TILE_COLOR.WHITE} text={white} />
          </div>
          {tile2Winner && <div className="winnerText">Winner!</div>}
          {draw && <div className="winnerText">Draw</div>}
        </div>
      </div>
    </div>
  );
}
