import React, { Component, useState } from "react"
import "./board.css"

export default class Board extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tiles: [],
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
    // for (let i = 0; i < rowSize; i++) {
    // 	for (let j = 0; i < columnSize; j++){
    const tiles = []
    const coordinates = []

    for (let y = 0; y < columnSize; y++) {
      for (let x = 0; x < rowSize; x++) {
        if (typeof tiles[x] == "undefined") {
          tiles[x] = []
        }
        tiles[x][y] = {life:0,hover:0}
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

  toggleLife(tile) {
    this.setState(prevState => {
      const tiles = prevState.tiles

      tiles[tile].life = !tiles[tile].life

      return tiles
    })
  }
  handleMouseEnter(tileX, tileY) {
    console.clear()
    const test = []
    for (let i = tileX - 1; i <= tileX + 1; i++){
      for (let j = tileY - 1; j <= tileY + 1; j++){
        if (!i == tileX && j == tileY) {

          console.log(i,j)
          // test.push(i+" "+j)
        }
        
      }

    }
      console.log(test)


  }
  handleMouseDown(tileX,tileY) {
    console.log(tileX,tileY)
    // const tileX = e.target.x
    // console.log(tileX)
    // console.log(e.target.key)
    //this.toggleLife(id)
    // const rowSize = this.state.config.rowSize
    // const firstNeighbor = id - rowSize - 1
    // const lastNeighbor = id + rowSize + 1

    // const neightbors = []
    // for (let i = firstNeighbor; i <= lastNeighbor; i++) {
    //   if (i < firstNeighbor + 3) {
    //     neightbors.push(i)
    //   } else if (i == id - 1 || i == id + 1) {
    //     neightbors.push(i)
    //   } else if (i > lastNeighbor - 3) {
    //     neightbors.push(i)
    //   }
    // }
    // neightbors.forEach(id => this.toggleLife(id))
  }

  componentDidMount() {
    this.setTiles()
  }
  render() {
    const tileSize = parseInt(this.state.config.tileSize)

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
                  onMouseEnter={() => this.handleMouseEnter(tileX,tileY)}
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
