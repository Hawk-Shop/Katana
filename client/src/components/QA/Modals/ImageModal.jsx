import React, {useState} from "react";
import "./ImageModal.css";
import styled from 'styled-components';


export default function Modal ({url, toggleModal, modal}) {
  console.log(url);

  const Image = styled.img`
    border-radius: 16px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
    max-height: 80vh;
  `

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <>
      <div className="modal">
        <div
          className="overlay"
          onClick={toggleModal}>
        </div>
        <div className="modal-content">
          <Image src={url}></Image>
          <button
            className="close-modal"
            onClick={toggleModal}
            >
            CLOSE
          </button>
        </div>
      </div>
    </>
  )
}