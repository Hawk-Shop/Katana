import React, {useState} from "react";
import "./ImageModal.css";
import styled from 'styled-components';
import axios from 'axios';

export default function AddAnswerModal ({toggleAddAnswerModal, addAnswerModal, id}) {
  // console.log(url);
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [body, setBody] = useState("");

  const Form = styled.div`
    background-color: transparent;
    border-radius: 16px;
    font-size: 18px;
    display: block;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
    max-height: 80vh;
  `

  if (addAnswerModal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  const handleAddingAnswer = (e) => {
    console.log(username, email, body);
    // axios.post(`/qa/questions/`, )
  }

  return (
    <>
      <div className="modal">
        <div
          className="overlay"
          onClick={toggleAddAnswerModal}>
        </div>
        <div className="modal-content">
          <Form>
            <label>
              Username: <input type="text" name="name"
                value={username}
                onChange={(e) => {
                  e.persist();
                  setUsername(e.target.value)
                }}/>
              <br/>
              Email: <input type="text" name="email"
                value={email}
                onChange={(e) => {
                  e.persist();
                  setEmail(e.target.value)
                }}/>
              <br/>
              Product ID: {id}
            </label>
            <textarea name="body" rows="10" cols="70" value={body} onChange={(e) => {setBody(e.target.value)}}></textarea>
            <br/>
            {/* <input type="submit" value="Submit" onSubmit={handleAddingAnswer}/> */}
            <button onClick={handleAddingAnswer}>Submit</button>
          </Form>
          <button
            className="close-modal"
            onClick={toggleAddAnswerModal}>
            X
          </button>
        </div>
      </div>
    </>
  )
}