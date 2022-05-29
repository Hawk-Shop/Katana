import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
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

const ActionButton = styled.button`
  position: absolute;
  top: 35%;
  right: 35%;
  background-color: transparent;
  padding: 8px 8px;
  cursor: pointer;
  border-radius: 50%;
  height: 50px;
  width: 50px;
`;

const Star = styled(FontAwesomeIcon)`
  background-color: transparent;
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
`

const OutfitCard = (props) => {
  const ratings = props.card.ratings;
  let averageNums = avgRating(ratings);

  let thumbPath;
  if (!props.card.result) {
    thumbPath = addOutfit;
  }
  else if (props.card.results[0].photos[0].url != null) {
    thumbPath = props.card.results[0].photos[0].url
  } else {
    thumbPath = placeholder;
  }

  let productID = {
    name: props.card.name,
    product_id: props.card.id,
    features: props.card.features
  }


  return (
    <CarouselItem style={props.width}>
      <ImageContainer>
        <CardThumbnail src={thumbPath}></CardThumbnail>
        <ActionButton onClick={() => {props.setShow(true); props.setRef(productID) }}>
          {/* <Star icon={farStar}/> */}
        </ActionButton>
      </ImageContainer>
      <Category>
        {props.card.category ? props.card.category : null}
      </Category>
      <ProductName>
        {props.card.name}
      </ProductName>
      <Price>
        {props.card.default_price ? props.card.default_price : null}
      </Price>
      <div>
        {ratings ? (
        <Reviews rating={averageNums.averageRating} />
        ):null}
          {/* {ratings ? (averageNums.ratingTotal > 0): null} */}
      </div>
    </CarouselItem>
  )


}

export default OutfitCard;