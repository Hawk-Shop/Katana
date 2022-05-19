import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';

const QuestionsList = (props) => {
  const id = useContext(Context).id;

  const Search = styled.input`

  `;

  return (
    <div>
      <h3>QUESTIONS &#38; ANSWERS</h3>
      <input placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." size="50"/>
    </div>
  )
}

export default QuestionsList;