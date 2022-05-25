import styled from 'styled-components';

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

  const Count = styled.span`
  font-size: .9em;
  `;
// parameter = ratings object
const Bars = ({ filters, setFilters, ratings}) => {

  let five = Number(ratings[5]);
  let four = Number(ratings[4]);
  let three = Number(ratings[3]);
  let two = Number(ratings[2]);
  let one = Number(ratings[1]);

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

  const renderByStars = (rating) => {
    let newFilters = {...filters}; // makes a copy of the object
    if (newFilters[rating]) {
      delete newFilters[rating];
    } else {
      newFilters[rating] = 1;
    }
    setFilters(newFilters);
  }

  let selected = '';
  Object.keys(filters).forEach((filter) => {
    selected += `${filter} stars, `;
  })

  return (
    <div>
      <div>
        <div style={{margin: " 1em 0", fontSize: "1em"}}>Applied filters: {selected.slice(0, -2)}</div>
        <Button onClick={() => {setFilters({})}}>Remove all filters</Button>
      </div>
      <div>
        {all.map((each) => {
          // if (filters[each.rating]) {
          //   var style = {'background-color': 'blue'}
          // } else {
          //   var style = {'background-color': 'pink'}
          // }
        return(
          <Breakdown onClick={() => {renderByStars(each.rating)}}>
            <Button>{each.rating} stars</Button>
            <div className="bars" style={{ "--rating": each.percent}}></div>
            <Count>{each.count}</Count>
            <br></br>
          </Breakdown>
          )
        })}
      </div>
    </div>
  )
}

export default Bars;