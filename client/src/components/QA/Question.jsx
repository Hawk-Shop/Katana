import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';
import AnswersList from './AnswersList.jsx';
import AnswerModal from './Modals/AnswerModal.jsx';
import swal from 'sweetalert';

const Questions = styled.div`
  border-bottom: .05em solid;
  padding-bottom: 0.5em;
`;

const QStyle = styled.span`
  padding-top: 0.5em;
  font-size: 1.2em;
  margin-bottom: 0.15em;
  display: inline-block;
`;

const Helpful = styled.span`
  font-size: 14px;
`

const AStyle = styled.span`
  font-size: 1.2em;
  margin-bottom: 0.5em;
  display: inline-block;
  vertical-align: top;
`;

const ContainText = styled.p`
  width: 500px;
`

const Answers = styled.span`
  margin-left: 10px;
  margin-top: 3px;
  display: inline-block;
`

const Container = styled.div`
  display: flex;
  align-items: baseline;
`

const Button = styled.button`
background: transparent;
border-radius: 3px;
border: 2px solid grey;
margin: 2em 1em;
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
  padding: 0;
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
  padding: 0;
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
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  text-decoration: underline;
  &:hover {
    color: #6B5B95;
  }
`

const Question = ({question, id, qRerender, setQRerender}) => {
  const {question_id, question_body, question_date, question_asker, question_helpfulness} = question;
  let [answers, setAnswers] = useState([]);
  let [answerCount, setAnswerCount] = useState(2);
  let [addAnswerModal, setAddAnswerModal] = useState(false);
  let [questionClicked, setQuestionClicked] = useState(false);
  let [seeMoreClicked, setSeeMoreClicked] = useState(false);
  let [show, setShow] = useState(false);
  let [clickedQHelpful, setClickedQHelpful] = useState(false);
  let [aRerender, setARerender] = useState(0);


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
  }, [show, clickedQHelpful, aRerender])

  const toggleAddAnswerModal = () => {
    setAddAnswerModal(!addAnswerModal);
  }

  const handleShowingAnswers = () => {
    setQuestionClicked(!questionClicked);
  }

  const handleFeedback = (stateVariable, qOrA, id, helpfulOrReport, setStateVariable, rerender, setRerender) => {
    console.log(`/qa/${qOrA}/${id}/${helpfulOrReport}`);
    if (stateVariable === true) {
      swal("Helpful?", "We only one click of 'Yes'. Thank you for your feedback. It helps others in their decision making.", "error");
    } else {
      setStateVariable(true);
      let customerSupport = 'We will remove this review for the time being to perform a formal review.'
      swal("Thank You", `Thank you for your feedback regarding this ${qOrA.slice(0, -1)}. People come to our site because of your feedback. ${helpfulOrReport === 'report' ?customerSupport : ''}`, "success");
      axios
        .put(`/qa/${qOrA}/${id}/${helpfulOrReport}`)
        .then(response => console.log(response))
        .catch(err => console.error(err))
        .then(() => {
          setRerender(rerender + 1)
          console.log(rerender);
        });
    }
  }

  if (addAnswerModal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
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
          Helpful? <Yes onClick={() => handleFeedback(clickedQHelpful, 'questions', question_id, 'helpful', setClickedQHelpful, qRerender, setQRerender)}> Yes <span>&#40;{question_helpfulness}&#41;</span></Yes> | <Report onClick={() => handleFeedback(clickedQHelpful, 'questions', question_id, 'report', setClickedQHelpful, qRerender, setQRerender)}> Report </Report>  | <AddAnswer onClick={() => setShow(true)}>Add Answer</AddAnswer>
        </Helpful>
        <AnswerModal
          id={id}
          question_id={question_id}
          question_body={question_body}
          onClose={() => setShow(false)}
          show={show}
        />
      </Container>
      {questionClicked && (
        answers.length === 0 ?
          <p><b>Be the first to add an answer to this question!</b></p> :
          <AStyle><b>A:</b></AStyle>
      )}
      <Answers>
        <div>{question_asker}</div>
        {questionClicked && (
          answers.slice(0, answerCount).map((answer, index) => {
            // console.log(answer);
            return  <AnswersList
                      key={index}
                      answer={answer}
                      id={id}
                      handleFeedback={handleFeedback}
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