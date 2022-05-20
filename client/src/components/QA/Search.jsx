import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';

const QuestionsList = (props) => {
  const id = useContext(Context).id;
  const [searchInput, setSearchInput] = useState('')

  // const Search = styled.input`
  //   font-size: 16px;
  //   width: 50%;
  //   padding: 6px 10px;
  //   margin: 8px 0;
  //   display: inline-block;
  //   border: 1px solid #ccc;
  //   border-radius: 4px;
  //   box-sizing: border-box;
  // `;

  let handleSearch = () => {
    console.log('search for :', searchInput);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
        value={searchInput}
        size='50'
        onChange={(e) => {setSearchInput(e.target.value)}}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default QuestionsList;