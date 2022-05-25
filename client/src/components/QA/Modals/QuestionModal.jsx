import React, {useState, useEffect} from "react";
import "./QAModal.css";
import axios from 'axios';

export default function AnswerModal ({id, showQModel, onClose}) {
  // if (!showQModel) {
  //   return null
  // }

  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [body, setBody] = useState("");

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
      console.log(id, username, email, body);
      axios
        .post(`/qa/questions/`, {
          body: body,
          name: username,
          email: email,
          product_id: id
        })
        .then(response => {
          console.log('response data for adding a question: ', response);
          onClose();
        })
        .catch(err => {
          console.error('error adding a question: ', err);
        })
    }
  }

  return (
    <div className={`modal ${showQModel ? 'show' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-header">
            <h4 className="modal-title">Add your question below</h4>
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
              <label>
                Question:
                <textarea type="text" name="body" rows="10" cols="70" value={body} onChange={e => setBody(e.target.value)}/>
              </label>
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