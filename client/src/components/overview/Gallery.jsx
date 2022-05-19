import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';


const Gallery = (props) => {
  const id = useContext(Context).id;

  return(
    <div>
      <div>{id} Gallery</div>
    </div>
  )
}

export default Gallery;