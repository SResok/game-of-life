import React, { useContext } from "react"
import Context from "./store/context"

function Tiles() {
  const { globalState } = useContext(Context)

  return globalState.tiles.map((tile, tileX) => {
    return tile.map((props, tileY) => {

  
      const tileKey = `${tileX}_${tileY}`

      return (
        <div
          data-x={tileX}
          data-y={tileY}
          className="tile"
          key={tileKey}
          style={{
            border: "1px solid black",
            background: props.life ? "black" : "white",
          }}
        ></div>
      )
    })
  })
}

export default Tiles
