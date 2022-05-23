import { React, useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
// import styled from 'styled-components';
import ProductCard from './ProductCard.jsx';


const ProductsList = ({list}) => {
  const id = useContext(Context).id;
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= list.length) {
      newIndex = list.length - 1;
    }
    setActiveIndex(newIndex);
  };

  return (
    <div className="carousel">
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)`}}>
        {list.map((product, index) => {
          return <ProductCard product={product} id={index} width={{ width: "25%"}} />
          // return React.cloneElemenet(child, { width: "100%" });
        })}
      </div>
      <div className="indicators">
        <button onClick={() => {updateIndex(activeIndex - 1);}}>
          Prev
        </button>
        <button onClick={() => {updateIndex(activeIndex + 1);}}>
          Next
        </button>
      </div>
    </div>
  )
}

export default ProductsList;