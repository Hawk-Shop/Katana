import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';
import ProductCard from './ProductCard.jsx';


const Carousel = styled.div`
  overflow: hidden;
  max-width: 1000px;
`;

const Inner = styled.div`
  white-space: nowrap;
  transition: transform 0.3s;
`;

const Scroll = styled.div`
  display: flex;
  justify-content: center;
`;

const ScrollButton = styled.button`
  margin: 5px;
`;

const ProductsList = ({list, show, setShow, setRef, setId}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const id = useContext(Context).id;
  const length = list.length;


  const updateIndex = (newIndex) => {
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
        { list ? list.map((card) => (
           <ProductCard
           card={card}
           width={{ width: "25%"}}
           show={show}
           setShow={setShow}
           setRef={setRef}
           setId={setId}
           key={card.id}
           />
        )): null}
      </Inner>
      <Scroll>
        {length > 4 ?
          <>
          <ScrollButton onClick={() => {updateIndex(activeIndex - 1);}}>
            Prev
          </ScrollButton>
          <ScrollButton onClick={() => {updateIndex(activeIndex + 1);}}>
            Next
          </ScrollButton>
          </>
        : null}
      </Scroll>
    </Carousel>
  )
}

export default ProductsList;

