import { useState, useEffect, useContext } from "react";
import { Context } from "../util/context.js";
import ProductInfo from "./ProductInfo.jsx";
import Gallery from "./Gallery.jsx";
import Description from "./Description.jsx";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
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
  align-items: stretch;
`;

const Overview = (props) => {
  const id = useContext(Context).id;
  const [product, setProduct] = useState("");
  const [styles, setStyles] = useState("");
  const [reviews, setReviews] = useState("");

  useEffect(() => {
    axios
      .get(`/products/${id}`)
      .then((result) => setProduct(result.data))
      .then(() => {
        axios
          .get(`/products/${id}/styles`)
          .then((result) => setStyles(result.data))
          .then(() => {
            axios
              .get(`/reviews/meta/?product_id=${id}`)
              .then((result) => setReviews(result.data));
          });
      });
  }, []);

  return (
    <Container>
      <TopCtn>
        {styles && <Gallery product={product} styles={styles} />}
        {reviews && <ProductInfo product={product} styles={styles} reviews={reviews}/>}
      </TopCtn>
      <BtmCtn>
        {product && <Description product={product} styles={styles} />}
      </BtmCtn>
    </Container>
  );
};

export default Overview;
