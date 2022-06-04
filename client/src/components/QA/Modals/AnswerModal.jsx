import {useState, useEffect} from "react";
import "./QAModal.css";
import axios from 'axios';
import photoUrlsToArray from '/client/src/components/R&R/ConvertPhoto.jsx';
import swal from 'sweetalert';


export default function AnswerModal ({id, productName, question_id, question_body, show, onClose}) {
  if (!show) {
    return null
  }

  if (show) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [body, setBody] = useState("");
  let [photos, setPhotos] = useState([]);

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  }

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown)
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/qa/questions/${question_id}/answers`, {
        body: body,
        name: username,
        email: email,
        photos: photos
      })
      .then(response => {
        // console.log('response data for adding a question: ', response);
        swal("🎊 Success! 🎊", `Your answer has been added to this question. If there are more than 2 answers, you may need to click on "See More Answers" to view yours. Thanks for your contribution!`, "success");
        onClose();
      })
      .catch(() => {
        swal('Uh oh...', 'On error occurred on our side. Unable to add your answer at this time. Please refresh and try again in a little bit.', 'error');
      })
  }

  const Username = (
    <label>
      <span className="inputs">Username:</span>
      <input
        className="user-input"
        type="text"
        name="username"
        maxLength={60}
        size={36}
        placeholder="Example: jack543!"
        value={username}
        onChange={e => {
          e.stopPropagation();
          setUsername(e.target.value);
        }}
        required
      />
      <p className="static">For privacy reasons, do not use your full name or email address.</p>
    </label>
  )

  const Email = (
    <label>
      <span className="inputs">Email:</span>
      <input
        className="user-input"
        type="email"
        name="email"
        maxLength={60}
        size={41}
        placeholder="Example: jack@email.com"
        value={email}
        onChange={e => {
          e.stopPropagation();
          setEmail(e.target.value);
        }}
        required
      />
      <p className="static">For authentication reasons, you will not be emailed.</p>
    </label>
  )

  const Answer = (
    <label>
      <div className="inputs">Answer:</div>
      <textarea
        className="text-area"
        type="text"
        name="body"
        rows="10"
        cols="65"
        maxLength={1000}
        placeholder="Enter your answers here..."
        value={body}
        onChange={e => {
          e.stopPropagation();
          setBody(e.target.value);
        }}
        required
      />
    </label>
  )

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-header">
            <h3 className="modal-title">Submit Your Answer</h3>
            <h4 className="modal-subtitle">{productName}: {question_body}</h4>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {Username}
              {Email}
              {Answer}
              {photos.length < 5 &&
                <div>
                  <label htmlFor="photos">Upload your photos</label> <br></br>
                  <input
                    type="file"
                    name="files"
                    accept="image/png, image/jpeg"
                    multiple
                    onChange={(e) => {
                      let files = e.target.files;
                      photoUrlsToArray(files, setPhotos);
                    }}
                  ></input>
                </div>
              }
              {photos.length >= 5 &&
                <div>
                  <span>Max 5 photo uploads reached</span>
                </div>
              }
              <br/>
              <input className="submit-button" type="submit" value="Submit"/>
            </form>
          </div>
          <div className="modal-footer">
            <button className="close-button" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}