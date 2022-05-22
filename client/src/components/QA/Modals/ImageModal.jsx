import React, {useState} from "react";
import "./ImageModal.css";
import styled from 'styled-components';


export default function Modal ({url, toggleModal}) {
  console.log(url);

  const Image = styled.img`
    border-radius: 16px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    height: 100%;
  `

  return (
    <>
      <div className="modal">
        <div
          onClick={toggleModal}
          className="overlay">
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