import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import ReviewTile from './ReviewTile.jsx';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons';

const Reviews = () => {
  const id = useContext(Context).id;
  const [reviews, setReviews]= useState([
    {
      "review_id": 1135681,
      "rating": 5,
      "summary": "OMG it works",
      "recommend": true,
      "response": true,
      "body": "That's pretty dang cool that a review can be posted through this modal",
      "date": "2022-02-19T00:00:00.000Z",
      "reviewer_name": "Richard",
      "helpfulness": 103,
      "photos": []
  },
  {
      "review_id": 1135837,
      "rating": 3,
      "summary": "Star Rating - This will be the rating given to the product by this individual review..",
      "recommend": true,
      "response": null,
      "body": " The rating will be displayed in the format of solid or outlined stars, where the solid stars represent the review score. A total of 5 stars should always appear, and the amount filled in should correspond to the average score",
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
  const [count, setCount] = useState(reviews.length);
  const [displayCount, setDisplayCount] = useState(2);

  const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid grey;
  margin: 2em 1em;
  padding: 0.5em 1em;
  &:hover {
    background: lightgrey;
  }
  `;

  const Section = styled.section`
  overflow: auto;
  height:100%;
  max-height:500px;
  width: 45em;
  display: flex;
  flex-direction: column;
  `;

  const Sort = styled.div`
  padding: 1em;
  `;

  return (
    <div>
      <h2>Ratings and Reviews</h2>
      <div>
        <Sort>
          {count} reviews,
          <label for="sort"> sorted by </label>
          <select name="sort">
            <option value="relevance">most relevant</option>
            <option value="relevance">most helpful </option>
            <option value="relevance">newest</option>
          </select>
        </Sort>
        <Section>
          {reviews.slice(0, displayCount).map((review) => (
            <ReviewTile review={review}></ReviewTile>
          ))}
        </Section>
        {displayCount < count && <Button onClick={() => {
          setDisplayCount(displayCount + 2)
        }}>More Reviews</Button>}
        <Button>Add a review <FontAwesomeIcon icon={faPlus}/></Button>
      </div>
    </div>
  )
}

export default Reviews;