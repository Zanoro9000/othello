import React from "react"
import { GamePiece, TILE_COLOR, useGameSelector } from "../redux/slices/gameSlice"
import { GridSpace } from "./GridSpace"
import './Board.scss'

export function Board(){
  const { rows, cols } = useGameSelector(s => ({ rows: s.rows, cols: s.cols }))

  const gridRows: (GamePiece | null)[][] = Array.from(Array(rows), () => Array.from(Array(cols), () => null))

  gridRows[1][2] = { row: 1, col: 2, type: TILE_COLOR.AVAILABLE }
  gridRows[1][3] = { row: 1, col: 3, type: TILE_COLOR.BLACK }
  gridRows[1][4] = { row: 1, col: 4, type: TILE_COLOR.WHITE }

  return <div className='gameBoard' style={{ gridTemplateRows: `repeat(${rows}, 1fr)` }}>
    {gridRows.map((gr, r) => {
      return <div className='gridRow'>
        {gr.map((tile, c) => <GridSpace key={`space_${r}x${c}`} tile={tile} />)}
      </div>
    })}
  </div>
}