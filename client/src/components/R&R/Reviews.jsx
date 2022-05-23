import { useState, useContext, useEffect } from 'react';
import ReviewTile from './ReviewTile.jsx';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import { Context } from '../util/context.js';
import axios from 'axios';

const Reviews = (props) => {
  const id = useContext(Context).id;
  const [displayCount, setDisplayCount] = useState(2);
  const [reviews, setReviews] = useState([
    {
      "review_id": 1135681,
      "rating": 5,
      "summary": "OMG it works",
      "recommend": 'my recommendation is yes',
      "response": "Glad you're enjoying the product!",
      "body": "That's pretty dang cool that a review can be posted through this modal",
      "date": "2022-02-19T00:00:00.000Z",
      "reviewer_name": "Richard",
      "helpfulness": 103,
      "photos": [{
        "id": 2180156,
        "url": "http://res.cloudinary.com/dhx5k7wb3/image/upload/v1645592678/hzvdurhcoxovccyrc8u5.jpg"
      }, {
        "id": 2180157,
        "url": "http://res.cloudinary.com/dhx5k7wb3/image/upload/v1645592678/k03yzsuinafmkih2h9wi.jpg"
      }, {
        "id": 2180158,
        "url": "http://res.cloudinary.com/dhx5k7wb3/image/upload/v1645592678/sufqrautbgu8kyzzkkwr.jpg"
      }, {
        "id": 2180159,
        "url": "http://res.cloudinary.com/dhx5k7wb3/image/upload/v1645592678/f3kq5nbbji6rvubd5t2a.jpg"
      }, {
        "id": 2180160,
        "url": "http://res.cloudinary.com/dhx5k7wb3/image/upload/v1645592678/iru3oxs2fy6duuav03dl.jpg"
      }]
    },
    {
      "review_id": 1135837,
      "rating": 3,
      "summary": "Star Rating - This will be the rating given to the product by this individual review..",
      "recommend": 'this is recommended yes',
      "response": "Glad you're enjoying the product!",
      "body": " The rating will be displayed in the format of solid or outlined stars, where the solid stars represent the review score. A total of 5 stars should always appear, and the amount filled in should correspond to the average score By default the first 250 characters of the review should display. If the review is longer than 250 characters, below the body a link reading “Show more” will appear. Upon clicking this link, the review tile should expand and the rest of the review should display",
      "date": "2022-02-22T00:00:00.000Z",
      "reviewer_name": "Hello",
      "helpfulness": 5,
      "photos": []
    }
  ]);
  const [count, setCount] = useState(2);
  const [selectValue, setSelectValue] = useState('relevant');


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
  max-height:500px;
  width: 45em;
  display: flex;
  flex-direction: column;
  `;

  const Sort = styled.div`
  padding: 1em;
  `;

  // helper
  const getSorted = (event) => {
    axios.get(`/reviews/?product_id=${id}&count=1000&sort=${event.target.value}`)
      .then((result) => {
        setReviews(result.data.results);
        setCount(result.data.results.length);
      })
    setSelectValue(event.target.value);
  }


  useEffect(
    () => {
      axios.get(`/reviews/?product_id=${id}&count=1000&sort=relevant`)
      .then((result) => {
        setReviews(result.data.results);
        setCount(result.data.results.length);
      })
    }, []);

  return (
      <div>
        <Sort>
          {count} reviews,
          <label htmlFor="sort"> sorted by </label>
          <select value={selectValue} name="sort" onChange={getSorted}>
            <option value="relevant">most relevant</option>
            <option value="helpful">most helpful </option>
            <option value="newest">newest</option>
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
      )
}

export default Reviews;