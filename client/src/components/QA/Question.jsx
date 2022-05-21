import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';
import AnswersList from './AnswersList.jsx';

const Question = ({question}) => {
  const {question_id, question_body, question_date, question_asker, question_helpfulness, answers} = question;
  let [answersList, setAnswersList] = useState([]);

  useEffect(() => {
    axios
      .get(`/qa/questions/${question_id}/answers`)
      .then(response => {
        console.log('response.data: ', response.data.results);
        setAnswersList(response.data.results);
      })
      .catch(err => {
        alert('Unable to get questions. Sorry...', err);
      })
  }, [])

  return (
    <div>
      <div>Q: {question_body}</div>
      <div>{format(parseISO(question_date), 'MM/dd/yyyy')}</div>
      <div>{question_asker}</div>
      <span>Helpful? <a>Yes</a> <span>&#40;{question_helpfulness}&#41;</span> | <a>Add Answer</a></span>
      {answersList.map((answer, index) => {
        // console.log(answer);
        return <AnswersList key={index} answer={answer}/>
      })}
    </div>
  )
}

export default Question;