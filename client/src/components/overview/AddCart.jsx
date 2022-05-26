import styled from "styled-components";

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
  width: 20%;
  justify-content: space-between
`;

const Plus = styled.span`
`

const AddCart = ({skus, size, qty}) => {

  return (
    <>
      <Addbtn>ADD TO BAG <Plus>+</Plus></Addbtn>
    </>
  );
};

export default AddCart;
