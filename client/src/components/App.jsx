import { useState, useEffect } from "react";
import styled from 'styled-components';
import { Context } from "./util/context.js";
import Overview from "./overview/Overview.jsx";
import QuestionsList from "./QA/QuestionsList.jsx";
import ReviewsOverview from './R&R/Overview.jsx';
import RelatedProducts from './RelatedItems/Main.jsx';
import axios from 'axios';

const StyledApp = styled.div`
  max-width: 80%;
  margin: 0 auto;
  min-height: 100vh;
`

const App = (props) => {
  const [id, setId] = useState(40344);
  const [productName, setProductName] = useState('');

  axios.get(`/products/${id}`)
  .then((res) => setProductName(res.data.name));

  return (
    <StyledApp>
      <div>
        <Context.Provider value={{ id: id }}>
          <h1>Overview</h1>
          <Overview></Overview>
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
          <ReviewsOverview></ReviewsOverview>
        </Context.Provider>
      </div>
    </StyledApp>
  );
};

export default App;