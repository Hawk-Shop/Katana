import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import '../QA/Modals/QAModal.css';
import styled from 'styled-components';

const ModalContent = styled.div`
  position: absolute;
  top: 40%;
  left: 40%;
  transform: translate(-50%, -50%);
  line-height: 1.4;
  background: #f1f1f1;
  padding: 14px 28px;
  border-radius: 10px;
  max-width: 600px;
  min-width: 300px;
  width: 800px;
  background-color: #fff;
`
const ModalBody = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #eee;
`

const LeftCtn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const RightCtn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Modal = props => {
  if (!props.show) {
    return null;
  }

  return (
    <div className="modal" onClick={props.onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Comparison</h4>
        </div>
        <ModalBody>
          <LeftCtn>
            This is left body
          </LeftCtn>
          <RightCtn>
            This is right body
          </RightCtn>
        </ModalBody>
        <div className="modal-footer">
          <button onClick={props.onClose} className="button">Close</button>
        </div>
      </ModalContent>
    </div>
  )
}

export default Modal;