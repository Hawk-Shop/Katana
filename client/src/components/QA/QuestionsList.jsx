import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';
import Search from './Search.jsx';
import Question from './Question.jsx';

const QuestionsList = (props) => {
  const id = useContext(Context).id;
  const [searchInput, setSearchInput] = useState('')


  return (
    <div>
      <h3>QUESTIONS &#38; ANSWERS</h3>
      <Search />
      <Question />
    </div>
  )
}

export default QuestionsList;