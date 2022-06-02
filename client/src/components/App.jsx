import React, { useState, useEffect, useRef, Suspense } from "react";
import styled from "styled-components";

import { useDarkMode } from "./DarkMode/UseDarkMode.jsx";
import { lightTheme, darkTheme } from "./DarkMode/Themes.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
  faShirt,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import HomePage from "./HomePage.jsx";
import CartModal from "./CartModal.jsx";
import Product from "./Product.jsx";

window.React = React;
Window.sessionStorage = { cart: [], qty: 0 };

const HeaderStyle = styled.header`
  max-width: 100%;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 98%;
	float: left;
  top: 0;
  left: 0;
  padding: 0 1em;
	border-bottom: 1px solid #ccc;
  z-index: 1;
  position: fixed;
  height: 4em;
`;

const List = styled.ul`
  display: flex;
  list-style: none;
  width: 20%;
  justify-content: flex-end;
`;

const ListItem = styled.li`
  margin: 3%;
  cursor: pointer;
`;

const CartNum = styled.span`
  font-size: 0.7rem;
  position: relative;
  bottom: 15px;
  font-weight: bold;
`;

const TopDiv = styled.div`
height: 5em;
width: 100%;
`;

const FontIcon = styled(FontAwesomeIcon)``;

const App = (props) => {
  const [theme, themeToggler] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  const [view, setView] = useState({ name: "Home", viewProps: {} });
  const [cartQty, setCartQty] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartModal, setCartModal] = useState(false);

  const reviewsRef = useRef();
  const scrollRef = useRef();

  const [id, setId] = useState(40344);

  const changeView = (name, someProps = {}) => {
    return (moreProps = {}) => {
      setView({ name, viewProps: { ...someProps, ...moreProps } });
    };
  };

  useEffect(() => {
    renderView();
  }, [view]);

  const renderView = () => {
    switch (view.name) {
      case "Product":
        return (
          <Product
            themeMode={themeMode}
            theme={theme}
            themeToggler={themeToggler}
            cart={cart}
            setCart={setCart}
            cartQty={cartQty}
            setCartQty={setCartQty}
            reviewsRef={reviewsRef}
            id={id}
            setId={setId}
            scrollRef={scrollRef}
          />
        );

      case "Home":
        return (
          <HomePage
            changeView={changeView}
            setId={setId}
            themeMode={themeMode}
            theme={theme}
            themeToggler={themeToggler}
          />
        );

      case "Cart":
        return <Cart />;
    }
  };

  return (
    <>
      <HeaderStyle>
        <NavBar style={{backgroundColor: `${theme === 'light' ? "#edf1f7" : "#3c3d40"}`}}>
          <h1
            onClick={() => changeView("Home")()}
            style={{ cursor: "pointer" }}
          >
            <FontIcon icon={faHouse} />
            &nbsp; Hawk Shop{" "}
          </h1>
          <List>
            <ListItem>
              {" "}
              <FontIcon
                onClick={changeView("Product")}
                icon={faShirt}
                size="lg"
              />{" "}
            </ListItem>
            <ListItem>
              {" "}
              <FontIcon icon={faUser} size="lg" />{" "}
            </ListItem>

            <ListItem onClick={() => setCartModal(!cartModal)}>
              {" "}
              <FontIcon icon={faCartShopping} size="lg" />
              <CartNum>{cartQty}</CartNum>
            </ListItem>
          </List>
          {cartModal && (
            <CartModal
              setCart={setCart}
              cart={cart}
              setCartModal={setCartModal}
              cartQty={cartQty}
              setCartQty={setCartQty}
              theme={theme}
            />
          )}
        </NavBar>
      </HeaderStyle>
      <main>
        <Suspense fallback={<p>Loading...</p>}>{renderView()}</Suspense>
      </main>
    </>
  );
};

export default App;
