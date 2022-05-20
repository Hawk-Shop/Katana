import { React, useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';

const ProductsList = ({list}) => {
  const id = useContext(Context).id;

  return (
    <div className="carousel">
      <div className="inner" style={{ transform: "translateX(-0%" }}>
        {React.Children.map(list, (child, index) => {
          return React.cloneElemenet(child, { width: "100%" });
        })}
      </div>
    </div>
  )
}

export default ProductsList;