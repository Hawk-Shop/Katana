import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';
import AnswersList from './AnswersList.jsx';
import AnswerModal from './Modals/AnswerModal.jsx';
import swal from 'sweetalert';

const Questions = styled.div`
  display: flex;
  text-transform: uppercase;
  border: 1px solid;
  border-radius: 5px;
  height: auto;
  margin: 5px auto;
  transition: background-color 0.35s ease-out 0s;
  flex-direction: column;
  align-items: center;
  -webkit-transition: background-color .35s ease-out;
  -moz-transition: background-color .35s ease-out;
  -o-transition: background-color .35s ease-out;
  transition: background-color .35s ease-out;
  cursor: ns-resize;
  &:hover {
    background-color: rgba(255, 0, 0, .2);
    // transform: scale(1.03);
  }
  @media {
    width: 65vw;
  }
`;

const QStyle = styled.div`
  font-size: 1em;
  cursor: ns-resize;
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const AnswersBlock = styled.div`

`

const AStyle = styled.div`
  font-size: 1.2em;
  margin-bottom: 0.5em;
  margin-left: 10px;
  display: inline-block;
  vertical-align: top;
`;

const ContainText = styled.p`
  width: 100%;
`

const Container = styled.div`
  display: flex;
  -webkit-box-align: stretch;
  margin-bottom: 10px;
  align-items: stretch;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  cursor: ns-resize;
`

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid grey;
  margin: 0 0 1em 1em;
  padding: 0.5em 1em;
  display: block;
  &:hover {
    background: lightgrey;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 10px;
    transform: scale(1.05);
  }
`;

const Helpful = styled.div`
  text-align: center;
  font-size: 14px;
  margin-right: 5px;
  margin-top: 5px;
`

const Yes = styled.button`
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  text-decoration: underline;
  &:hover {
    color: darkgreen;
    transform: scale(1.05);
  }
`

const Report = styled.button`
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  cursor: context-menu;
  outline: inherit;
  text-decoration: underline;
  &:hover {
    color: crimson;
    transform: scale(1.05);
  }
`

const AddAnswer = styled.button`
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  cursor: copy;
  outline: inherit;
  text-decoration: underline;
  &:hover {
    color: #6B5B95;
    transform: scale(1.05);
  }
`

const NoAnswers = styled.div`
  text-transform: none;
  margin-left: 50px;
`

const AnswerList = styled.div`
  padding: 0 10px 5px 10px;
  display: inline-block;
  cursor: default;
`

