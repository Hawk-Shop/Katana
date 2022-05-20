import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';
import AnswersList from './AnswersList.jsx';

const Question = (props) => {
  const id = useContext(Context).id;
  const [question, setQuestion] = useState('')

  // submit axios.get request to pull questions and answers from API

  return (
    <div>
      <h4>Individual Question</h4>
      <AnswersList />
    </div>
  )
}

export default Question;