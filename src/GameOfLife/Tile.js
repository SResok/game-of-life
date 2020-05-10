import React, { useContext, useEffect } from "react"
import Context from "./store/context"

const Tile = props => {
  const { globalState, globalDispatch } = useContext(Context)

  const tile = props.tile

  useEffect(() => {
    if (globalState.gameState == "active") {
      setNextIteration()
    }
  }, [globalState.gameState])

  const getNeighbors = () => {
    const aTiles = [...globalState.tiles]

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
    const neighbors = getNeighbors()



    const aTile = aTiles.find(aTile => aTile === tile)


    if (tile.status.next == "birth") aTile.status.current = "alive"
    if (tile.status.next == "dieing") aTile.status.current = "dead"

    if (neighbors >= 2 && neighbors <= 3) {
      if (tile.status.current == "dead" && neighbors === 3 ) {
       aTile.status.next = "birth"
      }
    } else {
      if (tile.status.current == "alive") {
       aTile.status.next = "dieing"
      }
    }

    // if (tile.props.life) {
    //   if (neighbors !== 2 || neighbors !== 3) {
    //     // state = "staying"
    //     aTile.props.dieing = 1
    //     aTile.props.life = 0

    //   } else {
    //     aTile.props.dieing = 0
    //   }
    // } else {
    //   if (neighbors == 3) {

    //     aTile.props.birth = 1
    //   }
    //   else {
    //     aTile.props.birth = 0
    //   }
    // }
    // globalDispatch({
    //    type: "SET_TILE_PROPS",
    //    payload: aTiles,
    //  })
  }

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
      data-x={tile.x}
      data-y={tile.y}
      className="tile"
      key={`${tile.x}_${tile.y}`}
      style={{
        border: "1px solid black",
        background: tileColor,
      }}
    ></div>
  )

  // if (tile.props.life) {
  //   if (neighbors == 2 || neighbors == 3) {
  //     console.log('life')
  //   }
  //   else {
  //     console.log('dead')
  //   }
  // }
  // else {
  //   if (neighbors == 3) {
  //     console.log('birth')
  //   }
  // }
}

export default Tile
