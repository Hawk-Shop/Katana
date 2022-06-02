import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';

const FeatureList = styled.ul`
  list-style-type: none;
  width: 25%;
  margin: 0;
`;

const Feature = styled.li({
  '&:before': {
    content: '"✓"',
  }
})

const InnerFeature = styled.div`
  margin-top: 2%;
  list-style-type: none;
  font-size: 0.9rem;
`;

const Features = (props) => {
  const id = useContext(Context).id;

  return(
    <FeatureList>
      {props.product.features.map((feature, index) => (
        <InnerFeature key={index}><Feature>{feature.feature}: {feature.value}</Feature></InnerFeature>
      ))}
    </FeatureList>
  )
}

export default Features;