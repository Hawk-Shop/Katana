import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';

const Image = styled.img`
  max-width:100%;
  max-height:100%;
`;

const ImageCtn = styled.div`
  width: 50%;
  margin-right: 5%;
`;

const Gallery = (props) => {
  const id = useContext(Context).id;
  console.log(props.styles.results[0].photos[0])
  return(
    <ImageCtn>
      <Image src="https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80" onerror="this.src='images/not_found.png';" />
    </ImageCtn>
  )
}

export default Gallery;