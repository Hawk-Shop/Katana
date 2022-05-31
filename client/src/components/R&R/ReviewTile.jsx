import { useState, useContext, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faUserCheck, faFontAwesome } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';

import Stars from './Stars.jsx';
import ImageModal from '../QA/Modals/ImageModal.jsx';

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
  width: 15%;
  height: 7em;
  margin: .2em;
  border: solid .5px grey;
  cursor: pointer;
  `;

  const Response = styled.div`
  background-color: lightgrey;
  padding: 1em;
  `;

const ReviewTile = ({review}) => {
  const [yesCount, setYesCount] = useState(review.helpfulness);
  const [noCount, setNoCount] = useState(0);
  const [modal, setModal] = useState(false);
  const [url, setUrl] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [reported, setReported] = useState(false);
  const [revealAll, setRevealAll] = useState(false);

  const toggleModal = (e) => {
    setUrl(e.target.currentSrc);
    setModal(!modal);
  }

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  const clickThumbsUp = () => {
    if (!disabled) {
      console.log(review.review_id)
      axios.put(`/reviews/${review.review_id}/helpful`, null)
      .then((result) => {
        console.log('it worked');
        setYesCount(yesCount+1);
        setDisabled(true);
      })
    }
  }

  const clickThumbsDown = () => {
    if (!disabled) {
      setNoCount(noCount+1);
      setDisabled(true);
    }
  }

  const clickReported = () => {
    if (!reported) {
      axios.put(`/reviews/${review.review_id}/report`)
      .then((result) => {
        setReported(true);
      })
    }
  }

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
          {!revealAll && <HelpButtons onClick={() => {setRevealAll(true)}}>Show more</HelpButtons>}
          {revealAll && <span>{review.body.substring(250)}</span>}
        </div>}
      </Body>
      {review.photos.length !== 0 &&
        <Photos>
          {console.log('PHOTO URL', review.photos)}
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
        <HelpButtons onClick={clickThumbsUp}>
          <FontAwesomeIcon icon={faThumbsUp} /> {` Yes (${yesCount})`}
          </HelpButtons>
        <HelpButtons onClick={clickThumbsDown}>
        <FontAwesomeIcon icon={faThumbsDown} /> {` No (${noCount})`}
          </HelpButtons>
        <HelpButtons onClick={clickReported}>
          {!reported && <span>Report &nbsp;<FontAwesomeIcon icon={faFontAwesome} /></span>}
          {reported && <span>Reported</span>}
          </HelpButtons>
      </Helpful>

    </Tile>
  )

}

export default ReviewTile;