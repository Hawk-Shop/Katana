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
  let [questionCount, setQuestionCount] = useState(4);

  // submit axios.get request to get questions and answers from API
  useEffect(() => {
    axios
      .get(`/qa/questions/?product_id=${40355}&count=300`)
      .then(response => {
        // console.log('response.data: ', response.data.results);
        setQuestions(response.data.results);
      })
      .catch(err => {
        alert('Unable to get questions. Sorry...', err);
      })
  }, [])

  const Button = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid grey;
    margin: 2em 1em;
    padding: 0.5em 1em;
    &:hover {
      background: lightgrey;
    }
  `;

  const Section = styled.section`
    overflow: auto;
    height:100%;
    max-height: 50vh;
    width: 45em;
    display: flex;
    flex-direction: column;
  `;

  const Sort = styled.div`
    padding: 1em;
    margin-left: auto;
    margin-right: auto;
  `;

  const showMoreQuestions = (
    <Button onClick={() => setQuestionCount(questionCount + 2)}>
      More Questions
    </Button>
  )

  return (
    <>
      <h2>Questions &#38; Answers</h2>
      <Sort>
        <Search />
        <br/>
        <p>Click on a question to view their respective answers.</p>
        <Section>
          {questions.slice(0, questionCount).map((question, index) => {
            return <Question key={index} question={question} id={id}/>
          })}
        </Section>
        <p>Viewing {questionCount} of {questions.length} questions</p>
        {questionCount < questions.length && (
          showMoreQuestions
        )}
        <Button>
          Add a Question +
        </Button>
      </Sort>
    </>
  )
}

export default QuestionsList;