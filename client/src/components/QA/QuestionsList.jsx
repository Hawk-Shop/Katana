import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import axios from 'axios';
import styled from 'styled-components';
import Question from './Question.jsx';
import QuestionModal from './Modals/QuestionModal.jsx';
import { results } from './Data.js';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { BsBinoculars } from "react-icons/bs";


const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid grey;
  margin-right: 1em;
  padding: 0.5em 1em;
  &:hover {
    background: lightgrey;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 10px;
    transform: scale(1.05);
  }
`;

const Questions = styled.section`
  overflow: auto;
  height:100%;
  max-height: 85vh;
  width: auto;
  display: flex;
  flex-direction: column;
`;

const Sort = styled.div`
  padding: 1em;
  margin-left: auto;
  margin-right: auto;
`;

const Search = styled.div`
  display: inline-block;
  line-height: 24px;
  margin-right: 10px;
  border: 1px solid black;
  border-radius: 5px;
  vertical-align: middle;
`

const Input = styled.input`
  display: inline-block;
  vertical-align: middle;
  font-size: 18px;
  text-align: middle;
  border: 0;
  background: none;
  &:focus {
    outline: none;
  }
`

const Icon = styled.i`
  display: inline-block;
  margin-top: 5px;
  vertical-align: middle;
`

const QuestionsList = ({productName}) => {
  // const id = 40355;
  const id = useContext(Context).id;
  let [questions, setQuestions] = useState([]);
  let [questionCount, setQuestionCount] = useState(4);
  let [showQModel, setShowQModel] = useState(false);
  let [qRerender, setQRerender] = useState(0);
  let [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    axios
      .get(`/qa/questions/?product_id=${id}&count=1000`)
      .then(response => {
        // console.log('response.data: ', response.data.results);
        setQuestions(response.data.results);
      })
      .catch(err => {
        console.error(err);
        // swal('Uh oh...', 'On error occurred on our side. Unable to get the questions related to this product right now. Please refresh and try again in a little bit.', 'error');
      })
  }, [showQModel, qRerender, id])

  const showMoreQuestions = (
    <Button onClick={() => setQuestionCount(questions.length)}>
      More Questions
    </Button>
  )

  // const collapseQuestions = (
  //   <Button onClick={() => setQuestionCount(4)}>
  //     Collapse Questions
  //   </Button>
  // )

  const addQuestion = (
    <Button onClick={() => setShowQModel(true)}>
      Add a Question <FontAwesomeIcon icon={faPlus}/>
    </Button>
  )

  return (
    <>
      <h2>Questions &#38; Answers</h2>
      <Sort>
        <Search>
          <Icon><BsBinoculars icon={BsBinoculars} size={28}/></Icon>
          <Input
            type="text"
            placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
            size={50}
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          ></Input>
        </Search>
        <br/>
        {questions.length > 0 ?
          <p>Click on a question to view it's respective answers.</p> :
          [
            <p>There are no questions yet for this product. Click "Add a Question" to be the first to add one.</p>,
            addQuestion
          ]
        }
        <Questions>
          {questions.filter((question) => {
            if (searchInput.length < 3) {
              return question;
            } else if (question.question_body.toLowerCase().includes(searchInput.toLowerCase())) {
              return question;
            }
          }).slice(0, questionCount).map((question) => {
            return  <Question
                      key={question.question_id}
                      question={question}
                      id={id}
                      productName={productName}
                      qRerender={qRerender}
                      setQRerender={setQRerender}
                    />
          })}
        </Questions>
        {searchInput.length < 3 && (
          questionCount < questions.length ?
            <p>Viewing {questionCount} of {questions.length} questions</p> : <p>Viewing {questions.length} of {questions.length} questions</p>
        )}
        {searchInput.length > 2 && (
          <br/>
        )}
        {questionCount < questions.length && [
          showMoreQuestions
        ]}
        {/* {questions.length > 4 && questionCount === questions.length && (
          collapseQuestions
        )} */}
        {questions.length > 0 && (
          addQuestion
        )}
        <QuestionModal
          id={id}
          key="qModal"
          productName={productName}
          onClose={() => setShowQModel(false)}
          showQModel={showQModel}
        />
      </Sort>
    </>
  )
}

export default QuestionsList;