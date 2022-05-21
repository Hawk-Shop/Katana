import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';

const StyleName = styled.h3`
  margin: 10% 0 0 0;
  font-size: 1rem;
  font-weight:bold;
`
const SelectedStyle = styled.span`
  font-size: 1rem;
  font-weight: normal;
`

const Style = ({product, style, currentStyle}) => {

  return(
    <div>
      <StyleName>STYLE > <SelectedStyle>{currentStyle.name}</SelectedStyle></StyleName>
    </div>
  )
}

export default Style;