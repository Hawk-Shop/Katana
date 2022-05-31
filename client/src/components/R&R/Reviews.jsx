 import { useState, useEffect, useRef, useCallback } from 'react';
import ReviewTile from './ReviewTile.jsx';
import NewReview from './NewReview.jsx';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid grey;
  margin: 2em 1em;
  padding: 0.5em 1em;
  &:hover {
    background: lightgrey;
  }
  cursor: pointer;
  `;

  const Section = styled.section`
  overflow-y: auto;
  overflow-x: hidden;
  overflow-wrap: break-word;
  max-height: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-width: 100%
  flex-wrap: wrap;
  `;

  const Sort = styled.div`
  padding: 1em;
  `;

  const Container = styled.div`
  width: 70%;
  float: right;
  height: 100%
  `;

  const Dropdown = styled.select`
  border: none;
  text-decoration: underline;
  background-color: transparent;
  &:hover {
    color: grey;
    font-size: 1em;
  };
  cursor: pointer;
  `;

const Reviews = ({filters, displayCount, setDisplayCount, loading, setSelectValue, count, setPage, selectValue, reviews, setReviews, setCount}) => {
  const [showModal, setShowModal] = useState(false);
  const observer = useRef();
  const finalDivRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
        setDisplayCount(count);
      }
    });
    if (node) observer.current.observe(node);
  }, [count]);

  const openModal = () => {
    setShowModal(prev => !prev);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <Container>
      <NewReview showModal={showModal} setShowModal={setShowModal} closeModal={closeModal}></NewReview>
      <div>
        <Sort>
          {count} reviews,
          <label htmlFor="sort"> sorted by </label>
          <Dropdown value={selectValue} name="sort" onChange={(e) => {
            setSelectValue(e.target.value);
            setPage(1);
            setReviews([]);
            setDisplayCount(2);
            setCount(0);
            }}>
            <option value="relevant">most relevant</option>
            <option value="helpful">most helpful </option>
            <option value="newest">newest</option>
          </Dropdown>
        </Sort>
        <Section>
          {reviews.slice(0, displayCount).map((review, index) => (
            <ReviewTile review={review} key={index}></ReviewTile>
          ))}
          {(displayCount >= 5 || Object.keys(filters).length !== 0) && <div ref={finalDivRef}>this is what im looking for &nbsp;&nbsp;&nbsp;<br></br></div>}
          {/* <div ref={finalDivRef}>this is the div to check</div> */}
        </Section>
        {displayCount === 2 && <Button onClick={() => {
          setDisplayCount(5)
        }}>More Reviews</Button>}
        <Button onClick={openModal}>Add a review <FontAwesomeIcon icon={faPlus}/></Button>
      </div>
    </Container>
      )
}

export default Reviews;