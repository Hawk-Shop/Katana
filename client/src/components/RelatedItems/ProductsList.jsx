import { React, useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
// import styled from 'styled-components';
import ProductCard from './ProductCard.jsx';


const ProductsList = ({list}) => {
  const id = useContext(Context).id;

  return (
    <div className="carousel">
      <div className="inner" style={{ transform: "translateX(-0%" }}>
        {list.map((product, index) => {
          return <ProductCard product={product} id={index} width={{ width: "100%"}} />
          // return React.cloneElemenet(child, { width: "100%" });
        })}
      </div>
    </div>
  )
}

export default ProductsList;