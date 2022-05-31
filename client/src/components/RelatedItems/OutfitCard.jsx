import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';
import { AiFillPlusCircle} from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';
import avgRating from "../util/getAvgRating.js";
import Stars from "../R&R/Stars.jsx";
import placeholder from './placeholder.png';
import addOutfit from './AddOutfit.jpeg'

const CarouselItem = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 275px;
  background-color: transparent;
  color: gray;
  font-family: Arial Regular;
`;

const CardThumbnail = styled.img`
  object-fit: contain;
  max-width: 96%;
  max-height: 200px;
`;

const AddButton = styled.button`
  position: absolute;
  top: 35%;
  right: 35%;
  background-color: transparent;
  padding: 0;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 50%;
  height: 50px;
  width: 50px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 5%;
  background-color: transparent;
  color: white;
  padding: 0;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  height: 25px;
  width: 25px;
`;

const Delete = styled(TiDelete)`
  background-color: transparent;
`;
const Circle = styled(AiFillPlusCircle)`
  background-color: transparent;
  color: gray;
`;

const ImageContainer = styled.div`
  position: relative;
`
const Reviews = styled(Stars)`
  display: inline;
`;

const ProductName = styled.div`
  font-weight: bold;
  color: black;
  font-size: medium;
`;

const Category = styled.div`
  font-size: small;
`;

const Price = styled.div`
  font-size: small;
`;

const Review = styled.div`
  font-size: medium;
`

const OutfitCard = (props) => {
  const ratings = props.card.ratings;
  let averageNums = avgRating(ratings);

  let thumbPath;
  if (props.card.id === 1) {
    thumbPath = addOutfit;
  } else if (props.card.results[0].photos[0].url != null) {
    thumbPath = props.card.results[0].photos[0].url
  } else {
    thumbPath = placeholder;
  }

  let priceSign = `$${props.card.default_price}`;

  return (
    <CarouselItem style={props.width}>
      <ImageContainer>
        <CardThumbnail src={thumbPath}></CardThumbnail>
          {props.card.name === 'ADD TO YOUR OUTFIT' ?
            <AddButton onClick={props.handleAddClick}>
              <Circle size={50}/>
            </AddButton>:
            <DeleteButton onClick={(e) => {
              e.stopPropagation();
              props.setDelete(props.card.id)
              }}>
              <Delete size={25}/>
            </DeleteButton>}
      </ImageContainer>
      <Category>
        {props.card.category ? props.card.category : null}
      </Category>
      <ProductName>
        {props.card.name}
      </ProductName>
      <Price>
        {props.card.default_price ? priceSign : null}
      </Price>
      <Review>
        {ratings ? (
        <Reviews rating={averageNums.averageRating} />
        ):null}
      </Review>
    </CarouselItem>
  )
}

export default OutfitCard;