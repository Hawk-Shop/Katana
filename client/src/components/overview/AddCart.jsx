import styled from "styled-components";
import axios from 'axios';
import {useContext} from 'react';
import { Context } from "../util/context.js";


const Addbtn = styled.button`
  margin:5% 5% 0 0;
  border: 1px solid var(--select-border);
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  cursor: pointer;
  line-height: 1.5;
  background-color: #fff;
  background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
  display: flex;
  width: 25%;
  justify-content: space-between
`;

const Plus = styled.span`
`

const AddCart = ({skus, size, qty, currentStyle}) => {
  const context = useContext(Context)

  const handleAdd = () => {
    let sku;
    for (let key in skus) {
      if (skus[key].size === size) {
        sku = key
      }
    }
    console.log(sku)
    let axiosPromises = [...Array(Number(qty))].map((number, i) => {
      return axios.post('/cart', {sku_id: Number(sku)})
    });

    context.setCart([...context.cart,{
      currentStyle, sku, size, qty, axiosPromises, id: context.id
    }])


    context.setCartQty(context.cartQty + Number(qty))
    // console.log(axiosPromises)
    // Promise.all(axiosPromises) .then(() => axios.get('/cart')) .then((res) => console.log('CART', res)) .catch((err) => console.log(err))
  }
  return (
    <>
      <Addbtn onClick={() => handleAdd()}>ADD TO BAG <Plus>+</Plus></Addbtn>
    </>
  );
};

export default AddCart;
