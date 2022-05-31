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
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);


  // gets all arrays, by sort, 5 at a time by page
  const getSorted = () => {
    setLoading(true);
    axios.get(`/reviews/?product_id=${id}&page=${page}&sort=${selectValue}`)
      .then((result) => {
        console.log('RESULT HEREEEEE!@#*&!#()@*');
        let arr = result.data.results;
        if (Object.keys(filters).length !== 0) {
          arr = arr.filter((each) => (filters[each.rating]));
        }
        setReviews([...reviews, ...arr]);
        setCount(count + arr.length);
        setLoading(false);
      })
  }


  useEffect(() => {
      getSorted(selectValue);
    }, [filters, page, selectValue]);


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
        page={page}
        setPage={setPage}
        count={count}
        setSelectValue={setSelectValue}>
      </Reviews>
    </Container>
  )
}

export default ReviewsOverview;