import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';
import AnswersList from './AnswersList.jsx';

const Question = ({question}) => {
  const {question_body, question_date, question_asker, question_helpfulness, answers} = question;
  let convertedAnswers = Object.values(answers); // convert into an array
  // console.log("answers :", convertedAnswers);

  return (
    <div>
      <div>Q: {question_body}</div>
      <div>{format(parseISO(question_date), 'MM/dd/yyyy')}</div>
      <div>{question_asker}</div>
      <span>Helpful? <a>Yes</a> <span>&#40;{question_helpfulness}&#41;</span> | <a>Add Answer</a></span>
      {convertedAnswers.map((answer, index) => {
        // console.log(answer);
        return <AnswersList key={index} answer={answer}/>
      })}
    </div>
  )
}

export default Question;