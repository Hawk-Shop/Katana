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
  justify-content: space-between;
  flex-direction: row-reverse;
`;

const Overview = (props) => {
  const id = useContext(Context).id;
  const [product, setProduct] = useState("");
  const [styles, setStyles] = useState("");

  useEffect(() => {
    axios
      .get(`/products/${id}`)
      .then((result) => setProduct(result.data))
      .then(() => {
        axios
          .get(`/products/${id}/styles`)
          .then((result) => setStyles(result.data));
      });
  }, []);

  return (
    <Container>
      <TopCtn>
        {styles && <ProductInfo product={product} styles={styles} />}
        {styles && <Gallery product={product} styles={styles} />}
      </TopCtn>
      {product && <Description product={product} styles={styles} />}
    </Container>
  );
};

export default Overview;
