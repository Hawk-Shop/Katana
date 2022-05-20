import { useState, useEffect, useContext } from "react";
import { Context } from "../util/context.js";
import styled from "styled-components";

const Onsale = styled.span`
  color: red;
  text-decoration: line-through;
`;
const RegularPrice = styled.span`
  color: black;
`;

const ProductInfo = (props) => {
  const id = useContext(Context).id;
  const [style, setStyle] = useState(props.styles.results[4]);

  console.log(props.styles);

  return (
    <div>
      <div>{props.product.category}</div>
      <div>{props.product.name}</div>
      {style.sale_price
        ? <><Onsale>{style.original_price}</Onsale> <RegularPrice>{style.sale_price}</RegularPrice></>
        : <span>{style.original_price}</span>
      }
    </div>
  );
};

export default ProductInfo;
