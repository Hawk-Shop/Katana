import styled from "styled-components";
const SelectDrop = styled.select`
  margin:5% 5% 0 0;
  border: 1px solid black;
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  cursor: pointer;
  line-height: 1.1;
  background-color: #fff;
  background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
`;
const Dropdown = ({
  value,
  options,
  onChange,
  disabled,
  placeholder,
  name,
  size,
}) => {
  let mapper;

  if (name === "sizer") {
    mapper = Object.keys(options).map((key) => [key, options[key]]);
  } else {
    if (size && size !== "SELECT SIZE") {
      for (let sku of Object.values(options)) {
        if (sku.size === size) {
          let qty = sku.quantity;
          if (qty > 15) {
            qty = 15;
          }
          mapper = [...Array(qty)].map((_, i) => i + 1);
        }
      }
    } else {
      mapper = [];
      disabled = true;
    }
  }
  return (
    <SelectDrop value={value} onChange={onChange} required disabled={disabled}>
      <option value="" defaultValue hidden>
        {placeholder}
      </option>
      {mapper.map((option, index) => {
        if (name === "sizer") {
          return <option key={index} value={option[1].size}>{option[1].size}</option>;
        } else {
          if (option === 1) {
            return (
              <option key={index} selected value={option}>
                {option}
              </option>
            );
          } else {
            return <option key={index} value={option}>{option}</option>;
          }
        }
      })}
    </SelectDrop>
  );
};

export default Dropdown;
