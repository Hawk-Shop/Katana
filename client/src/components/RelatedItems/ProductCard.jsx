import { React, useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';

const ProductCard = ({product, id, width}) => {
  return (
    <div className="carousel-item" style={width}>

      <img className="thumbnail" src={`${product.thumbnail}`}></img>
      <button class='action-btn'>
        Star
      </button>
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
    </div>
  )
}

export default ProductCard;