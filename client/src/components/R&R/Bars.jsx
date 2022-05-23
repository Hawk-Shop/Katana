import React from 'react';

// parameter = ratings object
const Bars = ({ratings}) => {
  let five = Number(ratings[5]);
  let four = Number(ratings[4]);
  let three = Number(ratings[3]);
  let two = Number(ratings[2]);
  let one = Number(ratings[2]);

  let total = five+four+three+two+one;
  let onestar = one/total;
  let twostar = two/total;
  let threestar = three/total;
  let fourstar = four/total;
  let fivestar = five/total;

  return (
    <div>
      5 stars
      <div className="bars" style={{ "--rating": fivestar}}></div><br></br>
      4 stars
      <div className="bars" style={{ "--rating": fourstar}}></div><br></br>
      3 stars
      <div className="bars" style={{ "--rating": threestar}}></div><br></br>
      2 stars
      <div className="bars" style={{ "--rating": twostar}}></div><br></br>
      1 star &nbsp;
      <div className="bars" style={{ "--rating": onestar}}></div>
    </div>
  )
}

export default Bars;