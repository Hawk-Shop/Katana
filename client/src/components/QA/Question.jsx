import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';
import AnswersList from './AnswersList.jsx';
import AddAnswerModal from './Modals/AddAnswerModal.jsx';

const Question = ({question, id}) => {
  const {question_id, question_body, question_date, question_asker, question_helpfulness, answers} = question;
  let [answersList, setAnswersList] = useState([]);
  let [answerCount, setAnswerCount] = useState(2);
  let [addAnswerModal, setAddAnswerModal] = useState(false);
  let [questionClicked, setQuestionClicked] = useState(false);
  let [seeMoreClicked, setSeeMoreClicked] = useState(false);

  useEffect(() => {
    axios
      .get(`/qa/questions/${question_id}/answers`)
      .then(response => {
        // console.log('response.data: ', response.data.results);
        setAnswersList(response.data.results);
      })
      .catch(err => {
        console.error('Unable to get answers. Sorry...', err);
      })
  }, [])

  const toggleAddAnswerModal = () => {
    setAddAnswerModal(!addAnswerModal);
  }

  const handleShowingAnswers = () => {
    setQuestionClicked(!questionClicked);
  }

  if (addAnswerModal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  const Questions = styled.div`
    border-bottom: .05em solid;
    padding-bottom: 0.5em;
  `;

  const QStyle = styled.span`
    padding-top: 0.5em;
    font-size: 1.2em;
    margin-bottom: 0.5em;
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
    display: block;
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
  `

  const seeMoreAnswers = (
    <Button onClick={() => {
      setAnswerCount(answerCount + answersList.length - 2)
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
          <span>
            Helpful? <Yes>Yes <span>&#40;{question_helpfulness}&#41;</span></Yes>  | <Yes onClick={toggleAddAnswerModal}>Add Answer</Yes>
          </span>
        </Helpful>
        {addAnswerModal && (
          <AddAnswerModal
            toggleAddAnswerModal={toggleAddAnswerModal}
            addAnswerModal={addAnswerModal}
            id={id}
          />
        )}
      </Container>
      {questionClicked && (<AStyle><b>A:</b></AStyle>)}
      <Answers>
        <div>{question_asker}</div>
        {questionClicked && (
          answersList.slice(0, answerCount).map((answer, index) => {
            // console.log(answer);
            return <AnswersList key={index} answer={answer} id={id}/>
          }))
        }
      </Answers>
      {questionClicked && (
        answerCount < answersList.length && (
          seeMoreAnswers
        ))
      }
      {seeMoreClicked && (
        collapseAnswers
      )}
    </Questions>
  )
}

export default Question;