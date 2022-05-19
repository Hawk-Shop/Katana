import { useState, useEffect, useContext } from "react";
import { Context } from "../util/context.js";
import ProductInfo from "./ProductInfo.jsx";
import Style from "./Style.jsx";
import Cart from "./Cart.jsx";
import Gallery from "./Gallery.jsx";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
`;

const Overview = (props) => {
  const id = useContext(Context).id;
  const [product, setProduct] = useState(null);
  const [styles, setStyles] = useState(null);

  useEffect(() => {
    axios
      .get(`/products/${id}`)
      .then((result) => setProduct(result.data))
      .then(() => {
        axios.get(`/products/${id}/styles`).then((result) => setStyles(result.data));
      });
  }, []);

  return (
    <Container>
      <ProductInfo product={product} styles={styles}/>
      <Style />
      <Cart />
      <Gallery />
    </Container>
  );
};

export default Overview;
