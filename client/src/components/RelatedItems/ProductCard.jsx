import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import Modal from './Comparison.jsx';
import avgRating from "../util/getAvgRating.js";
import Stars from "../R&R/Stars.jsx";
import placeholder from './placeholder.png';


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
  top: 0%;
  right: 5%;
  background-color: transparent;
  color: white;
  padding: 0;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  height: 25px;
  width: 25px;
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
const Review = styled.div`
  font-size: medium;
`

const ProductCard = (props) => {
  const ratings = props.card.ratings;
  let averageNums = avgRating(ratings);
  let thumbURL = props.card.results[0].photos[0].url;

  let thumbPath;
  if (thumbURL != null) {
    thumbPath = thumbURL
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
        <ActionButton onClick={(e) => {
          e.stopProgation();
          props.setShow(true);
          props.setRef(productID);
          }}>
          <Star icon={farStar} size="lg" />
        </ActionButton>
      </ImageContainer>
      <Category>
        {props.card.category}
      </Category>
      <ProductName>
        {props.card.name}
      </ProductName>
      <Price>
        ${props.card.default_price}
      </Price>
      <Review>
        <Reviews rating={averageNums.averageRating} />
          {/* {averageNums.ratingTotal > 0} */}
      </Review>
    </CarouselItem>
  )
}

export default ProductCard;