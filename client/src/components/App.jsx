import { useState, useEffect } from "react";
import Reviews from "./Reviews.jsx";
import { Context } from "./util/context.js";
import Overview from "./overview/Overview.jsx";

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
        <h1>Questions and Answers</h1>
      </div>
      <div>
        <Context.Provider value={{ id: id }}>
          <h1>Ratings and Reviews</h1>
          <Reviews></Reviews>
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
