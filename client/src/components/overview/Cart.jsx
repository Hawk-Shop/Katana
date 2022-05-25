import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown.jsx'



const Cart = (props) => {
  let options = props.currentStyle.skus;

  console.log(Object.values(options))
  const [size, setSize] = useState('SELECT SIZE');

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  return (
    <div>
      <Dropdown
        options={options}
        value={size}
        onChange={handleChange}
      />

    </div>
  );
};



export default Cart;