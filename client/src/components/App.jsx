import { useState, useEffect } from "react";
import Reviews from "./R&R/Reviews.jsx";
import { Context } from './util/context.js';
import QuestionsList from "./QA/QuestionsList.jsx";
import RelatedProducts from './RelatedItems/Main.jsx';

const App = (props) => {
  const [id, setId] = useState('');

  return (
    <div>
      <div>
        <h1>Product Overview</h1>
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
    </div>
  )
}

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