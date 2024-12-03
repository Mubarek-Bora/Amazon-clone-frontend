import React from 'react'
import LayOut from '../../components/LayOut/LayOut'
import CarouselComponent from "../../components/Carousel/CarouselComponent";
import Category from '../../components/Category/Category'
import Product from '../../components/Product/Product'

const Landing = () => {
  return (
    <LayOut>
      <CarouselComponent />
      <Category />
      <Product/>
    </LayOut>
  );
}

export default Landing
