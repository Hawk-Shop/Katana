import axios from 'axios';
import {useEffect, useState} from 'react';
import charLegend from './Legends/Characteristics.jsx';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const BreakdownBars = styled.div`
width: 100%;
-webkit-text-fill-color: transparent;
display: flex;
justify-content: space-between;
`;

const SingleBar = styled.div`
border-radius: 10px 15px 15px 10px;
background-color: lightgrey;
width: 32%;
font-size: .8em;
line-height: 1;
height: .6em;
`;

const Spectrum = styled.div`
display: inline-block;
width: 100%;
position: relative;
`;

const Low = styled.div`
width: 40%;
float: left;
font-size: .8em;
`;

const High = styled.div`
width: 40%;
float: right;
text-align: right;
font-size: .8em;
`;

const Block = styled.div`
padding: .5em 0;
`;

const Container = styled.div`
padding: 2em 0;
`;

const Triangle = styled.div`
width: 15px;
height: 15px;
font-size: 1.4em;
background: transparent;
position:absolute;
top: -180%;
transform: translateY(50%);
color: grey;
`;

const ProductBreakdown = ({id}) => {
  const [chars, setChars] = useState({});

  useEffect(() => {
    axios.get(`/reviews/meta/?product_id=${id}`)
    .then((results) => {
      let charObject = results.data.characteristics;
      setChars(charObject);
    })
    .catch((err) => console.log('err', err))
  }, []);

  return (
    <Container>
      {Object.keys(chars).map((objectKey, index) => {
        let percent = (Math.round(100 -((chars[objectKey].value / 5) * 100))).toString() + '%';
        return (<Block key={index}>
          {objectKey}
          <BreakdownBars>
            <SingleBar>placeholder</SingleBar>
            <SingleBar>placeholder</SingleBar>
            <SingleBar>placeholder</SingleBar>
          </BreakdownBars>
          <Spectrum>
            <Triangle style={{right: `${percent}`}}><FontAwesomeIcon icon={faCaretDown}/></Triangle>
            <Low>{charLegend[objectKey][1]}</Low>
            <High>{charLegend[objectKey][5]}</High>
          </Spectrum>
        </Block>)
      })}
    </Container>
  )
}


export default ProductBreakdown;