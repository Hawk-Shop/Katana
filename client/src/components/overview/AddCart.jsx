import styled from "styled-components";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../util/context.js";

const Addbtn = styled.button`
  margin: 5% 5% 0 0;
  border: 1px solid var(--select-border);
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  cursor: ${(props) => `${props.cursor}`};
  line-height: 1.5;
  background-color: ${(props) => `${props.bColor}`};
  display: flex;
  width: 35%;
  justify-content: space-between;
`;

const Plus = styled.span``;

const AddCart = ({ skus, size, qty, currentStyle, name }) => {
  const color = size === "SELECT SIZE" ? "#d0d0d0" : "#fff";
  const cursor = size === "SELECT SIZE" ? "auto" : "pointer";

  const context = useContext(Context);
  const handleAdd = () => {
    if (size !== "SELECT SIZE") {
      let sku;
      for (let key in skus) {
        if (skus[key].size === size) {
          sku = key;
        }
      }

      let isInCart = false;
      const newCart = [...context.cart]
      for (let item of newCart) {
        if (item.sku === sku) {
          context.setCartQty(context.cartQty + Number(qty));
          item.qty = JSON.stringify(Number(item.qty) + Number(qty))
          context.setCart(newCart)
          isInCart = true;
        }
      }

      if (!isInCart) {

        let axiosPromises = [...Array(Number(qty))].map((number, i) => {
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
          },
        ]);

        context.setCartQty(context.cartQty + Number(qty));
      }


    }
  };

  return (
    <>
      <Addbtn cursor={cursor} bColor={color} onClick={() => handleAdd()}>
        ADD TO BAG <Plus>+</Plus>
      </Addbtn>
    </>
  );
};

export default AddCart;
