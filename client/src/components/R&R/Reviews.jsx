import { useState, useContext, useEffect } from 'react';
import ReviewTile from './ReviewTile.jsx';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Reviews = ({count, getSorted, selectValue, reviews}) => {
  const [displayCount, setDisplayCount] = useState(2);

  const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid grey;
  margin: 2em 1em;
  padding: 0.5em 1em;
  &:hover {
    background: lightgrey;
  }
  `;

  const Section = styled.section`
  overflow: auto;
  max-height:500px;
  width: 45em;
  display: flex;
  flex-direction: column;
  `;

  const Sort = styled.div`
  padding: 1em;
  `;

  const Container = styled.div`
  border: solid;
  width: 75%;
  `;

  return (
      <Container>
        <Sort>
          {count} reviews,
          <label htmlFor="sort"> sorted by </label>
          <select value={selectValue} name="sort" onChange={(e) => {getSorted(e.target.value)}}>
            <option value="relevant">most relevant</option>
            <option value="helpful">most helpful </option>
            <option value="newest">newest</option>
          </select>
        </Sort>
        <Section>
          {reviews.slice(0, displayCount).map((review) => (
            <ReviewTile review={review}></ReviewTile>
          ))}
        </Section>
        {displayCount < count && <Button onClick={() => {
          setDisplayCount(displayCount + 2)
        }}>More Reviews</Button>}
        <Button>Add a review <FontAwesomeIcon icon={faPlus}/></Button>
      </Container>
      )
}

export default Reviews;