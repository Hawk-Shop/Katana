import { React, useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';

const ProductCard = ({product, id, width}) => {
  return (
    <div className="carousel-item" style={width}>
      <div>
        {product.name}
      </div>
    </div>
  )
}

export default ProductCard;