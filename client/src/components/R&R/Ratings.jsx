import { useContext, useEffect, useState } from 'react';
import { Context } from '../util/context.js';
import axios from 'axios';
import Stars from './Stars.jsx';
import Bars from './Bars.jsx';
import avgRating from '../util/getAvgRating.js';
import percentRec from '../util/percentRec.js';
import styled from 'styled-components';


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

  const Container = styled.div`
  border: solid;
  width: 25%;
  `;

  return (
    <Container>
      <h2>Ratings and Reviews</h2>
      <div>
        <h1>{avg}</h1>
        <Stars rating={avg}></Stars>
      </div>
      <div>
        {percRec}% of reviews recommend this product
      </div>
      <div>
        <Bars
          reviews={props.reviews}
          setReviews={props.setReviews}
          ratings={ratings}
          getRelevant={props.getRelevant}
          setCount={props.setCount}
          filters={props.filters}
          setFilters={props.setFilters}></Bars>
      </div>
      <div>
        here are my rating slides
      </div>
    </Container>
  )
}

export default Ratings;