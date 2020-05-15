import React, { useRef, useLayoutEffect, useEffect, useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = props => {
  const [seconds, setSeconds] = useState(0)
  const [speed, setSpeed] = useState(10)
  const [isActive, setIsActive] = useState(false)
  const [globalTiles, setGlobalTiles] = useState([])

  const [birth,setBirth] = useState(3)
  const [overcrowd, setOvercrowd] = useState(4)
  const [undercrowd, setUndercrowd] = useState(1)

  let {windowWidth = 400,windowHeight=400,pixelRatio = 1}
  if (typeof (window) != undefined) {
    windowWidth = Math.floor((window.innerWidth / 100) * 85),
    windowHeight = Math.floor((window.innerHeight / 100) * 65),
    pixelRatio = window.devicePixelRatio
  }

  const [tileSize,setTileSize] = useState(20)

  const width = windowWidth - (windowWidth % tileSize)
  const height = windowHeight - (windowHeight % tileSize)

  const canvas = useRef(null)
  useEffect(() => {
    genTiles()
  }, [])

  useEffect(() => {
    if (globalTiles.length) {
      const context = canvas.current.getContext("2d")

      context.save()
      context.scale(pixelRatio, pixelRatio)
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
  },[globalTiles])

  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1)
      }, 1000/speed)
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

        for (let i = tileX - tileSize; i <= tileX + tileSize; i = i + tileSize){
          for (let j = tileY - tileSize; j <= tileY + tileSize; j = j + tileSize){
            if (i >= 0 && i < height) {
              if (j >= 0 && j < width) {
                if(globalTiles[i][j]) neighbors++
              }
            }
          }
        }
        neighbors -= life;

        
        if (neighbors > undercrowd && neighbors < overcrowd) {
          if(life) newTiles[tileX][tileY] = 1
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


  const dw = Math.floor(pixelRatio * width)
  const dh = Math.floor(pixelRatio * height)
  const style = { width, height }

  function toggle() {
    setIsActive(!isActive)
  }

  function reset() {
    setSeconds(0)
    setIsActive(false)
    genTiles()
  }

  return (
    <Layout>
      <SEO title="Page two" />
      <h1>ITERATION - {seconds}</h1>
      <div className="app">
        {/* <label>
          tileSize:{" "}
          <input
            type="number"
            value={tileSize}
            onChange={e => {
              setTileSize(e.target.value)
              genTiles()
            }}
          />
        </label> */}
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
          <input
            type="range"
            value={speed}
            min="1"
            max="20"
            onChange={e => setSpeed(e.target.value)}
          />
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
      <canvas ref={canvas} width={dw} height={dh} style={style} />
    </Layout>
  )
}

export default SecondPage
