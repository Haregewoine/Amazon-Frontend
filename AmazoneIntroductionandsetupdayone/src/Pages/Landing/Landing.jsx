import React from "react"
import Layout from "../../Component/Layout/Layout"
import Carousel from "../../Component/Carousel/CarouselEffect"
import Category from "../../Component/Category/Category"
import Product from "../../Component/Product/Product"

function Landing() {
  return (
    <Layout>
      <Carousel />
      <Category />
      <Product />
    </Layout>
  )
}
export default Landing
