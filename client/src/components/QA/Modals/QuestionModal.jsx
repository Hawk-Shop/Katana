import {useState, useEffect, useContext} from "react";
import "./QAModal.css";
import axios from 'axios';

export default function AnswerModal ({id, productName, showQModel, onClose}) {
  if (!showQModel) {
    return null
  }

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

  const Username = (
    <label>
      Username:
      <input
        type="text"
        name="username"
        maxLength={60}
        size={36}
        placeholder="Example: jackson11!"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <p className="static">For privacy reasons, do not use your full name or email address.</p>
    </label>
  )

  const Email = (
    <label>
      Email:
      <input
        type="email"
        name="email"
        maxLength={60}
        size={40}
        placeholder="Example: jack@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <p className="static">For authentication reasons, you will not be emailed.</p>
    </label>
  )

  const Question = (
    <label>
      Question:
      <textarea
        type="text"
        name="body"
        rows="10"
        cols="70"
        maxLength={1000}
        placeholder="Enter your question here..."
        value={body}
        onChange={e => setBody(e.target.value)}
        required
      />
    </label>
  )

  return (
    <div className={`modal ${showQModel ? 'show' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-header">
            <h3 className="modal-title">Ask Your Question</h3>
            <h4 className="modal-subtitle">about the {productName}</h4>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {Username}
              {Email}
              {Question}
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