import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import ProductInfo from './ProductInfo.jsx';
import Style from './Style.jsx';
import Cart from './Cart.jsx';
import Gallery from './Gallery.jsx';
import styled from 'styled-components';

const Yaba = styled.div`
  color: blue;
`;

const Overview = (props) => {
  const id = useContext(Context).id;

  return(
    <div>
      <ProductInfo />
      <Style />
      <Cart />
      <Gallery />
    </div>
  )
}

export default Overview;