<<<<<<< HEAD
import React, { useState, useEffect, useContext } from 'react';
=======
import { useState, useEffect, useContext } from 'react';
>>>>>>> master
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

const ProductsList = (props) => {
  const id = useContext(Context).id;
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex) => {
    // console.log("checkIndex:",newIndex);
    // console.log("content length:", list.length);
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= (props.list.length/4)) {
      newIndex = (props.list.length/4) -1;
    }
    setActiveIndex(newIndex);
  };

  // useEffect(() => {
  //   let newState = props.list.map((card) => (
  //       <ProductCard
  //       card={card}
  //       width={{ width: "25%"}}
  //       show={props.show}
  //       setShow={props.setShow}
  //       />
  //   ));
  //   props.setList(newState);
  // }, [props.setList])
  console.log("WHATS LIST", props.list);
  return (
    <Carousel>
      <Inner
        style={{ transform: `translateX(-${activeIndex * 100}%)`}}>
        { props.list ? props.list.map((card) => (
           <ProductCard
           card={card}
           width={{ width: "25%"}}
           show={props.show}
           setShow={props.setShow}
           />
        )): null}
        {/* <ProductCard list={props.list}/> */}
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

//async data
  // when data exist
  // when data does not exist