import React, { Component, useState } from "react"
import "./board.css"
import Toolbar from "./toolbar"

export default class Board extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tiles: [],
      playing: false,
      hovering: [],
      config: {
        rowSize: 18,
        columnSize: 50,
        tileSize: 30,
      },
    }

    this.handleInput = this.handleInput.bind(this)
    this.setTiles = this.setTiles.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  generateTiles(rowSize, columnSize) {
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

  buttonClick(e) {
    const event = e.target.name;

    switch (event) {

      case 'start': 
        //start timer

    break;
    case 'pause':
    break;
    case 'stop:'://reset
    break;

    }
  }
  

  componentDidMount() {
    this.setTiles()
  }

  render() {
    const {rowSize, columnSize,tileSize}  = this.state.config
    const currentHovering = this.state.hovering;
    
    const boardStyle = {
      display: "grid",
      gridTemplate: `repeat(${rowSize},${tileSize}px) / repeat(${columnSize},${tileSize}px)`,
      background: "#208caf",
      padding: 100,
    }

    return (
      <div>
        
        {/* <Toolbar
          config={this.state.config}
          setTiles={this.setTiles}
          handleInput={this.handleInput}
        /> */}
        <div className="buttons">
          {["start", "pause", "stop"].map(button => {
            return (
              <button onClick={this.buttonClick} name={button}>
                {button}
              </button>
            )
          })}
        </div>
        <div id="board" style={boardStyle}>
          {this.state.tiles.map((tile, tileX) => {
            const renderedTiles = tile.map((life, tileY) => {
              let background = life.life ? "black" : "white"

              if (
                currentHovering[tileX] &&
                currentHovering[tileX][tileY] == 0
              ) {
                background = "rgba(255,0,0,.2)"
              }

              const style = {
                border: "1px solid black",
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
                  {/* {tileX} {tileY} */}
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
