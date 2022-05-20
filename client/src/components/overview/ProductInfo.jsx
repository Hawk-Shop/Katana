import { useState, useEffect, useContext } from "react";
import { Context } from "../util/context.js";
import styled from "styled-components";

const Onsale = styled.span`
  color: red;
  text-decoration: line-through;
  margin-right: 5%;
  font-style: italic;
  font-size: 0.9rem;
`;
const RegularPrice = styled.span`
  color: black;
`;

const FlexFit = styled.div`
`

const ProductNm = styled.p`
  font-size: 2rem;
  font-weight: bolder;
  margin: 0 0 1% 0;;
`

const ProductInfo = (props) => {
  const id = useContext(Context).id;
  const [style, setStyle] = useState(props.styles.results[4]);
  console.log(props.reviews.ratings)
  const ratings = props.reviews.ratings
  let ratingTotal = 0;
  for (let r in ratings) {
    ratingTotal += Number(ratings[r])
  }
  console.log(ratingTotal)

  return (
    <FlexFit>
      <div>{props.product.category}</div>
      <ProductNm>{props.product.name}</ProductNm>
      {style.sale_price
        ? <><Onsale>{'$' + style.original_price}</Onsale> <RegularPrice>{'$' + style.sale_price}</RegularPrice></>
        : <span>{'$' + style.original_price}</span>
      }
    </FlexFit>
  );
};

export default ProductInfo;
