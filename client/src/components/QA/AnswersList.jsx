import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';

const AnswersList = (props) => {
  const id = useContext(Context).id;
  const [answersList, setAnswersList] = useState([])

  // submit axios.get request to get all answers to the API

  return (
    <div>
      <h5>AnswersList</h5>
    </div>
  )
}

export default AnswersList;