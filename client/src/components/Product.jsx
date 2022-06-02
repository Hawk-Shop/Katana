import React, { useState, useEffect, useRef, Suspense } from "react";
import styled from "styled-components";
import { Context } from "./util/context.js";
import Overview from "./overview/Overview.jsx";
import QuestionsList from "./QA/QuestionsList.jsx";
import ReviewsOverview from './R&R/Overview.jsx';
import RelatedProducts from './RelatedItems/Main.jsx';
import axios from 'axios';

import {ThemeProvider} from "styled-components";
import {useDarkMode} from "./DarkMode/UseDarkMode.jsx"
import { GlobalStyles } from "./DarkMode/GlobalStyles.jsx";
import { lightTheme, darkTheme } from "./DarkMode/Themes.jsx";
import Toggle from "./DarkMode/Toggler.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import HomePage from "./HomePage.jsx";

const StyledApp = styled.div`
  max-width: 80%;
  margin: 0 auto;
  min-height: 100vh;
`;

const HeaderStyle = styled.header`
  max-width: 80%;
  margin: 0 auto;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const List = styled.ul`
  display: flex;
  list-style: none;
  width: 20%;
  justify-content: flex-end;
`;

const ListItem = styled.li`
  margin: 3%;
  cursor: pointer;
`;

const CartNum = styled.span`
  font-size: 0.7rem;
  position: relative;
  bottom: 15px;
  font-weight: bold;
`;

const FontIcon = styled(FontAwesomeIcon)``;



const Product= ({themeMode, themeToggler, theme , cart, setCart, cartQty, setCartQty, reviewsRef, scrollRef}) => {

  const [id, setId] = useState(40344);
  const [productName, setProductName] = useState('');


  axios
  .get(`/products/${id}`)
  .then((res) => setProductName(res.data.name))
  .catch((err) => console.log(err));


return (
  <ThemeProvider theme={themeMode}>
    <GlobalStyles/>
    <StyledApp>
      <Toggle theme={theme} toggleTheme={themeToggler} />
      <div>
        <Context.Provider value={{ id: id, cart, setCart, cartQty, setCartQty }}>
          <h1>Overview</h1>
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
          <QuestionsList></QuestionsList>
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