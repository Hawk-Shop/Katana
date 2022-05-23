import { useState, useEffect } from "react";
import styled from 'styled-components';
import { Context } from "./util/context.js";
import Overview from "./overview/Overview.jsx";
import Reviews from "./R&R/Reviews.jsx";
import QuestionsList from "./QA/QuestionsList.jsx";
import RelatedProducts from './RelatedItems/Main.jsx';

const StyledApp = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const App = (props) => {
  const [id, setId] = useState(40344);

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
        <Context.Provider value={{id: id}}>
          <Reviews></Reviews>
        </Context.Provider>
      </div>
    </StyledApp>
  );
};

export default App;

// class App extends React.Component {
//   constructor(props) {
//     super(props)
//   }

//   render() {
//     return (
//       <Reviews></Reviews>
//     )
//   }
// }

// export default App;
``