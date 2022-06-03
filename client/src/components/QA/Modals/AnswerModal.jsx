import {useState, useEffect} from "react";
import "./QAModal.css";
import axios from 'axios';

export default function AnswerModal ({id, productName, question_id, question_body, show, onClose}) {
  if (!show) {
    return null
  }

  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [body, setBody] = useState("");
  let [files, setFiles] = useState(null);

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
        photos: []
      })
      .then(response => {
        console.log("adding an answer response: ", response);
        onClose();
      })
      .catch(err => {
        console.error('error adding answer: ', err);
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
        onChange={e => setUsername(e.target.value)}
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
        onChange={e => setEmail(e.target.value)}
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
        onChange={e => setBody(e.target.value)}
        required
      />
    </label>
  )

  // let fileObj = [];
  // let fileArray = [];

  // const handleUpload = (e) => {
  //   e.preventDefault();
  //   fileArray = [...files, ...e.target.files];

  //   setFiles(fileArray.map(file => {
  //     return URL.createObjectURL(file);
  //   }))
  // }

  // const uploadMultipleFiles = (e) => {
  //   console.log([...e.target.files].map(file => URL.createObjectURL(file)));
  //   fileObj.push(e.target.files);
  //   for (let i = 0; i < fileObj[0].length; i++) {
  //       fileArray.push(URL.createObjectURL(fileObj[0][i]))
  //   }
  //   setFiles([...fileArray])
  // }

  // const uploadFiles = (e) => {
  //   e.preventDefault();
  //   console.log(files);
  // }

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
              {/* <input
                type="file"
                accept="image/png, image/jpeg, image/heic, video/*"
                multiple
                onChange={e => uploadMultipleFiles(e)}
              /> */}
              {/* <div className="form-group multi-preview">
                {(fileArray || []).map(url => (
                    <img src={url} alt="..." />
                ))} */}
              {/* </div> */}
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