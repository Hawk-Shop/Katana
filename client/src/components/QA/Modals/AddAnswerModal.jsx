import React, {useState} from "react";
import "./ImageModal.css";
import styled from 'styled-components';


export default function AddAnswerModal ({toggleAddAnswerModal, addAnswerModal}) {
  // console.log(url);

  const Form = styled.form`
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
              Username: <input type="text" name="name" />
              <br/>
              Email: <input type="text" name="email" />
              <br/>
              Product ID: <input type="text" name="email" />
            </label>
            <br/>
            <input type="submit" value="Submit"/>
          </Form>
          <button
            className="close-modal"
            onClick={toggleAddAnswerModal}
            >
            X
          </button>
        </div>
      </div>
    </>
  )
}