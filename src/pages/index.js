import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import GameOfLife from '../GameOfLife'



const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <GameOfLife/>
  </Layout>
)

export default IndexPage
