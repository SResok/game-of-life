import React from "react"

import Layout from "../components/layout"

import SEO from "../components/seo"
import Board from "../components/gameOfLife/board"
import store from "../components/gameOfLife/store"


const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Board store={store}/>
  </Layout>
)

export default IndexPage
