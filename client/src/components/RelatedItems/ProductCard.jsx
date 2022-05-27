import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";


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

const ProductCard = ({product, id, width}) => {
  return (
    <CarouselItem style={width}>
      <ImageContainer>
        <CardThumbnail src={`${product.thumbnail}`}></CardThumbnail>
        <ActionButton >
          <Star icon={farStar}/>
        </ActionButton>
      </ImageContainer>

      <div>
        {product.name}
      </div>
      <div>
        {product.category}
      </div>
      <div>
        ${product.default_price}
      </div>
      <div>
      <span className="stars" style={{ "--rating": product.rating}}></span>
    </div>
    </CarouselItem>
  )
}

export default ProductCard;