import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./DarkMode/GlobalStyles.jsx";
import Toggle from "./DarkMode/Toggler.jsx";

const Container = styled.div`
display: flex;
`;

const TopDiv = styled.div`
height: 5em;
width: 100%;
`;

const ItemCtn = styled.div`
  display: flex;
  border-bottom: 1px solid lightblue;
  padding-bottom: 3%;
  padding-top: 3%;
  width: 100%;
`;

const List = styled.div`
  margin-left: 5%;
  overflow-y: scroll;
`;
const ImageDiv = styled.div`
  width: 15%;
`;
const Image = styled.img`
  width: 100%;
`;
const XIcon = styled(FontAwesomeIcon)`
  margin: 2% 0 0 3%;
  cursor: pointer;
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
`;
const Price = styled.div``;

const Text = styled.span`
  align-self: center;
  margin-top: 25%;
  font-size: 1.3rem;
`;


const XItem = styled(XIcon)`
  margin: 0;
`;

const Checkout = ({changeView, themeMode, theme, setCartQty, cartQty, setCart, setCartModal, cart}) => {
  const removeItem = (index, qty) => {
    const copy = [...cart];
    copy.splice(index, 1);
    setCart(copy);
    setCartQty(cartQty - Number(qty));
  };

  let cartItems = cart.map((item, i) => {
    return (
      <ItemCtn key={i}>
        <ImageDiv>
          <Image src={item.currentStyle.photos[0].thumbnail_url} />
        </ImageDiv>
        <Details>
          <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            {item.name}
          </span>
          <span>{item.currentStyle.name}</span>
          <span>Size: {item.size}</span>
          <span>Qty: {item.qty}</span>
        </Details>
        <Right>
          <Price>
            ${item.currentStyle.sale_price || item.currentStyle.original_price}
          </Price>
          <XItem icon={faX} size="xs" onClick={() => removeItem(i, item.qty)} />
        </Right>
      </ItemCtn>
    );
  });

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles/>
      <TopDiv></TopDiv>

    <Container>
      <List>{cartItems}</List>
    </Container>
    </ThemeProvider>
  );
};

export default Checkout;
