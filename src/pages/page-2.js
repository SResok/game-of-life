import React, { useRef,useLayoutEffect, useEffect } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = props => {
  let windowWidth, windowHeight;
  if (window) {
    windowWidth = Math.floor(window.innerWidth / 100 * 85)
    windowHeight = Math.floor((window.innerHeight / 100) * 65)
  }
  else {
    windowWidth = 400
    windowHeight = 400
  }
  const tileSize = 20

  windowWidth = windowWidth - (windowWidth % tileSize)
  windowHeight = windowHeight - (windowHeight % tileSize)

  const {
    width = windowWidth,
    height = windowHeight,
    pixelRatio = window.devicePixelRatio,
  } = props

  const canvas = useRef(null);

  useEffect(() => {
    const context = canvas.current.getContext("2d")

    context.save()
    context.scale(pixelRatio, pixelRatio)
    context.fillStyle = "hsl(0, 0%, 95%)"

    context.fillRect(0, 0, width, height)

    context.strokeStyle = "black"
    for (let i = 0; i < width; i = i + 20) {
      for (let j = 0; j < height; j = j + 20) {
        context.fillStyle = "black"
        const life = Math.floor(Math.random() * 2)
        context.beginPath()
        context.rect(i, j, 20, 20)

        life ? context.fill() : context.stroke()

      }
    }

    context.restore()
  })



  const dw = Math.floor(pixelRatio * width);
  const dh = Math.floor(pixelRatio * height);
  const style = { width, height };


return (
  <Layout>
    <SEO title="Page two" />
    <h1>CANVAS GAMEOFLIFE</h1>
    return <canvas ref={canvas} width={dw} height={dh} style={style} />
  </Layout>
)
}

export default SecondPage
