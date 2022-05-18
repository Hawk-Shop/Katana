import { useState, useEffect, useContext } from 'react';
import { Context } from './util/context.js';

const Reviews = (props) => {
  const id = useContext(Context).id;
  const [reviews, setReviews]= useState([1, 2, 3]);
  const [count, setCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(2);

  return(
    <div>
      <h2>Ratings and Reviews</h2>
      <div>
        {count === 0 && <button>Submit a new review</button>}
        {reviews.slice(0, displayCount).map((review) => {
          <div>
            this is a review
          </div>
        })}
        {displayCount < count && <button onClick={() => setDisplayCount(displayCount + 2)}>Load more</button>}
      </div>
    </div>
  )
}

export default Reviews;