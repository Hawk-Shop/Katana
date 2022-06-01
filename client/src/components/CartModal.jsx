import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const Modal = styled.div`
  width: 25%;
  height: 85vh;
  top: 0;
  left: 75%;
  right: 0;
  bottom: 0;
  position: fixed;
  z-index: 10;
`;
const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: rgba(49, 49, 49, 0.8);
`;

const ModalContent = styled.div`
  position: absolute;
  line-height: 1.4;
  background: #f1f1f1;
  min-height: 100vh;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const XIcon = styled(FontAwesomeIcon)`
  margin: 2% 0 0 3%;
  cursor: pointer;
`;

const ItemCtn = styled.div`
  display: flex;
  border-bottom: 1px solid lightblue;
  padding-bottom: 3%;
  padding-top: 3%;
  width: 100%;
`;

const List = styled.div`
  margin-top: 15%;
  margin-left: 5%;
`;
const ImageDiv = styled.div`
  width: 15%;
`;
const Image = styled.img`
  width: 100%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3%;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  justify-content: space-between;
  margin-left: 30%;
`
const Price = styled.div`
`;

const XItem = styled(XIcon)`
  margin: 0;
`;

const CartModal = ({ setCartQty, cartQty, setCart, setCartModal, cart }) => {
  const removeItem = (index, qty) => {
    const copy = [...cart]
    copy.splice(index, 1)
    setCart(copy)
    setCartQty(cartQty - Number(qty))
  }
  console.log("CARTTTT", cart)
  let cartItems = cart.map((item, i) => {

    return (
      <ItemCtn key={i}>
        <ImageDiv>
          <Image src={item.currentStyle.photos[0].thumbnail_url} />
        </ImageDiv>
        <Details>
          <span style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{item.name}</span>
          <span>{item.currentStyle.name}</span>
          <span>Size: {item.size}</span>
          <span>Qty: {item.qty}</span>
        </Details>
        <Right>
          <Price>${item.currentStyle.sale_price || item.currentStyle.original_price}</Price>
          <XItem
            icon={faX}
            size="xs"
            onClick={() => removeItem(i, item.qty)}
          />
        </Right>
      </ItemCtn>
    )
  })

  return (
    <Modal>
      <Overlay onClick={() => setCartModal((prev) => !prev)}></Overlay>
      <ModalContent>
        <XIcon
          onClick={() => setCartModal((prev) => !prev)}
          icon={faX}
          size="xl"
        />
        <List>{cartItems}</List>
      </ModalContent>
    </Modal>
  );
};

export default CartModal;
