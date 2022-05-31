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

const Reviews = ({loading, setSelectValue, count, setPage, selectValue, reviews, setReviews, setCount}) => {
  const [displayCount, setDisplayCount] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const observer = useRef();
  const finalDivRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
        setDisplayCount(count);
        console.log('count', count)
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

  // // infinite scroll
  //   const handleObserver = useCallback((entries) => {
  //     const target = entries[0];
  //     if (target.isIntersecting) {
  //       console.log('intersecting')
  //       setPage((page) => page + 1);
  //       console.log('count', count);
  //       console.log('displayCount', displayCount);
  //       if (count !== 0) setDisplayCount(count);
  //     }
  //   }, []);;

  //   useEffect(() => {
  //     console.log('use effect count', count)
  //     const option = {
  //       root: null,
  //       rootMargin: "20px",
  //       threshold: 0
  //     };
  //     const observer = new IntersectionObserver(handleObserver, option);
  //     if (loader.current) observer.observe(loader.current);
  //   }, [handleObserver]);


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
          {displayCount >= 5 && <div ref={finalDivRef}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>}
          {/* <div ref={finalDivRef}>this is the div to check</div> */}
        </Section>
        {displayCount === 2 && <Button onClick={() => {
          setDisplayCount(count)
        }}>More Reviews</Button>}
        <Button onClick={openModal}>Add a review <FontAwesomeIcon icon={faPlus}/></Button>
      </div>
    </Container>
      )
}

export default Reviews;