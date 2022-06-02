import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';
import OutfitCard from './OutfitCard.jsx';


const Carousel = styled.div`
  overflow: hidden;
  max-width: 1036px;
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

const OutfitList = ({outfit, handleAddClick, setDelete, scrollRef}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const length = outfit.length;

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
        {outfit ?
          outfit.map((card) => (
            <OutfitCard
            card={card}
            width={{ width: "25%"}}
            handleAddClick={handleAddClick}
            key={card.id}
            setDelete={setDelete}
            scrollRef={scrollRef}
            />
          ))
        :null}
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

export default OutfitList;