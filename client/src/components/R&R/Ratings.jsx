import { useContext, useEffect, useState } from 'react';
import { Context } from '../util/context.js';
import axios from 'axios';
import Stars from './Stars.jsx';
import Bars from './Bars.jsx';
import avgRating from '../util/getAvgRating.js';
import percentRec from '../util/percentRec.js';
import styled from 'styled-components';
import ProductBreakdown from './ProductBreakdown.jsx';

const Container = styled.div`
  width: 24%;
  padding: 2%;
  float: left;
  @media (max-width: 768px) {
    width: 90%;
  }
  `;

  const NumRating = styled.span`
  font-size: 2em;
  `;

  const StarRating = styled.span`
  font-size: 1.6em;
  margin-top: .6em;
  `;

const Ratings = (props) => {
  const id = useContext(Context).id;
  let meta;
  const [avg, setAvg] = useState(null);
  const [percRec, setPercRec] = useState(null);
  const [ratings, setRatings] = useState({1:'1', 2:'1', 3:'1', 4:'1', 5:'1'});

  useEffect(() => {
    axios.get(`/reviews/meta/?product_id=${id}`)
    .then((results) => {
      meta = results.data;
      let {averageRating} = avgRating(meta.ratings);
      setAvg(averageRating);
      setPercRec(percentRec(meta.recommended));
      setRatings(meta.ratings);
    })
    .catch((err) => console.log('err', err))
  }, [id])

  return (
    <Container>
      <h2 style={{margin: "0 0 1em 0"}}>Ratings and Reviews</h2>
      <div>
        {avg && <NumRating>{avg}</NumRating>}
        <StarRating><Stars rating={avg}></Stars></StarRating>
      </div>
      {percRec && <div style={{margin: " 1em 0"}}>{percRec}% of reviews recommend this product</div>}
      <div>
        <h4>Rating Breakdown</h4>
        <Bars
          reviews={props.reviews}
          setReviews={props.setReviews}
          ratings={ratings}
          getRelevant={props.getRelevant}
          setCount={props.setCount}
          filters={props.filters}
          setFilters={props.setFilters}

          setPage={props.setPage}
          setDisplayCount={props.setDisplayCount}></Bars>
      </div>
      <div>
        <ProductBreakdown
          id={id}></ProductBreakdown>
      </div>
    </Container>
  )
}

export default Ratings;