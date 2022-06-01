import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';

const Container = styled.div`
display: flex;
flex-wrap: wrap;
flex-direction: row;
justify-content: space-evenly;
align-items: stretch;
gap: 25px 25px;
padding: 3em 2em;
`;

const Product = styled.div`
width: 15em;
height: 20em;
&:hover {
  width: 16em;
  height: 21em;
}
`;

const Image = styled.img`
max-height: 100%;
max-width: 100%;
min-width: 100%;
min-height: 100%;
border-radius: 15px;
cursor: pointer;
`;

const HomePage = ({setId, changeView}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/products/?page=1&count=10')
    .then((res) => {
      let productPromises = [];
      res.data.forEach(product => {
        productPromises.push(axios.get(`/products/${product.id}/styles`));
      });

      Promise.all(productPromises)
      .then((res) => {

        let finalProducts = res.map(each => ({
          id: each.data.product_id,
          photo: each.data.results[0].photos[0].thumbnail_url
        }));
        setProducts(finalProducts);
      })
    .catch(err => console.log('err', err));
    });
  }, [])

  return (
    <Container>
      {products.map((product, index) => {
        return <Product key={index}>
          {/* <div>Id: {product.id}</div> */}
          <Image src={product.photo} onClick={() => {
            setId(product.id);
            changeView("Product");
          }}/>
        </Product>
      })}
    </Container>
  );
};

export default HomePage;
