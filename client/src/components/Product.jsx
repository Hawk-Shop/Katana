import { useState } from "react";
import styled from "styled-components";
import { Context } from "./util/context.js";
import Overview from "./overview/Overview.jsx";
import QuestionsList from "./QA/QuestionsList.jsx";
import ReviewsOverview from './R&R/Overview.jsx';
import RelatedProducts from './RelatedItems/Main.jsx';
import axios from 'axios';

import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./DarkMode/GlobalStyles.jsx";
import Toggle from "./DarkMode/Toggler.jsx";


const StyledApp = styled.div`
  max-width: 80%;
  margin: 0 auto;
  min-height: 100vh;
`;

const TopDiv = styled.div`
height: 4em;
width: 100%;
`;

const Product= ({id, setId, themeMode, themeToggler, theme , cart, setCart, cartQty, setCartQty, reviewsRef, scrollRef}) => {

  const [productName, setProductName] = useState('');

  axios
  .get(`/products/${id}`)
  .then((res) => setProductName(res.data.name))
  .catch((err) => console.log(err));

return (
  <ThemeProvider theme={themeMode}>
    <GlobalStyles/>
    <TopDiv ref={scrollRef}></TopDiv>
    <StyledApp>
      <Toggle theme={theme} toggleTheme={themeToggler} />
      <div>
        <Context.Provider value={{ id: id, cart, setCart, cartQty, setCartQty }}>
          <Overview reviewsRef={reviewsRef} scrollRef={scrollRef}></Overview>
        </Context.Provider>
      </div>
      <div>
        <Context.Provider value={{id: id, setId}}>
          <RelatedProducts scrollRef={scrollRef} ></RelatedProducts>
        </Context.Provider>
      </div>
      <div>
        <Context.Provider value={{id: id}}>
          <QuestionsList productName={productName}></QuestionsList>
        </Context.Provider>
      </div>
      <div>
        <Context.Provider value={{id: id, productName: productName}}>
          <ReviewsOverview reviewsRef={reviewsRef}></ReviewsOverview>
        </Context.Provider>
      </div>
    </StyledApp>
  </ThemeProvider>
);
}

export default Product;