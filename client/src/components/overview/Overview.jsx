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
  width: 100%;
  align-items: center;
  @media (max-width: 425px) {
    width: 425px;
    align-items: flex-start;
  }
`;

const TopCtn = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  @media (max-width: 425px) {
    flex-direction: column;
    margin-bottom: 3%;

  }
`;
const BtmCtn = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: flex-start;
  margin-top: 3%;
  margin-bottom: 1%;
  @media (max-width: 425px) {
    width: 50%;
  }
`;

const Overview = (props) => {
  const id = useContext(Context).id;
  const [product, setProduct] = useState("");
  const [styles, setStyles] = useState("");
  const [reviews, setReviews] = useState("");
  const [currentStyle, setCurrentStyle] = useState("");
  const [expandedView, setExpandedView] = useState(false)

  useEffect(() => {
    let productGet = axios.get(`/products/${id}`);
    let stylesGet = axios.get(`/products/${id}/styles`);
    let reviewsGet = axios.get(`/reviews/meta/?product_id=${id}`);

    Promise.all([productGet, stylesGet, reviewsGet]).then((results) => {
      setProduct(results[0].data);
      setStyles(results[1].data);
      setReviews(results[2].data);
      setCurrentStyle(results[1].data.results[0]);
    }) .catch((err) => console.log(err));
  }, [id]);

  return (
    <Container >
      <TopCtn>
        {currentStyle && (
          <Gallery
            product={product}
            styles={styles}
            currentStyle={currentStyle}
            expandedView={expandedView}
            setExpandedView={setExpandedView}
          />
        )}
        {(currentStyle && !expandedView) && (
          <ProductInfo
            product={product}
            styles={styles}
            reviews={reviews}
            currentStyle={currentStyle}
            setStyle={setCurrentStyle}
            reviewsRef={props.reviewsRef}
          />
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
