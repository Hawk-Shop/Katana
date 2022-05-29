import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import '../QA/Modals/QAModal.css';
import styled from 'styled-components';
import axios from 'axios';

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(49, 49, 49, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.4;
  background: #f1f1f1;
  padding: 14px 28px;
  border-radius: 10px;
  max-width: 600px;
  min-width: 300px;
  width: 500px;
  background-color: #fff;
`;

const ModalHeader = styled.div`
  padding: 0;
  text-align: center;
`;

const ModalTitle = styled.div`
  margin: 0;
`;

const ModalBody = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

const LeftCtn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: center;
`;
const RightCtn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: center;
`;

const InnerBody = styled.div`
  display: flex;
  padding: 10px;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 5px 7px;
`;

const LeftFeat = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: center;
  margin: 0;
`;

const RightFeat = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: center;
  margin: 0;
`;

const ModalFooter = styled.div`
  padding: 10px;
  text-align: right;
`;

const Feature = styled.li({
  '&:before': {
    content: '"✓"',
  }
})

const InnerFeature = styled.div`
  margin-top: 2%;
  list-style-type: none;
  font-size: 0.9rem;
`;

const Modal = (props) => {
  const id = useContext(Context).id;

  if (!props.show) {
    return null;
  }

  useEffect(() => {
    axios.get(`/products/${id}`)
      .then((res) => {
        props.setMain(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  },[])

  // console.log("THIS IS MODAL PROPS", props)

  return (
    <ModalContainer onClick={props.onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Comparison</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <LeftCtn>
            {props.mainProduct.name}
          </LeftCtn>
          <RightCtn>
            {props.reference.name}
          </RightCtn>
        </ModalBody>
        <InnerBody>
            <LeftFeat>
              {props.mainProduct && props.mainProduct.features.map((feature) => (
                  <InnerFeature><Feature>{feature.feature}: {feature.value}</Feature></InnerFeature>
              ))}
            </LeftFeat>
            <RightFeat>
              {props.reference.features.map((feature) => (
                <InnerFeature><Feature>{feature.feature}: {feature.value}</Feature></InnerFeature>
              ))}
            </RightFeat>
        </InnerBody>
      </ModalContent>
    </ModalContainer>
  )
}

export default Modal;