import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
// import styled from 'styled-components';
import ProductsList from './ProductsList.jsx';
// import OutfitList from './OutfitList.jsx';
import axios from 'axios';
import Modal from './Comparison.jsx';



const RelatedProducts = (props) => {
  const id = useContext(Context).id;
  const [show, setShow] = useState(false);
  const [reference, setRef] = useState('');
  const [list, setList] = useState('');
  const [mainProduct, setMain] = useState('');
  // const [demo, setDemo] = useState('');

  useEffect(() => {
    axios.get(`/products/${id}/related`)
      .then((related) => {

        let endpoints = [];
        for (var i = 0; i < related.data.length; i++) {
          let currentID = related.data[i];
          let currentProduct = axios.get(`/products/${currentID}`);
          let currentStyle = axios.get(`/products/${currentID}/styles`);
          let currentReview = axios.get(`/reviews/meta/?product_id=${currentID}`);
          endpoints.push(currentProduct, currentStyle, currentReview);
        }
        return Promise.all(endpoints)
      })
      .then((result) => {
        // console.log("WHATS DATA", result)
        let PRODUCT_ENDPOINT_COUNT = 3;
        let products = [];
        // let products = {};
        for (let i = 0; i < result.length; i++) {
          // let productID = `${result[i].data.id || result[i].data.product_id}`;
          let order = Math.floor(i / PRODUCT_ENDPOINT_COUNT);
          products[order] = {...products[order], ...result[i].data}
          // products[productID] = {...products[productID], ...result[i].data, order}
        }
        // console.log("PRODUCTS", products);
        setList(products);
        // setDemo(products);
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log("WHATS IN HEREEEEEE", list)
  // console.log("WHATS IN HEREEEEEE", list[0])
  // console.log("WHATS IN HEREEEEEE", demo)
  // console.log("WHATS IN HEREEEEEE", demo[0])

  return(
    <div>
      <h3>Related Products</h3>
      <ProductsList list={list} show={show} setShow={setShow} setRef={setRef}/>
      <h3>Your Outfit</h3>
      {/* <OutfitList /> */}
      <Modal
      onClose={() => setShow(false)}
      show={show}
      reference={reference}
      setMain={setMain}
      mainProduct={mainProduct}
      />
    </div>

  )
}

export default RelatedProducts;

// HIGH LEVEL PLANNING FOR OUTFIT LIST
// if product data avail then onclick of button store data in broswer local storage
// let favProducts = [], onclick push data to array

// else, on click of button fetch data and store in browser local storage

// look up local storage and session storage

//******************* */

// OLD AXIOS CALLS
// console.log("RELATED PRODUCT IDS:", related.data)
// for (var i = 0; i < related.data.length; i++) {
//   let currentID = related.data[i];
//   let currentProduct = axios.get(`/products/${currentID}`);
//   let currentStyle = axios.get(`/products/${currentID}/styles`);
//   let currentReview = axios.get(`/reviews/meta/?product_id=${currentID}`);

//   Promise.all([currentProduct, currentStyle, currentReview])
//     .then((res) => {
//       console.log("API RESULT", res)
//       setProduct(res[0].data);
//       setStyles(res[1].data);
//       setReviews(res[2].data);
//       storage.push(res.map((each) => each.data)) ;
//       console.log("for loop storage:", storage);
//     })
//     .catch((err) => console.log(err));
// }

// if list[0] is not null then consolelog list[0].id

// guard statement
// if list[0] is null, return
//another line console.log list[0].id