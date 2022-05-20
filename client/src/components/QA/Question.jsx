import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';

const QuestionsList = (props) => {
  const id = useContext(Context).id;
  const [question, setQuestion] = useState('')

  // submit axios.get request to pull questions and answers from API

  return (
    <div>

    </div>
  )
}

export default QuestionsList;