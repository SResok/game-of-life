import React, { Component, useState } from "react"
import "./board.css"

export default class Board extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tiles: [],
      coordinates: [],
      config: {
        rowSize: 9,
        columnSize: 16,
        tileSize: 80,
      },
    }

    this.handleInput = this.handleInput.bind(this)
    this.setTiles = this.setTiles.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  setCoordinate(x, y) {
    this.x = x;
    this.y = y;
  }

  generateTiles(rowSize, columnSize, tileSize) {

    const tiles = []
    const coordinates = []
  
    for (let y = 0; y < columnSize; y++) {
      for (let x = 0; x < rowSize; x++) {

        coordinates.push({x,y})
        if (typeof tiles[x] == "undefined") {
          tiles[x] = []
        }
        tiles[x][y] = { life: 0, hover: 0 }
      }
    }
    console.log(tiles)
    console.log(coordinates)
    return tiles
  }

  setTiles() {
    const { rowSize, columnSize, tileSize } = this.state.config

    this.setState({
      tiles: this.generateTiles(rowSize, columnSize, tileSize),
    })
  }

  handleInput(e) {
    const key = e.target.name
    const value = e.target.value
    this.setState(prevState => {
      const config = prevState.config
      config[key] = value
      return config
    })
  }

  toggleLife(tileX, tileY) {
    console.log(tileX, tileY)

    this.setState(prevState => {
      const tiles = prevState.tiles

      tiles[tileX][tileY].life = !tiles[tileX][tileY].life

      return tiles
    })
  }

  getNeighbors(tileX, tileY) {
    const neighbors = []
    for (let y = tileY - 1; y <= tileY + 1; y++) {
      for (let x = tileX - 1; x <= tileX + 1; x++) {
        if (!(tileX == x && tileY == y)) {
          if (typeof neighbors[x] == "undefined") {
            neighbors[x] = []
          }
          neighbors[x][y] = 0
        }
      }
    }
    //console.log(this.getNeighbors)
    return neighbors
  }

  handleMouseEnter(tileX, tileY) {
    // console.clear()
    //console.log(this.getNeighbors(tileX,tileY))
    // console.log(test)
  }
  handleMouseDown(tileX, tileY) {
    this.toggleLife(tileX, tileY)
  }

  componentDidMount() {
    this.setTiles()
  }
  render() {
    const tileSize = parseInt(this.state.config.tileSize)

    const arr = new Array();
    arr.push(new this.setCoordinate(10, 0));
    arr.push(new this.setCoordinate(20, 5));


    console.log(arr)
    return (
      <div>
        {Object.entries(this.state.config).map(([key, value]) => (
          <label>
            {key}:
            <input
              type="number"
              key={key}
              name={key}
              id={key}
              value={value}
              onChange={this.handleInput}
            />
          </label>
        ))}
        <button onClick={this.setTiles}>REGEN</button>
        <div id="board">
          {this.state.tiles.map((tile, tileY) => {
            const renderedTiles = tile.map((life, tileX) => {
              const style = {
                position: "absolute",
                width: tileSize,
                height: tileSize,
                border: "1px solid black",
                transform: `translate3d(${tileX * 100}%,${tileY * 100}%,0)`,
                background: life.life ? "black" : "white",
              }
              const tileKey = `${tileX}_${tileY}`
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
                  <b>
                    {tileX} {tileY}
                  </b>
                </div>
              )
            })

            return renderedTiles
          })}
        </div>
      </div>
    )
  }
}
