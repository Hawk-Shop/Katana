import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';
import Stars from './Stars.jsx';

const ReviewTile = ({review}) => {
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);

  const Tile = styled.div`
  border-bottom: .05em solid;
  padding-bottom: 1em;
  margin: 1em;
  `;

  const Date = styled.div`
  font-size: .8em;
  float: right;
  margin-top: -1em;
  `

  const Helpful = styled.div`
  font-size: .8em;
  padding-top: 1em;
  `

  const HelpButtons = styled.button`
  font-size: .8em;
  border: none;
  text-decoration: underline;
  background-color: transparent;
  &:hover {
    color: grey;
    font-size: .9em;
  };
  cursor: pointer;
  `
  const Summary = styled.div`
  padding-top: 1em;
  font-size: 1.2em;
  `;

  const Body = styled.div`
  padding-top: 1em;
  font-size: 1em;
  `;

  return (
    <Tile>
      <div>
        <Stars rating={review.rating}></Stars>
      </div>
      <Date>
        {review.reviewer_name}, {format(parseISO(review.date), 'MM/dd/yyyy')}
      </Date>
      <Summary>
        <b>{review.summary}</b>
      </Summary>
      <Body>
        {review.body}
      </Body>
      <div>
        {review.recommend === true && <p> <FontAwesomeIcon icon="fa-solid fa-check" /> I recommend this product</p>}
      </div>
      <div>
        {review.response && <p>{review.response}</p>}
      </div>
      <Helpful>
        Helpful?
        <HelpButtons onClick={() => setYesCount(yesCount+1)}>{`Yes (${yesCount})`}</HelpButtons>
        <HelpButtons onClick={() => setNoCount(noCount+1)}>{`No (${noCount})`}</HelpButtons>
      </Helpful>

    </Tile>
  )

}

export default ReviewTile;