import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';
import OutfitCard from './OutfitCard.jsx';


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


const OutfitList = ({outfit, activeIndex, setOutfit, updateIndex}) => {
  const id = useContext(Context).id;
  const length = outfit.length;

  return (
    <Carousel>
      <Inner
        style={{ transform: `translateX(-${activeIndex * 100}%)`}}>
        { outfit ?
          outfit.map((card) => (
            <OutfitCard
            card={card}
            width={{ width: "25%"}}
            setOutfit={setOutfit}
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

export default OutfitList;