import React from "react"

import Layout from "../components/layout"

import SEO from "../components/seo"
import Board from "../components/board/"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Board/>
  </Layout>
)

export default IndexPage
