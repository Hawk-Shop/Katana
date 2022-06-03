import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
import styled from 'styled-components';
import ProductsList from './ProductsList.jsx';
import OutfitList from './OutfitList.jsx';
import axios from 'axios';
import Modal from './Comparison.jsx';
import useLocalStorage from './useLocalStorage.js';

const RelatedProducts = ({scrollRef}) => {
  const id = useContext(Context).id;
  const [show, setShow] = useState(false);
  const [reference, setRef] = useState('');
  const [list, setList] = useState('');
  const [mainProduct, setMain] = useState({});
  const [outfit, setOutfit] = useLocalStorage('outfit', [{id: 1, name: "ADD TO YOUR OUTFIT"}])
  const [deleteID, setDelete] = useState(0);

  useEffect(() => {
    // GET MAIN PRODUCT DATA
    let productGet = axios.get(`/products/${id}`);
    let stylesGet = axios.get(`/products/${id}/styles`);
    let reviewsGet = axios.get(`/reviews/meta/?product_id=${id}`);
    let mainEndpoints = [];
    mainEndpoints.push(productGet, stylesGet, reviewsGet)

    Promise.all(mainEndpoints)
      .then((res) => {
        for (let j = 0; j < res.length; j++) {
          setMain((prevState) => ({
            ...prevState, ...res[j].data
          }))
        }
      })
      .catch((err) => console.log(err));

    // GET RELATED PROUDCTS DATA
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
      })
      .catch((err) => console.log(err));

  }, [id]);

  // console.log("WHATS IN MOFO LIST", list)
  // console.log("WHATS IN MAINMOFOPRODUCT", mainProduct.name);
  // console.log("THIS IS PRODUCT ID IN CLICK", deleteID)
  // console.log("THIS IS MAIN ID", id)

  const handleAddClick = (e) => {
    let mainId = mainProduct.id;
    const isExist = outfit.some(({id}) => id === mainId);
    if (!isExist) {
      setOutfit((prevState) => ([
        ...prevState, mainProduct
      ]))
    }
  };

  useEffect(() => {
    let thisID = deleteID;
    const index = outfit.findIndex(({id}) => id === thisID);
    if (index !== -1) {
      setOutfit([
        ...outfit.slice(0, index),
        ...outfit.slice(index + 1)
      ]);
      setDelete(0);
    }
  }, [deleteID])

  // console.log('THIS IS OUTFIT', outfit)

  return(
    <div>
      <h3>Related Products</h3>
      <ProductsList
        list={list}
        show={show}
        setShow={setShow}
        setRef={setRef}
        scrollRef={scrollRef}
      />
      <h3>Your Outfit</h3>
      <OutfitList
        outfit={outfit}
        mainProduct={mainProduct}
        setOutfit={setOutfit}
        handleAddClick={handleAddClick}
        setDelete={setDelete}
        scrollRef={scrollRef}
      />
      <Modal
        onClose={() => setShow(false)}
        show={show}
        reference={reference}
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

// if list[0] is not null then consolelog list[0].id

// guard statement
// if list[0] is null, return
//another line console.log list[0].id

//async data
  // when data exist
  // when data does not exist