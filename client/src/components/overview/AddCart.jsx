import styled from "styled-components";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../util/context.js";

const Addbtn = styled.button`
  margin: 5% 5% 0 0;
  color: ${(props) => `${props.orgCol}`};;;
  border: 1px solid black;
  border-radius: 0.25em;
  padding: 1% 12.5%;
  cursor: ${(props) => `${props.cursor}`};
  line-height: 1.5;
  background-color: ${(props) => `${props.bColor}`};
  width: auto;
  &:hover{
    background-color: ${(props) => `${props.hover}`};;
    color: ${(props) => `${props.textCol}`};;
  }
  white-space: nowrap;
`;

const Plus = styled.span``;

const AddCart = ({ skus, size, qty, currentStyle, name }) => {
  const color = size === "SELECT SIZE" ? "#d0d0d0" : "#212a2f";
  const cursor = size === "SELECT SIZE" ? "auto" : "pointer";
  const hover = size === "SELECT SIZE" ? "#d0d0d0" : "white";
  const textCol = size === "SELECT SIZE" ? "black" : "black";
  const orgCol = size === "SELECT SIZE" ? "black" : "white";

  const context = useContext(Context);
  const handleAdd = () => {
    if (size !== "SELECT SIZE") {
      let sku;
      let max_qty;
      for (let key in skus) {
        if (skus[key].size === size) {
          sku = key;
          max_qty = skus[key].quantity
        }
      }

      if (max_qty > 15) max_qty = 15

      let isInCart = false;
      const newCart = [...context.cart]
      for (let item of newCart) {
        if (item.sku === sku) {
          item.qty = JSON.stringify(Number(item.qty) + Number(qty))
          context.setCart(newCart)
          isInCart = true;
        }
      }

      if (!isInCart) {

        let axiosPromises = [...Array(Number(qty))].map(() => {
          return axios
            .post("/cart", { sku_id: Number(sku) })
            .catch((err) => console.log(err));
        });

        context.setCart([
          ...context.cart,
          {
            currentStyle,
            sku,
            size,
            qty,
            axiosPromises,
            id: context.id,
            name,
            max_qty
          },
        ]);

        context.setCartQty(context.cartQty + Number(qty));
      }

    }
  };

  return (
    <>
      <Addbtn orgCol={orgCol} hover={hover} textCol={textCol} cursor={cursor} bColor={color} onClick={() => handleAdd()}>
        ADD TO CART
      </Addbtn>
    </>
  );
};

export default AddCart;
