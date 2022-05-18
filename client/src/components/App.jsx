import { useState, useEffect } from "react";
import Reviews from "./Reviews.jsx";
import { Context } from './util/context.js';

const App = (props) => {
  const [id, setId] = useState('');

  return (
    <div>
      <div>
        <h1>Product Overview</h1>
      </div>
      <div>
        <h1>Related Products</h1>
      </div>
      <div>
        <h1>Questions and Answers</h1>
      </div>
      <div>
        <Context.Provider value={{id: id}}>
          <h1>Ratings and Reviews</h1>
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