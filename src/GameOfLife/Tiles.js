import React, { useContext } from "react"
import Context from "./store/context"

function Tiles() {
  const { globalState } = useContext(Context)
 
  
  return globalState.tiles.map(tile => {
    
      const tileKey = `${tile.x}_${tile.y}`

      const tileColor = tile.props.life ? 'cyan' : tile.props.birth ? 'orange' : tile.props.dieing ? 'red' : 'white'

      return (
        <div
          data-x={tile.x}
          data-y={tile.y}
          className="tile"
          key={tileKey}
          style={{
            border: "1px solid black",
            background: tileColor,
          }}
        >
        </div>
      )
  })
}

export default Tiles
