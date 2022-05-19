import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';

const QuestionsList = (props) => {
  const id = useContext(Context).id;

  return (
    <div>
      <h3>QUESTIONS &#38; ANSWERS</h3>
    </div>
  )
}

export default QuestionsList;