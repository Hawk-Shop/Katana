import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';

const FeatureList = styled.ul`
  border-left: solid 1px black;
  list-style-type: none;
  width: 40%;
`;

const Feature = styled.li({
  '&:before': {
    content: '"✓"',
  },
})

const Features = (props) => {
  const id = useContext(Context).id;

  return(
    <FeatureList>
      {props.product.features.map((feature) => (
        <Feature>{feature.feature}: {feature.value}</Feature>
      ))}
    </FeatureList>
  )
}

export default Features;