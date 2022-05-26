import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import axios from 'axios';
import styled from 'styled-components';
import Search from './Search.jsx';
import Question from './Question.jsx';
import QuestionModal from './Modals/QuestionModal.jsx';
import { results } from './Data.js';


const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid grey;
  margin-right: 1em;
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

const QuestionsList = (props) => {
  const id = 40355;
  // const id = useContext(Context).id;
  let [questions, setQuestions] = useState([]);
  let [questionCount, setQuestionCount] = useState(4);
  let [showQModel, setShowQModel] = useState(false);
  let [qRerender, setQRerender] = useState(0);

  useEffect(() => {
    axios
      .get(`/qa/questions/?product_id=${id}&count=1000`)
      .then(response => {
        // console.log('response.data: ', response.data.results);
        setQuestions(response.data.results);
      })
      .catch(err => {
        alert('Unable to get questions. Sorry...', err);
      })
  }, [showQModel, qRerender])

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
            return  <Question
                      key={index}
                      question={question}
                      id={id}
                      qRerender={qRerender}
                      setQRerender={setQRerender}
                    />
          })}
        </Section>
        {questionCount < questions.length ? <p>Viewing {questionCount} of {questions.length} questions</p> : <p>Viewing {questions.length} of {questions.length} questions</p>}
        {questionCount < questions.length && (
          showMoreQuestions
        )}
        <Button onClick={() => setShowQModel(true)}>
          Add a Question +
        </Button>
        <QuestionModal id={id} onClose={() => setShowQModel(false)} showQModel={showQModel}/>
      </Sort>
    </>
  )
}

export default QuestionsList;