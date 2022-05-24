import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';

const ProdSlogan = styled.h3`
  margin: 0 0 2% 0;
`

const DesCtn = styled.div`
  border-right: solid 1px black;
  padding-right: 18%;
`

const Description = (props) => {
  // console.log(props.product);

  return(
    <DesCtn>
      <ProdSlogan>{props.product.slogan}</ProdSlogan>
      <div>{props.product.description}</div>
    </DesCtn>
  )
}

export default Description;