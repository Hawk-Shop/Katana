import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';

const Image = styled.img`
  width: 20em;
  margin-right: 5%;
`;

const Gallery = (props) => {
  const id = useContext(Context).id;
  console.log(props.styles.results[0].photos[0])
  return(
    <>
      <Image src="https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80" onerror="this.src='images/not_found.png';" />
    </>
  )
}

export default Gallery;