const Question = ({question, id, productName, qRerender, setQRerender}) => {
  const {question_id, question_body, question_date, question_asker, question_helpfulness} = question;
  let [answers, setAnswers] = useState(null);
  let [answerCount, setAnswerCount] = useState(2);
  let [questionClicked, setQuestionClicked] = useState(false);
  let [seeMoreClicked, setSeeMoreClicked] = useState(false);
  let [show, setShow] = useState(false);
  let [qHelpful, setQHelpful] = useState(false);
  let [aRerender, setARerender] = useState(0);
  let [qReported, setQReported] = useState(false);
  let [loading, setLoading] = useState(false);
  // let [yesCount, setYesCount] = useState(question_helpfulness);


  const getAnswers = () => {
    setLoading(true);
    axios
      .get(`/qa/questions/${question_id}/answers/?count=1000`)
      .then(response => {
        // console.log('response: ', response);
        setAnswers(response.data.results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Unable to get answers. Sorry...', err);
      })
  }

  const handleShowingAnswers = () => {
    if (questionClicked) {
      setQuestionClicked(!questionClicked);
    } else {
      getAnswers();
      setQuestionClicked(!questionClicked);
    }
  }

  const handleHelpful = (stateVariable, qOrA, id, helpful, setStateVariable, rerender, setRerender) => {
    // console.log(`/qa/${qOrA}/${id}/${helpful}`);
    if (stateVariable) {
      swal("Helpful?", "We only allow one click of 'Yes'. Thank you for your feedback. It helps others in their decision making.", "error");
    } else {
      axios
        .put(`/qa/${qOrA}/${id}/${helpful}`)
        .then(() => {
          // setYesCount(yesCount + 1);
          setStateVariable(true);
          return getAnswers();
        })
        .then(response => {
          swal("Thank You", `Thank you for your feedback regarding this ${qOrA.slice(0, -1)}. People come to our site because of your feedback.`, "success");
        })
        .catch(err => console.error(err))
        .then(() => {
          setRerender(rerender + 1);
          console.log(rerender);
        });
    }
  }

  const handleReported = (stateVariable, qOrA, id, report, setStateVariable) => {
    // console.log(`/qa/${qOrA}/${id}/${report}`);
    if (stateVariable) {
      swal("Helpful?", "We only allow fone click of 'Reported'. We will review this as soon as possible.", "error");
    } else {

      axios
        .put(`/qa/${qOrA}/${id}/${report}`)
        .then(() => {
          setStateVariable(true);
          let customerSupport = `We have marked this ${qOrA.slice(0, -1)} as "Reported" and will perform a formal review.`
          swal("Thank You", `Thank you for your feedback regarding this ${qOrA.slice(0, -1)}. People come to our site because of your feedback. ${report === 'report' ?customerSupport : ''}`, "success");
        })
        .catch(err => {
          swal('An error happened...', 'Unfortunately, there was an error on our side. Please try again in a little bit.', 'error');
          // console.error(err);
        })
    }
  }

  const seeMoreAnswers = (
    <Button onClick={() => {
      setAnswerCount(answerCount + answers.length - 2)
      setSeeMoreClicked(!seeMoreClicked);
      }}>
      See more answers
    </Button>
  )
  const collapseAnswers = (
    <Button onClick={() => {
      handleShowingAnswers(false);
      setLoading(false);
      setAnswerCount(2);
      setSeeMoreClicked(!seeMoreClicked);
    }}>
      Collapse answers
    </Button>
  )

  if (show) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <Questions >
      <Container onClick={handleShowingAnswers}>
        <QStyle >
          <ContainText><b>Q: {question_body}</b></ContainText>
        </QStyle>
        <Helpful>
          HELPFUL?
          <br/>
          <Yes onClick={(e) => {
            e.stopPropagation();
            handleHelpful(
              qHelpful,
              'questions',
              question_id,
              'helpful',
              setQHelpful,
              qRerender,
              setQRerender
          )}}> Yes <span>&#40;{question_helpfulness}&#41;</span>
          </Yes>
          <Report onClick={(e) => {
            e.stopPropagation();
            handleReported(
              qReported,
              'questions',
              question_id,
              'report',
              setQReported
            )}}> {qReported ? 'Reported' : 'Report'}
          </Report>
          <br/>
          <AddAnswer onClick={(e) => {
            e.stopPropagation();
            setShow(true);
          }}>Add Answer</AddAnswer>
        </Helpful>
      </Container>
      <AnswerModal
        key={question_id.toString()}
        id={id}
        productName={productName}
        question_id={question_id}
        question_body={question_body}
        onClose={(e) => {
          e.stopPropagation();
          setShow(false);
          getAnswers();
        }}
        show={show}
      />
      {questionClicked && answers && !loading &&
        answers.length === 0 && (
          <NoAnswers>
            <b>No answers yet. Be the first to add an answer to this question!</b>
          </NoAnswers>
        )
      }
      {/* {loading && (
        <h4>Loading...</h4>
      )} */}
      {questionClicked && answers && (
        <AnswersBlock>
          {answers.length !== 0 && (
            <AStyle><b>A:</b></AStyle>
          )}
          <AnswerList>
            {answers.slice(0, answerCount).map((answer) => {
              // console.log(answer);
              return  (
                <AnswersList
                  key={answer.answer_id}
                  answer={answer}
                  handleHelpful={handleHelpful}
                  handleReported={handleReported}
                  question_id={question_id}
                  aRerender={aRerender}
                  setARerender={setARerender}
                />
              )
            })}
          </AnswerList>
        </AnswersBlock>
      )}
      {questionClicked && !loading && (
        answerCount < answers.length && (
          seeMoreAnswers
        ))
      }
      {questionClicked && (
        seeMoreClicked && (
          collapseAnswers
        )
      )}
    </Questions>
  )
}

export default Question;