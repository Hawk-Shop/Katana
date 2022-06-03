import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';
import ProductCard from './ProductCard.jsx';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';
import {useMediaQuery} from 'react-responsive';


const Carousel = styled.div`
  overflow: hidden;
  max-width: 1036px;
`;

const Inner = styled.div`
  white-space: nowrap;
  transition: transform 0.3s;
  margin-left: 15px;
`;

const MobileInner = styled.div`
  white-space: nowrap;
  transition: transform 0.3s;
  margin-left: 35px;
  align-items: center;
`

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
  cursor: pointer;
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
  cursor: pointer;
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

const ProductsList = ({list, show, setShow, setRef, scrollRef}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const id = useContext(Context).id;
  const length = list.length;

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= (length/4) && isDesktopOrLaptop) {
      newIndex = (length/4) -1;
    } else if (newIndex >= (length) && isTabletOrMobile) {
      newIndex = (length) -1;
    }
    setActiveIndex(newIndex);
  };


  return (
    <>
    {isTabletOrMobile &&
      <Carousel>
        <MobileInner
          style={{ transform: `translateX(-${activeIndex * 100}%)`}}>
          { list ? list.map((card) => (
            <ProductCard
            card={card}
            width={{ width: "100%"}}
            show={show}
            setShow={setShow}
            setRef={setRef}
            scrollRef={scrollRef}
            key={card.id}
            />
          )): null}
        </MobileInner>
        <Scroll>
          {length > 1 ?
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
    }
    {isDesktopOrLaptop &&
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
            scrollRef={scrollRef}
            key={card.id}
            />
          )): null}
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
    }
    </>
  )
}

export default ProductsList;

