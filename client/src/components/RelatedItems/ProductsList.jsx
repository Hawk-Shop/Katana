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

const ProductsList = (props) => {
  const id = useContext(Context).id;
  const [activeIndex, setActiveIndex] = useState(0);
  const length = props.list.length;

  const updateIndex = (newIndex) => {
    // console.log("checkIndex:",newIndex);
    // console.log("content length:", list.length);
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= (length/4)) {
      newIndex = (length/4) -1;
    }
    setActiveIndex(newIndex);
  };

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
           setRef={props.setRef}
           />
        )): null}
      </Inner>
      <Indicators>
        {props.list.length > 4 ?
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

//async data
  // when data exist
  // when data does not exist