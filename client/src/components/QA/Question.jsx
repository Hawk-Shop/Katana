import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';
import AnswersList from './AnswersList.jsx';

const Question = ({question}) => {
  const {question_id, question_body, question_date, question_asker, question_helpfulness, answers} = question;
  let [answersList, setAnswersList] = useState([]);
  let [answerCount, setAnswerCount] = useState(2);

  useEffect(() => {
    axios
      .get(`/qa/questions/${question_id}/answers`)
      .then(response => {
        // console.log('response.data: ', response.data.results);
        setAnswersList(response.data.results);
      })
      .catch(err => {
        console.error('Unable to get answers. Sorry...', err);
      })
  }, [])

  return (
    <div>
      <span>Q: {question_body}</span>
      <span>Helpful? <button>Yes <span>&#40;{question_helpfulness}&#41;</span></button>  | <button>Add Answer</button></span>
      <div>{question_asker}</div>
      {answersList.slice(0, answerCount).map((answer, index) => {
        // console.log(answer);
        return <AnswersList key={index} answer={answer}/>
      })}
    </div>
  )
}

export default Question;