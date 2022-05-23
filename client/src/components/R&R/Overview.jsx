import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import Reviews from "./Reviews.jsx";
import axios from 'axios';
import Ratings from './Ratings.jsx'


let ReviewsOverview = (props) => {
  const id = useContext(Context).id;
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
  const [selectValue, setSelectValue] = useState('relevant');
  const [count, setCount] = useState(2);

  // helper
  const getSorted = (event) => {
    axios.get(`/reviews/?product_id=${id}&count=1000&sort=${event.target.value}`)
      .then((result) => {
        setReviews(result.data.results);
        setCount(result.data.results.length);
      })
    setSelectValue(event.target.value);
  }

  const getRelevant = () => {
    axios.get(`/reviews/?product_id=${id}&count=1000&sort=relevant`)
    .then((result) => {
      setReviews(result.data.results);
      setCount(result.data.results.length);
    })
  }

  // useEffect(
  //   () => {
  //     getRelevant();
  //   }, []);


  return (
    <div>
      <Ratings setReviews={setReviews} reviews={reviews} getRelevant={getRelevant}></Ratings>
      <Reviews reviews={reviews} selectValue={selectValue} getSorted={getSorted} count={count}></Reviews>
    </div>
  )
}

export default ReviewsOverview;