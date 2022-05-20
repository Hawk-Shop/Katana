import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';
import AnswersList from './AnswersList.jsx';

const Question = ({question}) => {
  const {question_body, question_date, question_asker, question_helpfulness, answers} = question;
  let convertedAnswers = Object.values(answers); // convert into an array
  console.log("answers :", convertedAnswers);

  return (
    <div>
      <span>
        <h4>Q: Individual Question</h4>
        <div>{format(parseISO(question_date), 'MM/dd/yyyy')}</div>
        <div>{question_body}</div>
        <div>{question_asker}</div>
        {convertedAnswers.map((answer, index) => {
          console.log(answer);
          return <AnswersList key={index} answer={answer}/>
        })}
      </span>
      <span>
        Helpful?
        <a>Yes</a>
        <p>&#40;{question_helpfulness}&#41;</p>
        |
        <a>Add Answer</a>
      </span>
    </div>
  )
}

export default Question;