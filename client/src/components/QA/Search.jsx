import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';

// const Search = styled.div`
//   font-size: 16px;
//   width: 50%;
//   padding: 6px 10px;
//   margin: 8px 0;
//   display: inline-block;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   box-sizing: border-box;
// `;

const Search = ({questions, searched, setSearched}) => {
  const id = useContext(Context).id;
  const [searchInput, setSearchInput] = useState('')


  let handleSearch = () => {
    console.log('search for :', searchInput);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value)
  }

  return (
    <div>
      <input
        type="text"
        placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
        value={searchInput}
        size='70'
        onChange={e => handleSearch}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default Search;