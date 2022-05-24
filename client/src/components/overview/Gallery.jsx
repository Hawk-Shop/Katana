import { useState, useEffect, useContext } from "react";
import { Context } from "../util/context.js";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Image = styled.div`
  height: 100%;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
`;

const ImageCtn = styled.div`
  width: 60%;
  min-height: 100%;
  background-color: black;
  margin-right: 5%;
`;

const LeftRight = styled.div`
  flex: 5%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.6);
  display: grid;
  place-items: center;
  color: white;
  cursor: pointer;
`;

const Center = styled.div`
  flex: 80%;
  height: 100%;
  background-color: transparent;
`;

const Arrow = styled(FontAwesomeIcon)`
  background-color: transparent;
`;

const Gallery = (props) => {
  const [currImg, setCurrImg] = useState(0);

  return (
    <ImageCtn>
      <Image
        style={{ backgroundImage: `url(${props.currentStyle.photos[currImg].url})` }}
      >
        <LeftRight
          onClick={() => {
            currImg > 0 && setCurrImg(currImg - 1);
          }}
        >
          <Arrow icon={faArrowLeft} />
        </LeftRight>
        <Center></Center>
        <LeftRight
          onClick={() => {
            currImg < props.currentStyle.photos.length - 1 && setCurrImg(currImg + 1);
          }}
        >
          <Arrow icon={faArrowRight} />
        </LeftRight>
      </Image>
    </ImageCtn>
  );
};

export default Gallery;
