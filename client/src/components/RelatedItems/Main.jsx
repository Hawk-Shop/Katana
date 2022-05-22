import { useState, useEffect, useContext } from 'react';
import { Context } from '../util/context.js';
// import styled from 'styled-components';
import ProductsList from './ProductsList.jsx';
// import OutfitList from './OutfitList.jsx';

const RelatedProducts = (props) => {
  const id = useContext(Context).id;
  // GET/products/:product_id/related
  // returns related: [40345, 40346, 40351, 40350]
  // GET request each to get product info
  // promise all to wrap
  const [list, setList] = useState([
    {
      "id": 40345,
      "campus": "hr-rfp",
      "name": "Bright Future Sunglasses",
      "slogan": "You've got to wear shades",
      "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
      "category": "Accessories",
      "default_price": "69.00"
    },
    {
      "id": 40346,
      "campus": "hr-rfp",
      "name": "Morning Joggers",
      "slogan": "Make yourself a morning person",
      "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
      "category": "Pants",
      "default_price": "40.00"
    },
    {
      "id": 40351,
      "campus": "hr-rfp",
      "name": "YEasy 350",
      "slogan": "Just jumped over jumpman",
      "description": "These stretchy knit shoes show off asymmetrical lacing and a big sculpted rubber midsole. In a nod to adidas soccer heritage.",
      "category": "Kicks",
      "default_price": "450.00"
    },
    {
      "id": 40350,
      "campus": "hr-rfp",
      "name": "Blues Suede Shoes",
      "slogan": "2019 Stanley Cup Limited Edition",
      "description": "Touch down in the land of the Delta Blues in the middle of the pouring rain",
      "category": "Dress Shoes",
      "default_price": "120.00"
    },
    {
      "id": 40328,
      "campus": "hr-rfp",
      "name": "Cookies N Cream Pants",
      "slogan": "You've got to wear shades",
      "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
      "category": "Accessories",
      "default_price": "69.00"
    },
    {
      "id": 40323,
      "campus": "hr-rfp",
      "name": "Cinnamon Slippers",
      "slogan": "Make yourself a morning person",
      "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
      "category": "Pants",
      "default_price": "40.00"
    },
    {
      "id": 40378,
      "campus": "hr-rfp",
      "name": "Nutella Sneakers",
      "slogan": "Just jumped over jumpman",
      "description": "These stretchy knit shoes show off asymmetrical lacing and a big sculpted rubber midsole. In a nod to adidas soccer heritage.",
      "category": "Kicks",
      "default_price": "450.00"
    },
    {
      "id": 40369,
      "campus": "hr-rfp",
      "name": "Peanut Butter Shoes",
      "slogan": "2019 Stanley Cup Limited Edition",
      "description": "Touch down in the land of the Delta Blues in the middle of the pouring rain",
      "category": "Dress Shoes",
      "default_price": "120.00"
    }
  ])

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