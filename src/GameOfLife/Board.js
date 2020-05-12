import React, { useContext, useEffect } from "react"
import Toolbar from "./Toolbar"
import Context from "./store/context"
import Tiles from "./Tiles"

const Board = () => {
  const { globalState, globalDispatch } = useContext(Context)
  const { rowSize, columnSize, tileSize } = globalState.config

  useEffect(() => {
    setTiles()
  }, Object.values(globalState.config))

  useEffect(() => {
    switch (globalState.gameState) {
      case "inactive":
        console.log("inactive")
        break
      case "active":
        console.log("start")
        break
      case "paused":
        console.log("paused")
        break
      case "stop":
        console.log("stop")
        break
      default:
        console.log("idle")
    }
  }, globalState.gameState)

  const generateTiles = () => {
    const tiles = []
    for (let x = 0; x < rowSize; x++) {
      for (let y = 0; y < columnSize; y++) {
        tiles.push({ x: x, y: y, status: { current: "dead", next: "dead" } })
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
