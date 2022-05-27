import { React, useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import Modal from './Comparison.jsx';
import avgRating from "../util/getAvgRating.js";
import Stars from "../R&R/Stars.jsx";


const CarouselItem = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 275px;
  background-color: transparent;
  color: gray;

`;

const CardThumbnail = styled.img`
  object-fit: contain;
  max-width: 100%;
  max-height: 200px;
`;

const ActionButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  color: white;
  padding: 8px 8px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
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

const ProductCard = (props) => {
  const ratings = props.card.ratings;
  let averageNums = avgRating(ratings);

  return (
    <CarouselItem style={props.width}>
      <ImageContainer>
        <CardThumbnail src={props.card.results[0].photos[0].url}></CardThumbnail>
        <div>
          <ActionButton onClick={() => props.setShow(true)}>
            <Star icon={farStar}/>
          </ActionButton>
          <Modal
            onClose={() => props.setShow(false)}
            show={props.show}
          />
        </div>
      </ImageContainer>

      <div>
        {props.card.name}
      </div>
      <div>
        {props.card.category}
      </div>
      <div>
        ${props.card.default_price}
      </div>
      <div>
        {/* <span className="stars" style={{ "--rating": props.card.rating}}></span> */}
        <Reviews rating={averageNums.averageRating} />
          {averageNums.ratingTotal > 0}
      </div>
    </CarouselItem>
  )
}

export default ProductCard;