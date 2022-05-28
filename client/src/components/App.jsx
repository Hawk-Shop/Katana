import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
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

window.React = React

const StyledApp = styled.div`
  max-width: 80%;
  margin: 0 auto;
  min-height: 100vh;
`

const App = (props) => {
  const [id, setId] = useState(40344);
  const [productName, setProductName] = useState('');
  const [theme, themeToggler] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;


  const reviewsRef = useRef();

  axios.get(`/products/${id}`)
  .then((res) => setProductName(res.data.name));

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles/>
      <StyledApp>
        <Toggle theme={theme} toggleTheme={themeToggler} />
        <div>
          <Context.Provider value={{ id: id }}>
            <h1>Overview</h1>
            <Overview reviewsRef={reviewsRef}></Overview>
          </Context.Provider>
        </div>
        <div>
          <Context.Provider value={{id: id}}>
            <RelatedProducts></RelatedProducts>
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
};

export default App;