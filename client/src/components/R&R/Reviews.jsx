import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import ReviewTile from './ReviewTile.jsx';
import styled from 'styled-components';

const Reviews = () => {
  const id = useContext(Context).id;
  const [reviews, setReviews]= useState([
    {
      "review_id": 1135681,
      "rating": 5,
      "summary": "OMG it works",
      "recommend": true,
      "response": null,
      "body": "That's pretty dang cool that a review can be posted through this modal",
      "date": "2022-02-19T00:00:00.000Z",
      "reviewer_name": "Richard",
      "helpfulness": 103,
      "photos": []
  },
  {
      "review_id": 1135837,
      "rating": 3,
      "summary": "hhi",
      "recommend": true,
      "response": null,
      "body": "hi",
      "date": "2022-02-22T00:00:00.000Z",
      "reviewer_name": "Hello",
      "helpfulness": 5,
      "photos": []
  },
  {
      "review_id": 1135846,
      "rating": 2,
      "summary": "sdfds",
      "recommend": true,
      "response": null,
      "body": "sdfdsf",
      "date": "2022-02-22T00:00:00.000Z",
      "reviewer_name": "sdfsdf",
      "helpfulness": 0,
      "photos": []
  }
  ]);
  const [count, setCount] = useState(7);
  const [displayCount, setDisplayCount] = useState(2);

  const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid grey;
  color: grey;
  margin: 0 1em;
  padding: 0.25em 1em;
  `;

  const Section = styled.section`
  overflow: auto;
  height: 20em;
  width: 45em;
  `;

  return (
    <div>
      <h2>Ratings and Reviews</h2>
      <div>
        <Section>
          {reviews.slice(0, displayCount).map((review) => (
            <ReviewTile review={review}></ReviewTile>
          ))}
        </Section>
        {displayCount < count && <Button onClick={() => setDisplayCount(displayCount + 2)}>More Reviews</Button>}
        <Button>Add a Review</Button>
      </div>
    </div>
  )
}

export default Reviews;