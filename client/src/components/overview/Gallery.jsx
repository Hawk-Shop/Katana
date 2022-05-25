import { useState, useEffect, useContext } from "react";
import { Context } from "../util/context.js";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ThumbGall from './ThumbGall.jsx'

const Image = styled.div`
  height: 100%;
  width: 100%;
  background-position: 50% 20%;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
`;

const ImageCtn = styled.div`
  width: 100%;
  height: 85vh;
  background-color: black;
  margin-right: 8%;
`;

const LeftRight = styled.div`
  flex: 4%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.6);
  display: grid;
  place-items: center;
  color: white;
  cursor: pointer;
`;

const Center = styled.div`
  flex: 90%;
  height: 100%;
  background-color: transparent;
`;

const Arrow = styled(FontAwesomeIcon)`
  background-color: transparent;
`;

const GallFlex = styled.div`
  display: flex;
  align-items: flex-start;
  width: 60%;
`;

// const Thumbgall = styled.div`
//   width: 10%;
// `;

const Gallery = (props) => {
  const [currImg, setCurrImg] = useState(0);

  return (
    <GallFlex>
    <ThumbGall currImg={currImg} setCurrImg={setCurrImg} photos={props.currentStyle.photos}/>
    <ImageCtn>
      <Image
        style={{ backgroundImage: `url(${props.currentStyle.photos[currImg].url})` }}
      >
        <LeftRight
          onClick={() => {
            currImg > 0 && setCurrImg(currImg - 1);
          }}
        >
        {currImg !== 0 && <Arrow icon={faArrowLeft} />}

        </LeftRight>
        <Center></Center>
        <LeftRight
          onClick={() => {
            currImg < props.currentStyle.photos.length - 1 && setCurrImg(currImg + 1);
          }}
        >
        {currImg !== props.currentStyle.photos.length - 1 && <Arrow icon={faArrowRight} />}
        </LeftRight>
      </Image>
    </ImageCtn>
    </GallFlex>
  );
};

export default Gallery;
