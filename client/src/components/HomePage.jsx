import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./DarkMode/GlobalStyles.jsx";
import Toggle from "./DarkMode/Toggler.jsx";

const Container = styled.div`
display: flex;
flex-wrap: wrap;
flex-direction: row;
justify-content: space-evenly;
align-items: stretch;
gap: 25px 25px;
padding: 1.5em 2em;
flex-grow: 4;
clear: both;
`;

const Product = styled.div`
width: 15em;
height: 20em;
`;

const Image = styled.img`
max-height: 100%;
max-width: 100%;
min-width: 100%;
min-height: 100%;
border-radius: 15px;
cursor: pointer;
&:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  transform: scale(1.05);
}
`;

const ToggleCtn = styled.div`
  max-width: 90%;
`;

const TopDiv = styled.div`
height: 5em;
width: 100%;
`;

const HomePage = ({setId, changeView, themeMode, theme, themeToggler}) => {
  const [products, setProducts] = useState(["40344","40355", "40346", "40347", "40348", "40349", "40350", "40351", "40352", "40353", "40355", "40356", "40357", "40358"]);

  useEffect(() => {
      let productPromises = [];
      products.forEach((productId) => {
        productPromises.push(axios.get(`/products/${productId}/styles`))
      })

      Promise.all(productPromises)
      .then((res) => {

        let finalProducts = res.map(each => ({
          id: each.data.product_id,
          photo: each.data.results[0].photos[0].thumbnail_url
        }));
        setProducts(finalProducts);
      })
      .catch(err => console.log('err', err));
    }, []);

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles/>
      <TopDiv></TopDiv>
      <ToggleCtn>
        <Toggle theme={theme} toggleTheme={themeToggler} />
      </ToggleCtn>
    <Container>
      {products.map((product, index) => {
        return <Product key={index}>
          <Image src={product.photo} onClick={() => {
            setId(product.id);
            changeView("Product")();
          }}/>
        </Product>
      })}
    </Container>
    </ThemeProvider>
  );
};

export default HomePage;
