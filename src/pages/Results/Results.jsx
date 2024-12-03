import React, { useState } from 'react'
import LayOut from '../../components/LayOut/LayOut'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Category from '../../components/Category/Category';
import { productUrl } from '../../Api/endPoints';
import { useEffect } from 'react';
import ProductCard from '../../components/Product/ProductCard';
import classes from './Results.module.css'
import Loader from '../../components/Loader/Loader';

const Results = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { categoryName } = useParams(); 

  useEffect(() => {
  setIsLoading(true)
      axios
        .get(`${productUrl}/products/category/${categoryName}`)
        .then((res) => {
          setResults(res.data);
          setIsLoading(false)
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false)
        });
  }, []); 
   console.log(results)
  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category/{categoryName}</p>
        <hr />
        { isLoading? (<Loader/>):(
            <div className={classes.products_container}>
          {results?.map((product) => (
            <ProductCard
             key={product.id} 
             product={product} 
             renderDesc={false}
             renderAdd={true}
             />
          ))}
        </div>

        )}
        
      </section>
    </LayOut>
  );
};

export default Results;