import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import avgRating from "../util/getAvgRating.js";
import Stars from "../R&R/Stars.jsx";
import placeholder from './placeholder.png';


const CarouselItem = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  min-height: 269px;
  max-width: 205px;
  background-color: transparent;
  font-family: Arial Regular;
  padding: 0;
  margin: 10px 25px;
  transform: scale(1.05);
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.10) 0px 5px 10px;
    transform: scale(1.05);
  }
`;

const CardThumbnail = styled.img`
  object-fit: cover;
  max-width: 100%;
  max-height: 200px;
  border: 1px solid gray;
`;

const ImageContainer = styled.div`
  position: relative;
`

const ActionButton = styled.button`
  position: absolute;
  top: 0%;
  right: 0%;
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

const Reviews = styled(Stars)`
  display: inline;
`;

const ProductName = styled.div`
  font-weight: bold;
  font-size: medium;
`;

const Category = styled.div`
  font-size: small;
  color: gray;
`;

const Price = styled.div`
  font-size: small;
  color: gray;
`
const Review = styled.div`
  font-size: small;
  color: gray;

`

const ProductCard = (props) => {
  const setId= useContext(Context).setId
  const ratings = props.card.ratings;
  let averageNums = avgRating(ratings);
  let thumbURL = props.card.results[0].photos[0].thumbnail_url;

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
    <CarouselItem style={props.width} onClick={() => {
      setId(props.card.id);
      props.scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }}>
      <ImageContainer>
        <CardThumbnail src={thumbPath}></CardThumbnail>
        <ActionButton onClick={(e) => {
          e.stopPropagation();
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
      </Review>
    </CarouselItem>
  )
}

export default ProductCard;