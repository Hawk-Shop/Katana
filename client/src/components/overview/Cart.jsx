import { useState, useEffect } from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown.jsx";

const Selectors = styled.div`
  display: flex;
  flex-direction: row
`;

const Cart = (props) => {
  let options = props.currentStyle.skus;

  console.log(Object.values(options));
  const [size, setSize] = useState("SELECT SIZE");
  const [qty, setQty] = useState("-");

  useEffect(() => {
    setSize("SELECT SIZE")
    setQty('-')
  }, [props.currentStyle])

  useEffect(() => {
    setQty('1')
  }, [size])

  const handleSize = (event) => {
    setSize(event.target.value);
  };

  const handleQty = (event) => {
    setQty(event.target.value);
  };

  return (
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
  );
};

export default Cart;
