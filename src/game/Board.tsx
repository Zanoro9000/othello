import React from "react"
import { useGameSelector } from "../redux/slices/gameSlice"
import { GridSpace } from "./GridSpace"
import './Board.css'

export function Board(){
  const { rows, cols } = useGameSelector(s => ({ rows: s.rows, cols: s.cols }))

  const gridRows = Array.from(Array(rows), () => Array.from(Array(cols), () => null))


  return <div className='gameBoard' style={{ gridTemplateRows: `repeat(${rows}, 1fr)` }}>
    {gridRows.map((gr, r) => {
      return <div className='gridRow'>
        {gr.map((gc, c) => {
          return <GridSpace key={`space_${r}x${c}`} row={r} col={c} space={gc} />
        })}
      </div>
    })}
  </div>
}