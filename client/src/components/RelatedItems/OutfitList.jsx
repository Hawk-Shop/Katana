import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';
import OutfitCard from './OutfitCard.jsx';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';

const Carousel = styled.div`
  overflow: hidden;
  max-width: 1036px;
`;

const Inner = styled.div`
  white-space: nowrap;
  transition: transform 0.3s;
`;

const Scroll = styled.div`
  display: flex;
  justify-content: center;
`;

const LeftButton = styled.button`
  margin-top: 0px;
  margin-right: 25px;
  margin-bottom: 5px;
  background-color: transparent;
  border: none;
  height: 30px;
  width: 40px;
  color: #a9a9a9;
  transform: scale(1.05);
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.20) 0px 5px 10px;
    transform: scale(1.05);
  }
`;

const RightButton = styled.button`
  margin-top: 0px;
  margin-left: 25px;
  margin-bottom: 5px;
  background-color: transparent;
  border: none;
  height: 30px;
  width: 40px;
  color: #a9a9a9;
  transform: scale(1.05);
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.20) 0px 5px 10px;
    transform: scale(1.05);
  }
`;

const LeftArrow = styled(ImArrowLeft)`
  background-color: transparent;
`
const RightArrow = styled(ImArrowRight)`
  background-color: transparent;
`

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
      <Scroll>
        {length > 4 ?
          <>
          <LeftButton onClick={() => {updateIndex(activeIndex - 1);}}>
            <LeftArrow size={20}/>
          </LeftButton>
          <RightButton onClick={() => {updateIndex(activeIndex + 1);}}>
            <RightArrow size={20}/>
          </RightButton>
          </>
        : null}
      </Scroll>
    </Carousel>
  )
}

export default OutfitList;