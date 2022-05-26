import { React, useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';
import ProductCard from './ProductCard.jsx';

const Carousel = styled.div`
  overflow: hidden;
`;

const Inner = styled.div`
  white-space: nowrap;
  transition: transform 0.3s;
`;

const Indicators = styled.div`
  display: flex;
  justify-content: center;
`;

const IndicatorButton = styled.button`
  margin: 5px;
`;

const ProductsList = ({list}) => {
  const id = useContext(Context).id;
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex) => {
    // console.log("checkIndex:",newIndex);
    // console.log("content length:", list.length);
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= (list.length/4)) {
      newIndex = (list.length/4) -1;
    }
    setActiveIndex(newIndex);
  };

  return (
    <Carousel>
      <Inner
        style={{ transform: `translateX(-${activeIndex * 100}%)`}}>
        {list.map((card) => {
          return <ProductCard
            card={card}
            width={{ width: "25%"}}
            />
        })}
      </Inner>
      <Indicators>
        <IndicatorButton onClick={() => {updateIndex(activeIndex - 1);}}>
          Prev
        </IndicatorButton>
        <IndicatorButton onClick={() => {updateIndex(activeIndex + 1);}}>
          Next
        </IndicatorButton>
      </Indicators>
    </Carousel>
  )
}

export default ProductsList;