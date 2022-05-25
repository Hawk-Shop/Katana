import { useState } from 'react';
import styled from 'styled-components';
import Rate from './Rate.jsx';

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
  max-width: 600px;
  min-width: 300px;
  border-style: solid;
  border-width: 2px;
`;

const CloseModalButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 7px;
`;

const NewReview = ({showModal, setShowModal}) => {
  const [rate, setRate] = useState(0); // for stars
  const [recommend, setRecommend] = useState('');
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  return (
    <>
      {showModal ? (
        <Modal>
          <Overlay onClick={() => setShowModal(prev => !prev)}></Overlay>
          <ModalContent>
            <form>
              <h2>Write Your Review</h2>
              <h3>About the [product name here]</h3>
              <div>
                <label htmlFor="overall">Overall rating *</label>
                <Rate rate={rate} setRate={setRate}></Rate>
              </div>
              <div>
                <label htmlFor="recommend">Do you recommend this product? *</label>
                <div>
                  <input type="radio" name="recommend" value="yes" required onClick={(e) => {
                    setRecommend(e.target.value);
                  }}></input>
                  <label htmlFor="yes">Yes</label>
                </div>
                <div>
                  <input type="radio" name="recommend" value="no" onClick={(e) => {
                    setRecommend(e.target.value);
                  }}></input>
                  <label htmlFor="no">No</label>
                </div>
              </div>
              <div>
                <label htmlFor="characteristics">Characteristics *</label>
              </div>
              <div>
                <label htmlFor="summary">Review summary</label>
                <textarea name="summary" cols="50" rows="2" maxlength="60" placeholder="Example: Best purchase ever!" onChange={(e) => {setSummary(e.target.value)}}></textarea>
              </div>
              <div>
                <label htmlFor="body">Review body *</label>
                <textarea name="body" cols="50" rows="5" minlength="50" maxlength="1000" placeholder="Why did you like the product or not?" required onChange={(e) => {setBody(e.target.value)}}></textarea>
                {body.length < 50 ? <span>Minimum required characters left: {50-body.length}</span> : <span>Minimum reached</span>}
              </div>
              <div>
                <label htmlFor="photos">Upload your photos</label>
                <input type="file" name="photos" accept="image/png, image/jpeg" multiple onChange={(e) => {console.log('UPLOADED IMAGES', e.target.files)}}></input>
              </div>
              <div>
                <label htmlFor="nickname">What is your nickname *</label>
                <textarea name="nickname" cols="50" rows="2" maxlength="60" placeholder="Example: jackson11!" required onChange={(e) => {setNickname(e.target.value)}}></textarea>
                <span>For privacy reasons, do not use your full name or email address</span>
              </div>
              <div>
                <label htmlFor="email">Your email *</label>
                <textarea name="email" cols="50" rows="2" maxlength="60" placeholder="Example: jackson11@email.com" required onChange={(e) => {setEmail(e.target.value)}}></textarea>
                <span>For authentication reasons, you will not be emailed</span>
              </div>
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