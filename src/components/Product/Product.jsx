import  { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import classes from './Product.module.css'
import Loader from '../Loader/Loader'
import { productUrl } from '../../Api/endPoints'

const Product = () => {
    const[products,setProducts]=useState()
    const[isLoading,setIsLoading]=useState(false)
    useEffect(()=>{
      setIsLoading(true)
        axios.get(`${productUrl}/products`).then((res)=>{
            setProducts(res.data)
            setIsLoading(false);
        }).catch((err)=>{
            console.log(err)
            setIsLoading(false);
        })
    },[])
    //console.log(products)
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.Product_container}>
          {products?.map((singleProduct, index) => {
            return <ProductCard product={singleProduct} key={index} renderAdd={true}/>;
          })}
        </section>
      )}
    </>
  );
}



export default Product