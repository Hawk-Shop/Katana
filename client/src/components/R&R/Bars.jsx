import { useContext, useState } from 'react';
import styled from 'styled-components';
import { Context } from '../util/context.js';
import axios from 'axios';

// parameter = ratings object
const Bars = ({ getRelevant, reviews, setReviews, ratings}) => {
  const id = useContext(Context).id;
  const [filters, setFilters] = useState({});

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

  let all = [
    {rating: 5, count: five, percent: fivestar},
    {rating: 4, count: four, percent: fourstar},
    {rating: 3, count: three, percent: threestar},
    {rating: 2, count: two, percent: twostar},
    {rating: 1, count: one, percent: onestar}
  ];

  const Breakdown = styled.div`
  cursor: pointer;
  &:hover{
    background-color: grey;
  }
  `;

  const Button = styled.button`
  background-color: transparent;
  border: none;
  text-decoration: underline;
  cursor: pointer;
  `;

  const renderByStars = (rating) => {
    if (filters[rating]) {
      delete filters[rating];
    } else {
      filters[rating] = 1;
    }
    setFilters(filters);

    if (Object.keys(filters).length === 0) {
      getRelevant();
    } else {
      let filtered = reviews.filter((each) => (filters[each.rating]));

      setReviews(filtered);
    }
  }

  return (
    <div>
      {all.map((each) => {
        if (filters[each.rating]) {
          var style = {'background-color': 'blue'}
        } else {
          var style = {'background-color': 'pink'}
        }
      return(
        <Breakdown style={style} onClick={() => {renderByStars(each.rating)}}>
          <Button>{each.rating} stars</Button>
          <div className="bars" style={{ "--rating": each.percent}}></div>
          <span>{each.count}</span>
          <br></br>
        </Breakdown>
      )
    })}
    </div>
  )
}

export default Bars;