import { useState, useEffect } from "react";
import { Context } from "./util/context.js";
import Overview from "./overview/Overview.jsx";
import QuestionsList from "./QA/QuestionsList.jsx";
import ReviewsOverview from './R&R/Overview.jsx';

const App = (props) => {
  const [id, setId] = useState(40344);

  return (
    <div>
      <div>
        <Context.Provider value={{ id: id }}>
          <h1>Overview</h1>
          <Overview></Overview>
        </Context.Provider>
      </div>
      <div>
        <h1>Related Products</h1>
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
    </div>
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
