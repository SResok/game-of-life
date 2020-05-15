import React, { useRef, useLayoutEffect, useEffect, useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = props => {
  const [seconds, setSeconds] = useState(0)
  const [speed, setSpeed] = useState(10)
  const [isActive, setIsActive] = useState(false)
  const [globalTiles, setGlobalTiles] = useState([])

  const [loaded, setLoaded] = useState(0)

  const [birth, setBirth] = useState(3)
  const [overcrowd, setOvercrowd] = useState(4)
  const [undercrowd, setUndercrowd] = useState(1)

  const [tileSize, setTileSize] = useState(20)

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (loaded) {
      genTiles()
    }
    
  }, [loaded,tileSize])


  useEffect(() => {
    const windowWidth = Math.floor(window.innerWidth)
    setWidth(windowWidth - (windowWidth % tileSize))

    const windowHeight = Math.floor((window.innerHeight / 100) * 50)
    setHeight(windowHeight - (windowHeight % tileSize))

    setLoaded(1)
  }, [])

  useEffect(() => {
    if (loaded) {
      genTiles()
    }
  }, [loaded])

  const canvas = useRef(null)

  useEffect(() => {
    if (globalTiles.length && loaded) {
      const context = canvas.current.getContext("2d")

      context.save()
      context.fillStyle = "hsl(0, 0%, 95%)"

      context.fillRect(0, 0, width, height)

      context.strokeStyle = "black"
      for (let x = 0; x < height; x = x + tileSize) {
        for (let y = 0; y < width; y = y + tileSize) {
          context.fillStyle = "black"
          const life = globalTiles[x][y]
          context.beginPath()
          context.rect(y, x, tileSize, tileSize)
          life ? context.fill() : context.stroke()
        }
      }

      context.restore()
    }
  }, [globalTiles,loaded])

  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1)
      }, 1000 / speed)
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, seconds])

  useEffect(() => {
    if (isActive) {
      setNextTiles()
    }
  }, [isActive, seconds])

  const genTiles = () => {
    const tiles = []
    for (let x = 0; x < height; x = x + tileSize) {
      tiles[x] = []
      for (let y = 0; y < width; y = y + tileSize) {
        const life = Math.floor(Math.random() * 2)
        tiles[x][y] = life
      }
    }
    setGlobalTiles(tiles)
  }



  
  const setNextTiles = () => {
    let newTiles = []

    globalTiles.forEach((tile, tileX) => {
      newTiles[tileX] = []
      tile.forEach((life, tileY) => {
        newTiles[tileX][tileY] = 0

        let neighbors = 0

        for (
          let i = tileX - tileSize;
          i <= tileX + tileSize;
          i = i + tileSize
        ) {
          for (
            let j = tileY - tileSize;
            j <= tileY + tileSize;
            j = j + tileSize
          ) {
            if (i >= 0 && i < height) {
              if (j >= 0 && j < width) {
                if (globalTiles[i][j]) neighbors++
              }
            }
          }
        }
        neighbors -= life

        if (neighbors > undercrowd && neighbors < overcrowd) {
          if (life) newTiles[tileX][tileY] = 1
          if (!life && neighbors == birth) {
            newTiles[tileX][tileY] = 1
          }
        } else {
          if (life) {
            newTiles[tileX][tileY] = 0
          }
        }
      })
    })

    setGlobalTiles(newTiles)
  }

  function toggle() {
    setIsActive(!isActive)
  }

  function reset() {
    setSeconds(0)
    setIsActive(false)
    genTiles()
  }

  const handleClick = (e) => {
    const clickX = e.pageX
    const clickY = e.pageY

    console.log(clickX,clickY)
  }

  return (
    <Layout>
      <SEO title="Page two" />
      <h1>ITERATION - {seconds}</h1>
      <div className="app">
        <label>
          tileSize({tileSize}):{" "}
          <input
            type="range"
            value={tileSize}
            min={10}
            max={30}
            onChange={e => {
              setTileSize(parseInt(e.target.value))
            }}
          />
        </label>
        <div className="row">
          <button
            className={`button button-primary button-primary-${
              isActive ? "active" : "inactive"
            }`}
            onClick={toggle}
          >
            {isActive ? "Pause" : "Start"}
          </button>
          <button className="button" onClick={reset}>
            Reset
          </button>
          <label>
            Speed({speed}):
          <input
            type="range"
            value={speed}
            min="1"
            max="20"
            onChange={e => setSpeed(e.target.value)}
          />
          </label>
          <br />
          <label>
            undercrowd:{" "}
            <input
              type="number"
              value={undercrowd}
              onChange={e => setUndercrowd(e.target.value)}
            />
          </label>
          <label>
            overcrowd:{" "}
            <input
              type="number"
              value={overcrowd}
              onChange={e => setOvercrowd(e.target.value)}
            />
          </label>
          <label>
            birth:{" "}
            <input
              type="number"
              value={birth}
              onChange={e => setBirth(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="test">
        
      <canvas
        onClick={handleClick}
        ref={canvas}
        width={width}
        height={height}
        style={{ width, height }}
      />
            </div>
    </Layout>
  )
}

export default SecondPage
