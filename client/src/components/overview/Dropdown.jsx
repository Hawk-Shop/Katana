import styled from "styled-components";
const SelectDrop = styled.select`
  margin:5% 5% 0 0;
  border: 1px solid var(--select-border);
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
    mapper = Object.values(options);
  } else {
    if (size && size !== "SELECT SIZE") {
      for (let sku of Object.values(options)) {
        if (sku.size === size) {
          let qty = sku.quantity;
          if (qty > 15) {
            qty = 15;
          }
          console.log("qty:", qty);
          mapper = [...Array(qty)].map((_, i) => i + 1);
          console.log(mapper);
        }
      }
    } else {
      mapper = [];
      disabled = true;
    }
  }
  return (
    <SelectDrop value={value} onChange={onChange} required disabled={disabled}>
      <option value="" selected hidden>
        {placeholder}
      </option>
      {mapper.map((option) => {
        if (name === "sizer") {
          return <option value={option.size}>{option.size}</option>;
        } else {
          if (option === 1) {
            return (
              <option selected value={option}>
                {option}
              </option>
            );
          } else {
            return <option value={option}>{option}</option>;
          }
        }
      })}
    </SelectDrop>
  );
};

export default Dropdown;
