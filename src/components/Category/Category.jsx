/* eslint-disable no-unused-vars */
import React from 'react'
import { categoryImage } from './CategoryFullinfos'
import CategoryCard from './CategoryCard'
import classes from './Category.module.css'

function Category() {
  return (
    <div className={classes.category_container}>
    {categoryImage.map((infos,i)=>(
      <CategoryCard key={i} data={infos}/>

    ))}
    </div>
  )
}

export default Category
