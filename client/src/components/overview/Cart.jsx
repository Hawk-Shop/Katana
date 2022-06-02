import { useState, useEffect } from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown.jsx";
import AddCart from "./AddCart.jsx";

const Selectors = styled.div`
  display: flex;
  flex-direction: row;
`;

const ContainCart = styled.div`
`;

const Cart = (props) => {
  let options = props.currentStyle.skus;

  const [size, setSize] = useState("SELECT SIZE");
  const [qty, setQty] = useState("-");
  const [sku, setSku] = useState(0);

  useEffect(() => {
    setSize("SELECT SIZE");
    setQty("-");
  }, [props.currentStyle]);

  useEffect(() => {
    setQty("1");
  }, [size]);

  const handleSize = (event) => {
    // console.log(event.target.value)
    // const splitString = event.target.value.split(' ');
    // console.log('split: ', splitString)
    // setSku(splitString[0])
    setSize(event.target.value);
  };

  const handleQty = (event) => {
    setQty(event.target.value);
  };

  return (
    <ContainCart>
      <Selectors>
        {options.null ? (
          <Dropdown
            options={options}
            value={size}
            onChange={handleSize}
            disabled={true}
            placeholder="OUT OF STOCK"
            name="sizer"
          />
        ) : (
          <Dropdown
            options={options}
            value={size}
            onChange={handleSize}
            disabled={null}
            placeholder="SELECT SIZE"
            name="sizer"
          />
        )}

        {options.null ? (
          <Dropdown
            options={options}
            value={qty}
            onChange={handleQty}
            disabled={true}
            placeholder="-"
            name="qty"
            size={size}
          />
        ) : (
          <Dropdown
            options={options}
            value={qty}
            onChange={handleQty}
            disabled={null}
            placeholder="-"
            name="qty"
            size={size}
          />
        )}
      </Selectors>

      <AddCart
        skus={options}
        size={size}
        qty={qty}
        currentStyle={props.currentStyle}
        name={props.name}
      />
    </ContainCart>
  );
};

export default Cart;
