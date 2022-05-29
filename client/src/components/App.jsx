import React, { useState, useEffect, useRef, Suspense } from "react";
import styled from "styled-components";
import { Context } from "./util/context.js";
import Overview from "./overview/Overview.jsx";
import QuestionsList from "./QA/QuestionsList.jsx";
import ReviewsOverview from "./R&R/Overview.jsx";
import RelatedProducts from "./RelatedItems/Main.jsx";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import HomePage from "./HomePage.jsx";
window.React = React;

const StyledApp = styled.div`
  max-width: 80%;
  margin: 0 auto;
  min-height: 100vh;
`;

const HeaderStyle = styled.header`
  max-width: 80%;
  margin: 0 auto;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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

const FontIcon = styled(FontAwesomeIcon)``;

const App = (props) => {
  const [id, setId] = useState(40344);
  const [productName, setProductName] = useState("");
  const [view, setView] = useState({ name: "Product", viewProps: {} });

  const reviewsRef = useRef();

  axios.get(`/products/${id}`).then((res) => setProductName(res.data.name));

  const changeView = (name, someProps = {}) => {
    return (moreProps = {}) => {
      console.log("Changing view to: " + name);
      setView({ name, viewProps: { ...someProps, ...moreProps } });
    };
  };

  const renderView = () => {
    switch (view.name) {
      case "Product":
        return (
          <StyledApp>
            <div>
              <Context.Provider value={{ id: id }}>
                <Overview reviewsRef={reviewsRef}></Overview>
              </Context.Provider>
            </div>
            <div>
              <Context.Provider value={{ id: id }}>
                <RelatedProducts></RelatedProducts>
              </Context.Provider>
            </div>
            <div>
              <Context.Provider value={{ id: id }}>
                <QuestionsList></QuestionsList>
              </Context.Provider>
            </div>
            <div>
              <Context.Provider value={{ id: id, productName: productName }}>
                <ReviewsOverview reviewsRef={reviewsRef}></ReviewsOverview>
              </Context.Provider>
            </div>
          </StyledApp>
        );
      case "Home":
        return <HomePage />;

      case "Admin":
        return <Admin />;
      default:
        return <FourOhFour />;
    }
  };

  return (
    <>
      <HeaderStyle>
        <NavBar>
          <h1 onClick={changeView("Home")} style={{ cursor: "pointer" }}>
            Hawk Shop{" "}
          </h1>
          <List>
            <ListItem>
              {" "}
              <FontIcon icon={faUser} size="lg" />{" "}
            </ListItem>

            <ListItem>
              {" "}
              <FontIcon icon={faCartShopping} size="lg" />
            </ListItem>
          </List>
        </NavBar>
      </HeaderStyle>
      <main>
        <Suspense fallback={<p>Loading...</p>}>{renderView()}</Suspense>
      </main>
    </>
  );
};

export default App;
