import { useState, useEffect } from 'react';
import { Context } from '../util/context.js';
import Reviews from "./Reviews.jsx";
import axios from 'axios';
import Ratings from './Ratings.jsx'


let ReviewsOverview = (props) => {

  // useEffect(
  //   () => {
  //     const getAllReviews = axios.get(`/reviews/?product_id=${id}&count=1000&sort=relevant`);
  //     const getHelpful = axios.get(`/reviews/?product_id=${id}&count=1000&sort=helpful`);
  //     const getNew = axios.get(`/reviews/?product_id=${id}&count=1000&sort=newest`);

  //     Promise.all([getAllReviews, getHelpful, getNew])
  //     .then((arr) => {
  //       setReviews(arr[0].data.results)
  //     });
  //   }, [])

  return (
    <div>
      <Ratings></Ratings>
      <Reviews></Reviews>
    </div>
  )
}

export default ReviewsOverview;