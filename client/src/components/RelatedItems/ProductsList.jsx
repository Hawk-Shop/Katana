import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';
import ProductCard from './ProductCard.jsx';
import Modal from './Comparison.jsx';


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

const ProductsList = ({list, show, activeIndex, setShow, setRef, updateIndex}) => {
  const id = useContext(Context).id;
  const length = list.length;

  return (
    <Carousel>
      <Inner
        style={{ transform: `translateX(-${activeIndex * 100}%)`}}>
        { list ? list.map((card) => (
           <ProductCard
           card={card}
           width={{ width: "25%"}}
           show={show}
           setShow={setShow}
           setRef={setRef}
           />
        )): null}
      </Inner>
      <Indicators>
        {length > 4 ?
          <>
          <IndicatorButton onClick={() => {updateIndex(activeIndex - 1);}}>
            Prev
          </IndicatorButton>
          <IndicatorButton onClick={() => {updateIndex(activeIndex + 1);}}>
            Next
          </IndicatorButton>
          </>
        : null}
      </Indicators>
    </Carousel>
  )
}

export default ProductsList;

