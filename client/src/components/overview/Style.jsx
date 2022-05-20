import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';


const Style = (props) => {
  const id = useContext(Context).id;

  return(
    <div>
      <div></div>
    </div>
  )
}

export default Style;