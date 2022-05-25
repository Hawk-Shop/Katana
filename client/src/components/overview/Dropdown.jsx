import { useState, useEffect, useContext } from "react";
import styled from "styled-components";

const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <label>
      {label}
      <select
        value={value}
        onChange={onChange}
        required
      >
        <option value="" selected hidden>SELECT SIZE</option>
        {Object.values(options).map((option) => (
          <option value={option.size}>{option.size}</option>
        ))}
      </select>
    </label>
  );
};

export default Dropdown;
