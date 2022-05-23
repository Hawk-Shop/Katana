import { useState, useContext, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';

import Stars from './Stars.jsx';
import ImageModal from '../QA/Modals/ImageModal.jsx';

const ReviewTile = ({review}) => {
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [modal, setModal] = useState(false);
  const [url, setUrl] = useState('');

  const toggleModal = (e) => {
    setUrl(e.target.currentSrc);
    setModal(!modal);
  }

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  // styled components
  const Tile = styled.div`
  border-bottom: .05em solid;
  padding-bottom: 1em;
  margin: 1em;
  `;

  const Date = styled.div`
  font-size: .8em;
  float: right;
  margin-top: -1em;
  `;

  const Helpful = styled.div`
  font-size: .8em;
  padding-top: 1em;
  `;

  const HelpButtons = styled.button`
  font-size: .8em;
  border: none;
  text-decoration: underline;
  background-color: transparent;
  &:hover {
    color: grey;
    font-size: .9em;
  };
  cursor: pointer;
  `;

  const Summary = styled.div`
  padding-top: 1em;
  font-size: 1.2em;
  `;

  const Body = styled.div`
  padding-top: 1em;
  font-size: 1em;
  `;

  const Photos = styled.div`
  padding-top: 1em;

  `;

  const Photo = styled.img`
  width: 13%;
  height: 5em;
  margin: .2em;
  border: solid .5px grey;
  `;

  const Response = styled.div`
  background-color: lightgrey;
  padding: 1em;
  `;

  return (
    <Tile>
      <div>
        <Stars rating={review.rating}></Stars>
      </div>
      <Date>
        <FontAwesomeIcon icon={faUserCheck} /> &nbsp;
        {review.reviewer_name}, &nbsp;
        {review.date &&
        <span>{format(parseISO(review.date), `MMMM dd, yyyy`)}</span>}
      </Date>
      <Summary>
        {review.summary.length > 56 ?
        <b>{review.summary.substring(0,57)}...</b> :
        <b>{review.summary}</b>}
      </Summary>
      <Body>
        {review.body.length < 250 ?
        <div>
          {review.body}
        </div> :
        <div>
          {review.body.substring(0,250)}
          <button>Show more</button>
        </div>}
      </Body>
      {review.photos.length !== 0 &&
        <Photos>
          {review.photos.map((photo) => (
            <Photo
              src={photo.url}
              onClick = {toggleModal}
              alt="product review image">
            </Photo>
          ))}
          {modal && <ImageModal url={url} toggleModal={toggleModal} />}
        </Photos>}
      <div>
        {review.recommend === true && <p> <FontAwesomeIcon icon={faCheck} /> I recommend this product</p>}
      </div>
      {review.response &&
      <Response>
        <b>Response from seller:</b> <br></br><br></br>
        {review.response}
      </Response>}
      <Helpful>
        Helpful?
        <HelpButtons onClick={() => setYesCount(yesCount+1)}>
          <FontAwesomeIcon icon={faThumbsUp} /> {` Yes (${yesCount})`}
          </HelpButtons>
        <HelpButtons onClick={() => setNoCount(noCount+1)}>
        <FontAwesomeIcon icon={faThumbsDown} /> {` No (${noCount})`}
          </HelpButtons>
      </Helpful>

    </Tile>
  )

}

export default ReviewTile;