import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';

const AnswersList = ({answer}) => {
  const id = useContext(Context).id;
  const {body, date, answerer_name, helpfulness, photos} = answer;
  // submit axios.get request to get all answers to the API

  return (
    <div>
      <span>A: {body}</span>
      <div>
        <span>by {answerer_name}, </span>
        <span> {format(parseISO(date), 'MMMM, dd, yyyy')}</span>
      </div>
    </div>
  )
}

export default AnswersList;