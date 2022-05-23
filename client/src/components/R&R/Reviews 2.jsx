import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import ReviewTile from './ReviewTile.jsx';

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

  return(
    <div>
      <h2>Ratings and Reviews</h2>
      <div>
        {count === 0 && <button>Submit a new review</button>}
        {reviews.slice(0, displayCount).map((review) => (
          <ReviewTile review={review}></ReviewTile>
        ))}
        {displayCount < count && <button onClick={() => setDisplayCount(displayCount + 2)}>Load more</button>}
      </div>
    </div>
  )
}

export default Reviews;