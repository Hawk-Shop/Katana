import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';


const Cart = (props) => {
  const id = useContext(Context).id;

  return(
    <div>
      <div>{id} Cart</div>
    </div>
  )
}

export default Cart;