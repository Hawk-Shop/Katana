import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';
import sortStyles from "../util/sortStyles.js"

const StyleName = styled.div`
  margin: 10% 0 0 0;
  font-size: 1rem;
  font-weight:bold;
`
const SelectedStyle = styled.span`
  font-size: 1rem;
  font-weight: normal;
`

const StylesCtn = styled.div`
  display: flex;
`

const Style = ({product, styles, currentStyle}) => {
  sortStyles(styles, currentStyle.style_id)

  return(
    <div>
      <StyleName>STYLE {">"} <SelectedStyle>{currentStyle.name}</SelectedStyle></StyleName>
      <StylesCtn></StylesCtn>
    </div>
  )
}

export default Style;