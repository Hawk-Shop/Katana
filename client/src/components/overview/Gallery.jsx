import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';

const Image = styled.img`
  max-width:100%;
  max-height:100%;
`;

const ImageCtn = styled.div`
  width: 30%;
  margin-right: 5%;
`;

const Gallery = (props) => {
  const id = useContext(Context).id;

  return(
    <ImageCtn>
      <Image src={props.currentStyle.photos[0].url} />
    </ImageCtn>
  )
}

export default Gallery;