 import { useState, useContext, useEffect } from 'react';
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
  max-height:500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-width: 100%
  `;

  const Sort = styled.div`
  padding: 1em;
  `;

  const Container = styled.div`
  width: 70%;
  float: right;
  border: solid;
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

const Reviews = ({count, getSorted, selectValue, reviews}) => {
  const [displayCount, setDisplayCount] = useState(2);
  const [showModal, setShowModal] = useState(false);

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
          <Dropdown value={selectValue} name="sort" onChange={(e) => {getSorted(e.target.value)}}>
            <option value="relevant">most relevant</option>
            <option value="helpful">most helpful </option>
            <option value="newest">newest</option>
          </Dropdown>
        </Sort>
        <Section>
          {reviews.slice(0, displayCount).map((review) => (
            <ReviewTile review={review}></ReviewTile>
          ))}
        </Section>
        {displayCount < count && <Button onClick={() => {
          setDisplayCount(displayCount + 2)
        }}>More Reviews</Button>}
        <Button onClick={openModal}>Add a review <FontAwesomeIcon icon={faPlus}/></Button>
      </div>
    </Container>
      )
}

export default Reviews;