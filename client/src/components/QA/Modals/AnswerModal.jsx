import React, {useState, useEffect} from "react";
import "./QAModal.css";
import axios from 'axios';

export default function AnswerModal ({id, question_id, question_body, show, onClose}) {
  if (!show) {
    return null
  }

  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [body, setBody] = useState("");
  let [file, setFile] = useState(null);

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
    if (username === "" || email === "" || body === "") {
      alert("In order to add an answer, you must complete all fields.")
    } else {
      console.log(question_id, username, email, body);
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
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-header">
            <h4 className="modal-title">Add your answer below</h4>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <label>
                Username:
                <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)}/>
              </label>
              <label>
                Email:
                <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
              </label>
              <br/>
              Product ID: {id}
              <br/>
              Question_id: {question_id} --> delete before deployment
              <br/>
              Question to answer: {question_body}
              <br/>
              <label>
                Answer:
                <textarea type="text" name="body" rows="10" cols="70" value={body} onChange={e => setBody(e.target.value)}/>
              </label>
              {/* <input type="file" value={file} onChange={e => setFile(e.target.files[0])}/> */}
              <input className="submit-button" type="submit" value="Submit" />
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