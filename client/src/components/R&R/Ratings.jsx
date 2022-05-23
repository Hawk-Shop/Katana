import { useContext, useEffect, useState } from 'react';
import { Context } from '../util/context.js';
import axios from 'axios';
import Stars from './Stars.jsx';
import Bars from './Bars.jsx';
import avgRating from '../util/getAvgRating.js';
import percentRec from '../util/percentRec.js';


const Ratings = (props) => {
  const id = useContext(Context).id;
  let meta;
  const [avg, setAvg] = useState(5);
  const [percRec, setPercRec] = useState(100);
  const [ratings, setRatings] = useState({1:'1', 2:'1', 3:'1', 4:'1', 5:'1'});

  useEffect(() => {
    axios.get(`/reviews/meta/?product_id=${id}`)
    .then((results) => {
      ////// can delete this console.log later
      console.log(results.data);
      meta = results.data;
      let {averageRating} = avgRating(meta.ratings);
      setAvg(averageRating);
      setPercRec(percentRec(meta.recommended));
      setRatings(meta.ratings);
    })
  }, [])

  return (
    <div>
      <h2>Ratings and Reviews</h2>
      <div>
        <h1>{avg}</h1>
        <Stars rating={avg}></Stars>
      </div>
      <div>
        {percRec}% of reviews recommend this product
      </div>
      <div>
        <Bars reviews={props.reviews} setReviews={props.setReviews} ratings={ratings}
        getRelevant={props.getRelevant}
        setCount={props.setCount}></Bars>
      </div>
      <div>
        here are my rating slides
      </div>
    </div>
  )
}

export default Ratings;