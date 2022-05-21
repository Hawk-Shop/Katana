import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import axios from 'axios';
import styled from 'styled-components';
import Search from './Search.jsx';
import Question from './Question.jsx';
import { results } from './Data.js';

const QuestionsList = (props) => {
  const id = useContext(Context).id;
  // const questions = results;
  let [questions, setQuestions] = useState([]);

  // submit axios.get request to get questions and answers from API
  useEffect(() => {
    axios
      .get(`/qa/questions/?product_id=${id}`)
      .then(response => {
        // console.log('response.data: ', response.data.results);
        setQuestions(response.data.results);
      })
      .catch(err => {
        alert('Unable to get questions. Sorry...', err);
      })
  }, [])

  return (
    <div>
      <h3>QUESTIONS &#38; ANSWERS</h3>
      <Search />
      {
        questions.map((question, index) => {
          // console.log(question);
          return <Question key={index} question={question}/>
        })
      }
    </div>
  )
}

export default QuestionsList;