import React from 'react'

function Tile() {
	return (
    <div
      data-x={tileX}
      data-y={tileY}
      className="tile"
      style={style}
      key={tileKey}
      onMouseDown={() => this.handleMouseDown(tileX, tileY)}
      onMouseEnter={() => this.handleMouseEnter(tileX, tileY)}
    >
    </div>
  )
}

export default Tile
