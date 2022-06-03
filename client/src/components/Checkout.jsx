import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { ThemeProvider } from "styled-components";
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
  justify-content: space-between;
`;

const List = styled.div`
  margin-left: 5%;
  overflow-y: scroll;
  max-height: 75vh;
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
  margin-right: 3%;
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

const LeftDiv = styled.div`
width: 65%
`;

const RightDiv = styled.div`

`;

const Prices = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.95em;
`;
const PricesCtn = styled.div`
  margin-top: 3%;
  margin-left: 5%;
`;

const Addbtn = styled.button`
  border: 1px solid #212a2f;
  border-radius: 0.25em;
  background-color: #212a2f;
  color: white;
  padding: 0.25em 0.5em;
  font-weight: bold;
  line-height: 1.5;
  align-self: center;
  width: 50%;
  margin-top: 10%;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #212a2f;
  }
  &.dark {
    background-color: light-blue;
  }
`;

const Checkout = ({
  changeView,
  themeMode,
  theme,
  setCartQty,
  cartQty,
  setCart,
  setCartModal,
  cart,
}) => {

  const handlePurchase = () => {
    let promises = [];
    for (let item of cart) {
      let axiosPromises = [...Array(Number(item.qty))].map((number, i) => {
        return axios
          .post("/cart", { sku_id: Number(item.sku) })
          .catch((err) => console.log(err));
      });
      promises.push(...axiosPromises);
    }
    Promise.all(promises).catch((err) => console.log(err));
    setCart([])
    setCartQty(0)
    changeView("Home")();
  };

  const removeItem = (index, qty) => {
    const copy = [...cart];
    copy.splice(index, 1);
    setCart(copy);
    setCartQty(cartQty - Number(qty));
  };
  let totalPrice = 0;
  let cartItems = cart.map((item, i) => {
    let currPrice =
      item.currentStyle.sale_price || item.currentStyle.original_price;
    totalPrice += Number(currPrice) * item.qty;
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
          <Price>${currPrice}</Price>
          <XItem icon={faX} size="xs" onClick={() => removeItem(i, item.qty)} />
        </Right>
      </ItemCtn>
    );
  });
  let tax = totalPrice * 0.1;
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <TopDiv></TopDiv>

      <Container>
        <LeftDiv>
          <Addbtn  onClick={() => handlePurchase()}>
            CHECKOUT
          </Addbtn>
        </LeftDiv>
        <RightDiv>
          <List>{cartItems}</List>
          <PricesCtn>
            <Prices>
              <span>Subtotal</span> <span>${totalPrice.toFixed(2)}</span>
            </Prices>
            <Prices
              style={{
                borderBottom: "1px solid lightblue",
                paddingBottom: "3%",
                marginBottom: "3%",
              }}
            >
              <span>Tax</span> <span>${tax.toFixed(2)}</span>
            </Prices>
            <Prices style={{ fontSize: "1.05em" }}>
              <span>Total</span>{" "}
              <span style={{ fontWeight: "bold" }}>
                ${(tax + totalPrice).toFixed(2)}
              </span>
            </Prices>
          </PricesCtn>
        </RightDiv>
      </Container>
    </ThemeProvider>
  );
};

export default Checkout;
