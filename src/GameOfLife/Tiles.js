import React, { useContext, useEffect } from "react"
import Context from "./store/context"

const Tiles = props => {
  const { globalState, globalDispatch } = useContext(Context)
  const { rowSize, columnSize, tileSize } = globalState.config

  // const tile = props.tile
  // const tileIndex = props.tileIndex

  useEffect(() => {
    if (globalState.iteration > 0) {
      setNextIteration()
    }
  }, [globalState.iteration])

  const toggleLife = (tile, tileIndex) => {
    const aTiles = [...globalState.tiles]
    const targetTile = { ...aTiles[tileIndex] }
    const targetTileStatus = { ...targetTile.status }

    targetTileStatus.current = tile.status.current == "alive" ? "dead" : "alive"
    targetTileStatus.next = tile.status.next == "alive" ? "dead" : "alive"

    targetTile.status = targetTileStatus
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
            if (neighbor.status.current == "alive") {
              return neighbor
            }
          }
        }
      }
    })
    return neighbors.length
  }

  const setNextIteration = () => {
    const aTiles = [...globalState.tiles]

    aTiles.map((tile, tileIndex) => {
      const neighborCount = getNeighborCount(tile, aTiles)

      const targetTile = { ...aTiles[tileIndex] }
      const targetTileStatus = { ...targetTile.status }


      if (tile.status.next == "birth") targetTileStatus.current = "alive" && targetTileStatus.next == "alive"
      if (tile.status.next == "dieing") targetTileStatus.current = "dead" && targetTileStatus.next == "dead"

      if (neighborCount >= 2 && neighborCount <= 3) {
        if (tile.status.current == "dead" && neighborCount === 3) {
          targetTileStatus.next = "birth"
        }
      } else {
        if (tile.status.current == "alive") {
          targetTileStatus.next = "dieing"
        }
      }

      targetTile.status = targetTileStatus
      aTiles[tileIndex] = targetTile
    })

    globalDispatch({
      type: "SET_TILE_PROPS",
      payload: aTiles,
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
        const tileColor =
          tile.status.next == "alive"
            ? "cyan"
            : tile.status.next == "birth"
            ? "orange"
            : tile.status.next == "dieing"
            ? "red"
            : "white"

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
