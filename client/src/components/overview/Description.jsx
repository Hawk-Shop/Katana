import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';



const Description = (props) => {
  const id = useContext(Context).id;
  // console.log(props.product);

  return(
    <div>
      <div>{props.product.description}</div>
    </div>
  )
}

export default Description;