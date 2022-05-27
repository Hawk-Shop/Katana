import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
// import styled from 'styled-components';
import ProductsList from './ProductsList.jsx';
// import OutfitList from './OutfitList.jsx';
import axios from 'axios';
import sample from './exampleData.js';

const RelatedProducts = (props) => {
  const id = useContext(Context).id;
  const [product, setProduct] = useState("");
  const [styles, setStyles] = useState("");
  const [reviews, setReviews] = useState("");
  const [demo, setDemo] = useState("");

  let storage = [];

  useEffect(() => {
    axios.get(`/products/${id}/related`)
      .then((related) => {
        console.log("RELATED PRODUCT IDS:", related.data)
        for (var i = 0; i < related.data.length; i++) {
          let currentID = related.data[i];
          let currentProduct = axios.get(`/products/${currentID}`);
          let currentStyle = axios.get(`/products/${currentID}/styles`);
          let currentReview = axios.get(`/reviews/meta/?product_id=${currentID}`);

          Promise.all([currentProduct, currentStyle, currentReview])
            .then((res) => {
              setProduct(res[0].data);
              setStyles(res[1].data);
              setReviews(res[2].data);
              storage.push(res.map((each) => each.data)) ;
              console.log("for loop storage:", storage);
            })
            .catch((err) => console.log(err));
        }
      })
      .then(() => {
        setDemo(storage);
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log("WHATS IN HEREEEEEE", demo)
  console.log("STORAGE OUTSIDE", storage)
  console.log("WHATS IN HEREEEEEE", demo)
  // console.log("WHATS IN HEREEEEEE", demo[0])
  // console.log("WHATS IN HEREEEEEE", demo[0].id)
  // console.log("WHATS IN HEREEEEEE", product.id)







  const [list, setList] = useState([
    {
      "id": 40345,
      "rating": 2,
      "name": "Bright Future Sunglasses",
      "slogan": "You've got to wear shades",
      "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
      "category": "Accessories",
      "default_price": "69.00",
      "thumbnail": "https://images.unsplash.com/photo-1566421966482-ad8076104d8e?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687"
    },
    {
      "id": 40346,
      "rating": 4,
      "name": "Morning Joggers",
      "slogan": "Make yourself a morning person",
      "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
      "category": "Pants",
      "default_price": "40.00",
      "thumbnail": "https://images.unsplash.com/photo-1552902875-9ac1f9fe0c07?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687"
    },
    {
      "id": 40351,
      "rating": 3,
      "name": "YEasy 350",
      "slogan": "Just jumped over jumpman",
      "description": "These stretchy knit shoes show off asymmetrical lacing and a big sculpted rubber midsole. In a nod to adidas soccer heritage.",
      "category": "Kicks",
      "default_price": "450.00",
      "thumbnail": "https://images.unsplash.com/photo-1588499894193-2c4dd05b0f09?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687"
    },
    {
      "id": 40350,
      "rating": 4,
      "name": "Air Force 1",
      "slogan": "2019 Stanley Cup Limited Edition",
      "description": "Touch down in the land of the Delta Blues in the middle of the pouring rain",
      "category": "Kicks",
      "default_price": "120.00",
      "thumbnail": "https://images.unsplash.com/photo-1586525198428-225f6f12cff5?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687"
    },
    {
      "id": 40328,
      "rating": 3,
      "name": "Clubmaster shades",
      "slogan": "You've got to wear shades",
      "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
      "category": "Accessories",
      "default_price": "69.00",
      "thumbnail": "https://images.unsplash.com/photo-1622383659984-03e1c9b75d36?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687"
    },
    {
      "id": 40323,
      "rating": 2,
      "name": "Orange Jogger",
      "slogan": "Make yourself a morning person",
      "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
      "category": "Pants",
      "default_price": "40.00",
      "thumbnail": "https://images.unsplash.com/photo-1637185727896-ee8d5768f0a1?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687"
    },
    {
      "id": 40378,
      "rating": 5,
      "name": "OFF WHITE Nike Air Force 1",
      "slogan": "Just jumped over jumpman",
      "description": "These stretchy knit shoes show off asymmetrical lacing and a big sculpted rubber midsole. In a nod to adidas soccer heritage.",
      "category": "Kicks",
      "default_price": "450.00",
      "thumbnail": "https://images.unsplash.com/photo-1543508282-6319a3e2621f?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687"
    },
    {
      "id": 40369,
      "rating": 2,
      "name": "Leather Shoes",
      "slogan": "2019 Stanley Cup Limited Edition",
      "description": "Touch down in the land of the Delta Blues in the middle of the pouring rain",
      "category": "Dress Shoes",
      "default_price": "120.00",
      "thumbnail": "https://images.unsplash.com/photo-1611937663571-51248fbe6d7a?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687"
    }
  ]);
  return(
    <div>
      <h3>Related Products</h3>
      <ProductsList list={list}/>
      <h3>Your Outfit</h3>
      {/* <OutfitList /> */}
    </div>

  )
}

export default RelatedProducts;