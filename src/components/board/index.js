import React, { Component, useState } from "react"
import "./board.css"

export default class Board extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tiles: [],
      coordinates: [],
      hovering: [],
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

  generateTiles(rowSize, columnSize, tileSize) {
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
    this.setState(prevState => {
      const tiles = prevState.tiles

      tiles[tileX][tileY].life = !tiles[tileX][tileY].life

      return tiles
    })
  }

  getNeighbors(tileX, tileY) {
    const neighbors = []

    const {rowSize,columnSize} = this.state.config

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

  setHover(aTiles) {
    this.setState({
      hovering: aTiles
    })
  }

  handleMouseEnter(tileX, tileY) {
    this.setHover(this.getNeighbors(tileX, tileY));
  }
  handleMouseDown(tileX, tileY) {
    this.toggleLife(tileX, tileY)
  }

  componentDidMount() {
    this.setTiles()
  }
  render() {
    const tileSize = parseInt(this.state.config.tileSize)
    const currentHovering = this.state.hovering;

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
          {this.state.tiles.map((tile, tileX) => {
            const renderedTiles = tile.map((life, tileY) => {
              let background = life.life ? "black" : "white"

              if (currentHovering[tileX] && currentHovering[tileX][tileY] == 0) {
                
                background = "red"
              }
              
              // const background = life.hover ? "red" : life.life ? "black" : "white"
              const style = {
                position: "absolute",
                width: tileSize,
                height: tileSize,
                border: "1px solid black",
                transform: `translate3d(${tileY * 100}%,${tileX * 100}%,0)`,
                background: background,
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
