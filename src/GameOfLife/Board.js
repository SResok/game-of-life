import React, { useContext, useEffect } from "react"
import Toolbar from "./Toolbar"
import Context from "./store/context"
import Tiles from "./Tiles"

const Board = () => {
  const { globalState, globalDispatch } = useContext(Context)
  const { rowSize, columnSize } = globalState.config

  useEffect(() => {
    setTiles()
  }, Object.values(globalState.config))

  const generateTiles = () => {
    const tiles = []
    for (let x = 0; x < rowSize; x++) {
      for (let y = 0; y < columnSize; y++) {
        const life = Math.floor(Math.random() * 2) ? true : false
        tiles.push({ x: x, y: y, life })
      }
    }
    return tiles
  }

  const setTiles = () => {
    globalDispatch({
      type: "SET_TILES",
      payload: generateTiles(),
    })
  }

  return (
    <div>
      <Toolbar />
      <Tiles />
    </div>
  )
}

export default Board
