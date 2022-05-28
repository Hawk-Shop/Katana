import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import Reviews from "./Reviews.jsx";
import axios from 'axios';
import Ratings from './Ratings.jsx'
import styled from 'styled-components';

const Container = styled.div`
display: inline-block;
width: 100%;
`;

let ReviewsOverview = (props) => {
  const id = useContext(Context).id;
  const [reviews, setReviews] = useState([]);
  const [selectValue, setSelectValue] = useState('relevant');
  const [count, setCount] = useState(2);
  const [filters, setFilters] = useState({});


  // helper
  const getSorted = (type) => {
    axios.get(`/reviews/?product_id=${id}&count=1000&sort=${type}`)
      .then((result) => {
        console.log('RESULT HEREEEEE!@#*&!#()@*');
        let arr = result.data.results;
        if (Object.keys(filters).length !== 0) {
          arr = arr.filter((each) => (filters[each.rating]));
        }
        setReviews(arr);
        setCount(arr.length);
      })
    setSelectValue(type);
  }

  useEffect(() => {
      getSorted(selectValue);
    }, [filters]);


  return (
    <Container ref={props.reviewsRef}>
      <Ratings
        setReviews={setReviews}
        reviews={reviews}
        setCount={setCount}
        filters={filters}
        setFilters={setFilters}>
      </Ratings>
      <Reviews
        reviews={reviews}
        selectValue={selectValue}
        getSorted={getSorted}
        count={count}>
      </Reviews>
    </Container>
  )
}

export default ReviewsOverview;