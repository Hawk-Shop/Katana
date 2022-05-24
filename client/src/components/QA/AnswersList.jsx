import { useState, useEffect, useContext } from 'react';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';
import ImageModal from './Modals/ImageModal.jsx';


const AnswersList = ({answer}) => {
  const {body, date, answerer_name, helpfulness, photos} = answer;
  const [modal, setModal] = useState(false);
  const [url, setUrl] = useState('');

  const Image = styled.img`
    border-radius: 8px;
    display: inline-block;
    max-height: 100px;
    max-width: 100%;
    margin-right: 10px;
  `

  const toggleModal = (e) => {
    // console.log(e.target.currentSrc);
    setUrl(e.target.currentSrc);
    setModal(!modal);
  }

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  const Answer = styled.div`
    margin-bottom: 0.5em;
  `

  return (
    <Answer>
      <span>{body}</span>
      <div>
        <span>by {answerer_name}, </span>
        <span> {format(parseISO(date), 'MMMM, dd, yyyy')} </span>
        <span> Helpful? <button>Yes &#40;{helpfulness}&#41;</button></span>
      </div>
      <div>
        {photos.map((photo, index) => {
          return  <Image
                    src={photo.url}
                    key={index}
                    onClick={toggleModal}
                    alt="unable to display">
                  </Image>
        })}
        {modal && (<ImageModal url={url} toggleModal={toggleModal} modal={modal}/>)}
      </div>
    </Answer>
  )
}

export default AnswersList;