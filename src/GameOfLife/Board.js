import React, { useContext, useEffect } from "react"
import "./board.css"
import Toolbar from "./Toolbar"
import Context from "./store/context"
import Tile from "./Tile"

const Board = () => {
  const { globalState, globalDispatch } = useContext(Context)
  const { rowSize, columnSize, tileSize } = globalState.config

  useEffect(() => {
    setTiles()
  }, Object.values(globalState.config))

  function genTile(x, y, status) {
    this.x = x
    this.y = y
    this.status = status
  }

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




  // const getAliveNeighbors = () => {
  //   // const neighbors = getNeighbors()
  //   const aTiles = [...globalState.tiles]

  //   const test = aTiles.map(tile => {
  //     let sdfsdfsdfsd = 0
  //       if (tile.x >= tile.x - 1 && tile.x <= tile.x + 1) {
  //         if (tile.y >= tile.y - 1 && tile.y <= tile.y + 1) {
  //           if (tile != tile) {
  //             if (tile.props.life) {
  //               sdfsdfsdfsd++
  //             }
  //           }
  //         }
  //       }  
  //       console.log(sdfsdfsdfsd)
  //   }
  //   )

  // }
  // const testdfsfs = () => {

  //   const aTiles = [...globalState.tiles]

  //   const iudi = aTiles.flatMap(tile => {

  //   }) 
      
  //   // const aliveTiles = conjo.filter(tile => tile.props.life)


  //   console.log(aliveTiles)

  // }

  const generateTiles = () => {
    const tiles = []
    for (let x = 0; x < rowSize; x++) {
      for (let y = 0; y < columnSize; y++) {
        tiles.push(
          new genTile(x, y, {current:"dead",next:"dead"})
        )
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

  

  const handleBoardClick = e => {
    if (e.target.className == "tile") {
      const tileX = e.target.dataset.x
      const tileY = e.target.dataset.y
      // setLife(tileX,tileY)
      toggleLife(tileX, tileY)


      // getAliveNeighbors()
    }
  }

  // const setLife = (tileX, tileY) => {
    
  //   const aTiles = [...globalState.life]
  //   if (typeof aTiles[tileX] == "undefined") {
  //     aTiles[tileX] = []
  //   }
  //   console.log(aTiles[tileX].length)
  //   if (aTiles[tileX][tileY] == undefined) {
  //     aTiles[tileX][tileY] = 0
  //   } else {
  //     aTiles[tileX][tileY] = null
  //   }
  //   globalDispatch({
  //     type: "SET_LIFE",
  //     payload: aTiles,
  //   })
  //   console.log(aTiles[tileX])

  //   // console.log(aTiles[tileX].filter(e =>console.log(e)))
  //   // console.log(aTiles[tileX][tileY], tileX, tileY)

  // }


  const toggleLife = (tileX, tileY) => {
    const aTiles = [...globalState.tiles]
    // aTiles[tileX][tileY].life = !aTiles[tileX][tileY].life

    const tile = aTiles.find(tile => tile.x == tileX && tile.y == tileY);
    // tile.props.life = !tile.props.life

    tile.status.current = tile.status.current == "alive" ? "dead" : "alive"
    tile.status.next = tile.status.next == "alive" ? "dead" : "alive"

    globalDispatch({
      type: "TOGGLE_LIFE",
      payload: aTiles,
    })
  }
  // const getNeighbors = (tileX, tileY) => {
  //   const neighbors = []

  //   for (let x = tileX - 1; x <= tileX + 1; x++) {
  //     for (let y = tileY - 1; y <= tileY + 1; y++) {
  //       if (x >= 0 && x < rowSize) {
  //         if (y >= 0 && y < columnSize) {
  //           if (!(tileX == x && tileY == y)) {
  //             if (typeof neighbors[x] == "undefined") {
  //               neighbors[x] = []
  //             }
  //             neighbors[x][y] = 0
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return neighbors
  // }  

  const oBoardStyle = {
    display: "grid",
    gridTemplate: `repeat(${rowSize},${tileSize}px) / repeat(${columnSize},${tileSize}px)`,
    background: "#208caf",
    padding: 100,
  }

  return (
    <div>
      <Toolbar />
      <div id="board" style={oBoardStyle} onClick={handleBoardClick}>
        {globalState.tiles.map((tile,key) => {
          return <Tile tile={tile} key={key}/>
        })}
      </div>
    </div>
  )
}

export default Board
