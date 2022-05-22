import { useState, useEffect, useContext } from "react";
import { Context } from "../util/context.js";
import styled from "styled-components";
import Stars from "../R&R/Stars.jsx";
import avgRating from "../util/getAvgRating.js"
import Style from "./Style.jsx"
const Onsale = styled.span`
  color: blue;
  text-decoration: line-through;
  margin-right: 5%;
  font-style: italic;
  font-size: 0.9rem;
`;
const RegularPrice = styled.span`
  color: black;
`;
const PriceFit = styled.div`
  display: flex;
  flex-direction: row;
`;
const FlexFit = styled.div`
  display: flex;
  flex-direction: column;
`;
const ProductC = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;
  margin-bottom: 5%;
`;
const ProductNm = styled.p`
  font-size: 2rem;
  font-weight: bolder;
  margin: 0 0 1% 0; ;
`;
const ProductRev = styled.span`
  font-size: 0.6rem;
  display: inline;
  margin-left: 5%;
  text-decoration: underline;
`;

const StarLink = styled(Stars)`
  display: inline;
`;

const ProductInfo = (props) => {
  const ratings = props.reviews.ratings;
  let averageNums = avgRating(ratings)

  return (
    <FlexFit>
      {averageNums.ratingTotal > 0 && (
        <ProductC>
          <StarLink rating={averageNums.averageRating} />
          {averageNums.ratingTotal > 0}
          <ProductRev>Read {averageNums.ratingTotal} reviews</ProductRev>
        </ProductC>
      )}
      <div>{props.product.category}</div>
      <ProductNm>{props.product.name}</ProductNm>
      {props.currentStyle.sale_price ? (
        <PriceFit>
          <Onsale>{"$" + props.currentStyle.original_price}</Onsale>{" "}
          <RegularPrice>{"$" + props.currentStyle.sale_price}</RegularPrice>
        </PriceFit>
      ) : (
        <span>{"$" + props.currentStyle.original_price}</span>
      )}
      <Style product={props.product} styles={props.styles.results} currentStyle={props.currentStyle}/>
    </FlexFit>
  );
};

export default ProductInfo;
