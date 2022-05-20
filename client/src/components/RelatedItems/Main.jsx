import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';
import ProductsList from './ProductsList.jsx';
// import OutfitList from './OutfitList.jsx';

const RelatedProducts = () => {
  const id = useContext(Context).id;

  return(
    <div>
      <h3>Related Products</h3>
      <ProductsList />
      <h3>Your Outfit</h3>
      {/* <OutfitList /> */}
    </div>

  )
}

export default RelatedProducts;