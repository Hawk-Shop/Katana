import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';
import Stars from './Stars.jsx';

const ReviewTile = ({review}) => {
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);

  const Tile = styled.div`
  border-bottom: .05em solid;
  padding: 1em;
  margin: 2em;
  `;

  return (
    <Tile>
      <div>
        <Stars rating={review.rating}></Stars>
      </div>
      <div>
        {format(parseISO(review.date), 'MM/dd/yyyy')}
      </div>
      <div>
        <b>{review.summary}</b> <br></br>
        {review.body}
      </div>
      <div>
        @{review.reviewer_name} <br></br>
        {review.recommend === 'true' && <p>I recommend this product</p>}
      </div>
      <div>
        {review.response && <p>{review.response}</p>}
      </div>
      <div>
        Helpful?
        <button onClick={() => setYesCount(yesCount+1)}>Yes</button>
        <button onClick={() => setNoCount(noCount+1)}>No</button>
      </div>

    </Tile>
  )

}

export default ReviewTile;