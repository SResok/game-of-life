import React, { useContext, useEffect } from "react"
import "./board.css"
import Toolbar from "./Toolbar"
import Context from "./store/context"
import Tiles from "./Tiles"

const Board = () => {
  const { globalState, globalDispatch } = useContext(Context)
  const { rowSize, columnSize, tileSize } = globalState.config

  useEffect(() => {
    setTiles()
  }, Object.values(globalState.config))

  const generateTiles = () => {
    const tiles = []
    for (let x = 0; x < rowSize; x++) {
      for (let y = 0; y < columnSize; y++) {
        if (typeof tiles[x] == "undefined") {
          tiles[x] = []
        }
        tiles[x][y] = { life: 0, hover: 0 }
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
  const toggleLife = (tileX, tileY) => {
    const aTiles = [...globalState.tiles]
    aTiles[tileX][tileY].life = !aTiles[tileX][tileY].life
    globalDispatch({
      type: "TOGGLE_LIFE",
      payload: aTiles,
    })
  }
  const getNeighbors = (tileX, tileY) => {
    const neighbors = []

    for (let x = tileX - 1; x <= tileX + 1; x++) {
      for (let y = tileY - 1; y <= tileY + 1; y++) {
        if (x >= 0 && x < rowSize) {
          if (y >= 0 && y < columnSize) {
            if (!(tileX == x && tileY == y)) {
              if (typeof neighbors[x] == "undefined") {
                neighbors[x] = []
              }
              neighbors[x][y] = 0
            }
          }
        }
      }
    }
    return neighbors
  }
  const handleBoardClick = e => {
    if (e.target.className == 'tile') {
      const tileX = e.target.dataset.x
      const tileY = e.target.dataset.y

      toggleLife(tileX,tileY)
    }
  }

  const oBoardStyle = {
    display: "grid",
    gridTemplate: `repeat(${rowSize},${tileSize}px) / repeat(${columnSize},${tileSize}px)`,
    background: "#208caf",
    padding: 100,
  }

  return (
    <div>
      <Toolbar />
      <div
        id="board"
        style={oBoardStyle}
        onClick={handleBoardClick}
      >
        <Tiles />
      </div>
    </div>
  )
}

export default Board
