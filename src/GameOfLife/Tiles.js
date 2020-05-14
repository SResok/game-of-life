import React, { useContext, useEffect } from "react"
import Context from "./store/context"

const Tiles = () => {
  const { globalState, globalDispatch } = useContext(Context)
  const { isActive, seconds } = globalState
  const { rowSize, columnSize, tileSize } = globalState.config

  useEffect(() => {
    if (isActive) {
      setNextIteration()
    }
  }, [isActive, seconds])



  const toggleLife = (tile, tileIndex) => {
    const aTiles = [...globalState.tiles]
    const targetTile = { ...aTiles[tileIndex] }

    targetTile.life = !tile.life

    aTiles[tileIndex] = targetTile

    globalDispatch({
      type: "TOGGLE_LIFE",
      payload: aTiles,
    })
  }

  const getNeighborCount = (tile, aTiles) => {
    const neighbors = aTiles.filter(neighbor => {
      if (neighbor.x >= tile.x - 1 && neighbor.x <= tile.x + 1) {
        if (neighbor.y >= tile.y - 1 && neighbor.y <= tile.y + 1) {
          if (neighbor != tile) {
            if (neighbor.life) {
              return neighbor
            }
          }
        }
      }
    })
    return neighbors.length
  }

  const setNextIteration = () => {

    const aTiles = []
    const globalTiles = globalState.tiles

    globalTiles.map(tile => {
      const neighborCount = getNeighborCount(tile, globalTiles)
      const newTile = { ...tile }

      if (neighborCount >= 2 && neighborCount <= 3) {
        if (tile.life) newTile.life = true
        if (!tile.life && neighborCount === 3) {
          newTile.life = true
        }
      } else {
        if (tile.life) {
          newTile.life = false
        }
      }

      aTiles.push(newTile)
    })

    globalDispatch({
      type: "SET_TILE_PROPS",
      payload: aTiles,
    })
    globalDispatch({
      type: "SET_ITERATION",
      payload: globalState.iteration + 1,
    })
  }

  const oTileGridStyle = {
    display: "grid",
    gridTemplate: `repeat(${rowSize},${tileSize}px) / repeat(${columnSize},${tileSize}px)`,
    background: "#208caf",
    padding: 100,
  }
  return (
    <div id="tileGrid" style={oTileGridStyle}>
      {globalState.tiles.map((tile, tileIndex) => {
        const tileColor = tile.life ? "purple" : "black"

        return (
          <div
            onClick={() => toggleLife(tile, tileIndex)}
            className="tile"
            tileindex={tileIndex}
            key={tileIndex}
            style={{
              border: "1px solid black",
              background: tileColor,
            }}
          ></div>
        )
      })}
    </div>
  )
}

export default Tiles
