import React, { useState } from 'react'
import LayOut from '../../components/LayOut/LayOut'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../components/Product/ProductCard';
import Loader from '../../components/Loader/Loader';


const ProductDetail = () => {
  const {productId} =useParams()
  const [product, setproducts] = useState({})
   const [isLoading,setIsLoading] = useState(false)
  useEffect(() => {
     setIsLoading(true)
    axios.get(`${productUrl}/products/${productId}`)
    .then((res) =>{
     setproducts(res.data)
      setIsLoading(false)
    }) .catch((err) =>{
      console.log(err)
       setIsLoading(false)
    })

  },[])
  return (
    <LayOut>
      {isLoading ? <Loader /> : <ProductCard product={product} flex={true}
      renderDesc={true} renderAdd={true}
      />}
    </LayOut>
  );
}

export default ProductDetail