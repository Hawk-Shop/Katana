import { useState, useEffect } from "react";
import styled from 'styled-components';
import { Context } from "./util/context.js";
import Overview from "./overview/Overview.jsx";
import QuestionsList from "./QA/QuestionsList.jsx";
import ReviewsOverview from './R&R/Overview.jsx';
import RelatedProducts from './RelatedItems/Main.jsx';

const StyledApp = styled.div`
  max-width: 80%;
  margin: 0 auto;
<<<<<<< HEAD
`;
=======
  min-height: 100vh;
`
>>>>>>> master

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
          <ReviewsOverview></ReviewsOverview>
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