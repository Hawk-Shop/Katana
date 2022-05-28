import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import Rate from './Rate.jsx';
import axios from 'axios';
import { Context } from '../util/context.js';
import charLegend from './Legends/Characteristics.jsx';

const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
`;

const Overlay = styled.div`
width: 100vw;
height: 100vh;
top: 0;
left: 0;
right: 0;
bottom: 0;
position: fixed;
background: rgba(49,49,49,0.8);
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.4;
  background: #f1f1f1;
  padding: 14px 28px;
  border-radius: 10px;
  max-height: 80%;
  min-height: 300px;
  max-width: 100%;
  min-width: 300px;
  border-style: solid;
  border-width: 2px;
  overflow: auto;
`;

const CloseModalButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 7px;
`;

const Question = styled.div`
padding: 1em;
`;

// const Option = styled.span`
// display: flex;
// flex-direction: row-reverse;
// align-items: flex-end;
// align-text: left;
// border: dotted red;
// font-size: 1em;
// `;

// const OptionCol = styled.div`
// display: flex;
// flex-direction: column;
// width: 100%;
// border: dotted green;
// margin: 0;
// flex-grow: 1;
// `;

// const OptionContainer = styled.div`
// display: flex;
// flex-direction: row;
// border: dotted blue;
// margin: 0;
// height: 0em;
// `;

const Option = styled.span`
width: 20%;
text-align: -webkit-center;
font-size: smaller;
`;

const OptionCol = styled.div`
background-color: lightgrey;
border-radius: 10px 15px 15px 10px;
display: flex;
margin: .5em;
padding: .2em;
`;

const OptionContainer = styled.div`
`;

const Thumbnails = styled.img`
width: 6em;
height: 6em;
padding: .2em;
`;

const Footnote = styled.div`
font-size: smaller;
font-style: italic;
`;

