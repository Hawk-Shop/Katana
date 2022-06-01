import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';
import AnswersList from './AnswersList.jsx';
import AnswerModal from './Modals/AnswerModal.jsx';
import swal from 'sweetalert';

const Questions = styled.div`
  border: 1px solid;
  border-radius: 5px;
  width: auto;
  height: auto;
  margin: 5px auto;
  -webkit-transition: background-color .5s ease-out;
  -moz-transition: background-color .5s ease-out;
  -o-transition: background-color .5s ease-out;
  transition: background-color .5s ease-out;
  cursor: ns-resize;
  &:hover {
    background-color: rgba(255, 0, 0, .2);
  }
`;

const QStyle = styled.span`
  font-size: 1.2em;
  display: flex;
  cursor: ns-resize;
  margin-left: 10px;
`;

const Helpful = styled.div`
  text-align: center;
  font-size: 14px;
  margin-right: 15px;
  display: block;
`

const AStyle = styled.span`
  font-size: 1.2em;
  margin-bottom: 0.5em;
  margin-left: 100px;
  margin-top: 20px;
  display: inline-block;
  vertical-align: top;
`;

const ContainText = styled.p`
  width: 600px;
`

const Answers = styled.span`
  margin-left: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
  height: auto;
  width: auto;
  display: inline-block;
  flex-direction: column;
`

const Container = styled.div`
  display: flex;
  align-items: baseline;
`

const Button = styled.button`
background: transparent;
border-radius: 3px;
border: 2px solid grey;
margin: 0 0 1em 1em;
padding: 0.5em 1em;
&:hover {
  background: lightgrey;
}
display: block;
`;

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
  }
`

const Report = styled.button`
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  text-decoration: underline;
  &:hover {
    color: crimson;
  }
`

const AddAnswer = styled.button`
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  text-decoration: underline;
  &:hover {
    color: #6B5B95;
  }
`

const NoAnswer = styled.div`
  margin-left: 50px;
`

const Question = ({question, id, productName, qRerender, setQRerender}) => {
  const {question_id, question_body, question_date, question_asker, question_helpfulness} = question;
  let [answers, setAnswers] = useState([]);
  let [answerCount, setAnswerCount] = useState(2);
  let [questionClicked, setQuestionClicked] = useState(false);
  let [seeMoreClicked, setSeeMoreClicked] = useState(false);
  let [show, setShow] = useState(false);
  let [qHelpful, setQHelpful] = useState(false);
  let [aRerender, setARerender] = useState(0);
  let [qReported, setQReported] = useState(false);


  useEffect(() => {
    axios
      .get(`/qa/questions/${question_id}/answers/?count=1000`)
      .then(response => {
        // console.log('response.data: ', response.data.results);
        setAnswers(response.data.results);
      })
      .catch(err => {
        console.error('Unable to get answers. Sorry...', err);
      })
  }, [show, qHelpful, aRerender])



  const handleShowingAnswers = () => {
    setQuestionClicked(!questionClicked);
  }

  const handleHelpful = (stateVariable, qOrA, id, helpful, setStateVariable, rerender, setRerender) => {
    console.log(`/qa/${qOrA}/${id}/${helpful}`);
    if (stateVariable) {
      swal("Helpful?", "We only allow one click of 'Yes'. Thank you for your feedback. It helps others in their decision making.", "error");
    } else {

      axios
        .put(`/qa/${qOrA}/${id}/${helpful}`)
        .then(() => {
          setStateVariable(true);
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
    console.log(`/qa/${qOrA}/${id}/${report}`);
    if (stateVariable) {
      swal("Helpful?", "We only allow one click of 'Reported'. We will review this as soon as possible.", "error");
    } else {

      axios
        .put(`/qa/${qOrA}/${id}/${report}`)
        .then(() => {
          setStateVariable(true);
          let customerSupport = `We have marked this ${qOrA.slice(0, -1)} as "Reported" and will perform a formal review.`
          swal("Thank You", `Thank you for your feedback regarding this ${qOrA.slice(0, -1)}. People come to our site because of your feedback. ${report === 'report' ?customerSupport : ''}`, "success");
        })
        .catch(err => {
          console.error(err);
          swal('An error happened...', 'Unfortunately, there was an error on our side. Please try again in a little bit.', 'error');
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
      setAnswerCount(2);
      setSeeMoreClicked(!seeMoreClicked);
    }}>
      Collapse answers
    </Button>
  )

  return (
    <Questions>
      <Container>
        <QStyle onClick={handleShowingAnswers}>
          <ContainText><b>Q: {question_body}</b></ContainText>
        </QStyle>
        <Helpful>
          HELPFUL?
          <br/>
          <Yes onClick={() =>
            handleHelpful(
              qHelpful,
              'questions',
              question_id,
              'helpful',
              setQHelpful,
              qRerender,
              setQRerender
            )}> Yes <span>&#40;{question_helpfulness}&#41;</span>
          </Yes>
          <Report onClick={() =>
            handleReported(
              qReported,
              'questions',
              question_id,
              'report',
              setQReported
            )}> {qReported ? 'Reported' : 'Report'}
          </Report>
          <AddAnswer onClick={() => setShow(true)}>Add Answer</AddAnswer>
        </Helpful>
        <AnswerModal
          id={id}
          productName={productName}
          question_id={question_id}
          question_body={question_body}
          onClose={() => setShow(false)}
          show={show}
        />
      </Container>
      {questionClicked && (
        answers.length === 0 ?
          <NoAnswer><b>No answers yet. Be the first to add an answer to this question!</b></NoAnswer> :
          <AStyle><b>A:</b></AStyle>
      )}
      <Answers>
        {/* <div>{question_asker}</div> */}
        {questionClicked && (
          answers.slice(0, answerCount).map((answer, index) => {
            // console.log(answer);
            return  <AnswersList
                      key={index}
                      answer={answer}
                      handleHelpful={handleHelpful}
                      handleReported={handleReported}
                      question_id={question_id}
                      aRerender={aRerender}
                      setARerender={setARerender}
                    />
          }))
        }
      </Answers>
      {questionClicked && (
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