import { useState, useEffect, useContext } from "react";
import { Context } from "../util/context.js";
import ProductInfo from "./ProductInfo.jsx";
import Gallery from "./Gallery.jsx";
import Description from "./Description.jsx";
import Features from "./Features.jsx";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
`;

const TopCtn = styled.div`
  display: flex;
  flex-direction: row;
  width: 75%;
  align-items: stretch;
`;
const BtmCtn = styled.div`
  display: flex;
  flex-direction: row;
  width: 75%;
  align-items: center;
  margin-top: 5%;
`;

const Overview = (props) => {
  const id = useContext(Context).id;
  const [product, setProduct] = useState("");
  const [styles, setStyles] = useState("");
  const [reviews, setReviews] = useState("");

  useEffect(() => {
    let productGet = axios.get(`/products/${id}`);
    let stylesGet = axios.get(`/products/${id}/styles`);
    let reviewsGet = axios.get(`/reviews/meta/?product_id=${id}`);

    Promise.all([productGet, stylesGet, reviewsGet]).then((results) => {
      setProduct(results[0].data)
      setStyles(results[1].data)
      setReviews(results[2].data)
    });
  }, []);

  return (
    <Container>
      <TopCtn>
        {styles && <Gallery product={product} styles={styles} />}
        {reviews && (
          <ProductInfo product={product} styles={styles} reviews={reviews} />
        )}
      </TopCtn>
      <BtmCtn>
        {product && <Description product={product} styles={styles} />}
        {product && <Features product={product} styles={styles} />}
      </BtmCtn>
    </Container>
  );
};

export default Overview;