const NewReview = ({closeModal, showModal, setShowModal}) => {
  const id = useContext(Context).id;
  const productName = useContext(Context).productName;

  const [rate, setRate] = useState(null); // for stars
  const [recommend, setRecommend] = useState('');
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [characteristics, setCharacteristics] = useState([]); // array of characteristics
  const [charObject, setCharObject] = useState({});
  const [idLegend, setIdLegend] = useState({});

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      closeModal();
    }
  }

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown)
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown)
    }
  }, [])

  const submitReview = (e) => {
    e.preventDefault();
    let axiosBody = {
      product_id: id,
      rating: rate,
      summary: summary,
      body: body,
      recommend:recommend,
      name: nickname,
      email: email,
      photos: photos,
      characteristics: charObject
    };
    console.log(axiosBody);
    axios.post('/reviews', axiosBody)
    .then((res) => {
      console.log('successfully added reviews');
      closeModal();
    })
    .catch((err) => console.log('error', err));
  }

  useEffect(() => {
    axios.get(`/reviews/meta/?product_id=${id}`)
    .then((results) => {
      const idLeg = {};
      let charNames = Object.keys(results.data.characteristics);
      charNames.forEach((charName) => {
        idLeg[charName] = Number(results.data.characteristics[charName].id);
      })
      setCharacteristics(charNames);
      setIdLegend(idLeg);
    })
  }, [])

  // helper
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = error => reject(error);
    });
  }

  return (
    <>
      {showModal ? (
        <Modal>
          <Overlay onClick={() => setShowModal(prev => !prev)}></Overlay>
          <ModalContent>
            <form onSubmit={submitReview}>
              <h2>Write Your Review</h2>
              <h3>About the {productName}</h3>
              <Question>
                <label htmlFor="overall">Overall rating *</label>
                <Rate rate={rate} setRate={setRate}></Rate>
              </Question>
              <Question>
                <label htmlFor="recommend">Do you recommend this product? *</label>
                <div>
                  <input type="radio" name="recommend" value="yes" required onClick={(e) => {
                    setRecommend(true);
                  }}></input>
                  <label htmlFor="yes">Yes</label>
                  <input type="radio" name="recommend" value="no" onClick={(e) => {
                    setRecommend(false);
                  }}></input>
                  <label htmlFor="no">No</label>
                </div>
              </Question>
              <Question>
                <label htmlFor="characteristics">Characteristics *</label>
                <OptionContainer>
                  {characteristics.map((char) => {
                    let ratings = Object.keys(charLegend[char]); // ratings are numbers
                    return (
                      <>
                        <label> {char} </label>
                        <OptionCol>
                            {ratings.map((rating) => (
                              <Option>
                                <input type="radio" name={char} value={rating + char} onChange={(e) => {
                                  let newCharObject = {...charObject};
                                  let numRating = Number(e.target.value.substring(0, 1));
                                  let charName = e.target.value.substring(1);
                                  let charId = idLegend[charName];
                                  newCharObject[charId] = numRating;
                                  setCharObject(newCharObject);
                                }} required></input>
                                <br></br>
                                <label htmlFor={char}>{(rating === '1' || rating === '5') && charLegend[char][rating]}</label>
                              </Option>
                            ))}
                        </OptionCol>
                      </>
                    )
                  })}
                </OptionContainer>
              </Question>
              <Question>
                <label htmlFor="summary">Review summary&nbsp;</label><br></br>
                <textarea name="summary" cols="60" rows="2" maxLength="60" placeholder="Example: Best purchase ever!" onChange={(e) => {setSummary(e.target.value)}}></textarea>
              </Question>
              <Question>
                <label htmlFor="body">Review body *&nbsp;</label><br></br>
                <textarea name="body" cols="60" rows="5" minLength="50" maxLength="1000" placeholder="Why did you like the product or not?" required onChange={(e) => {setBody(e.target.value)}}></textarea>
                {body.length < 50 ? <Footnote>Minimum required characters left: {50-body.length}</Footnote> : <span>Minimum reached</span>}
              </Question>
              {photos.length < 5 && <Question>
                <label htmlFor="photos">Upload your photos</label> <br></br>
                <input type="file" name="photos" accept="image/png, image/jpeg" multiple="true" onChange={(e) => {
                  let allPhotos = [];
                  let files = e.target.files;
                  for (var i = 0; i < files.length; i++) {
                    let base64 = getBase64(files[i]);
                    allPhotos.push(base64);
                  }

                  Promise.all(allPhotos)
                  .then((allBase64) => {
                    let allUrl = [];
                    allBase64.forEach((base64) => {
                      let body = new FormData();
                      body.append('image', base64);

                      allUrl.push(axios.post(`https://api.imgbb.com/1/upload?key=193e1e2ee600f99c92cf7b198b721403`, body));
                    });
                    Promise.all(allUrl)
                    .then((result) => {
                      let urls = result.map((each) => each.data.data.display_url);
                      setPhotos(urls);
                    })
                  })
                }}></input>
              </Question>}
              {photos.length >= 5 && <Question>
                  <span>Max 5 photo uploads reached</span>
                </Question>}
              <div>
                {console.log('photos', photos)}
                {photos.length === 0 ?
                  <div>No photos selected yet</div> :
                  <div>
                    {photos.map((photo) => <Thumbnails src={photo}></Thumbnails>)}
                  </div>}
              </div>
              <Question>
                <label htmlFor="nickname">What is your nickname *&nbsp;</label>
                <input type="text" name="nickname" size="60" maxLength="60" placeholder="Example: jackson11!" required onChange={(e) => {setNickname(e.target.value)}}></input>
                <Footnote>For privacy reasons, do not use your full name or email address</Footnote>
              </Question>
              <Question>
                <label htmlFor="email">Your email *&nbsp;</label>
                <input type="email" name="email" size="60" maxLength="60" placeholder="Example: jackson11@email.com" required onChange={(e) => {setEmail(e.target.value)}}></input>
                <Footnote>For authentication reasons, you will not be emailed</Footnote>
              </Question>
              <input type="submit" value="Submit review"></input>
            </form>
          <CloseModalButton onClick={() => setShowModal(prev => !prev)}>X</CloseModalButton>
          </ModalContent>
        </Modal>

      ) : null}
    </>
  )
}

export default NewReview;


// {
//   "product_id": 40344,
//   "rating": 3,
//   "summary": "this is my summar",
//   "body": "this is my body",
//   "recommend": true,
//   "name": "mynickname",
//   "email": "beep@gmail.com",
//   "photos": [],
//   "characteristics": {135219:1}
// }