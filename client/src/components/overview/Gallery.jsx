import { useState, useEffect, useContext } from "react";
import { Context } from "../util/context.js";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import ThumbGall from "./ThumbGall.jsx";

const Image = styled.div`
  height: 100%;
  width: 100%;
  background-position: 50% 20%;
  background-repeat: no-repeat;
  background-size: auto 100%;
  display: flex;
`;

const ImageCtn = styled.div`
  width: 100%;
  height: 55vh;
  background-color: rgb(0, 0, 0, 0.3);
  margin-right: 8%;
`;

const LeftRight = styled.div`
  flex: 4%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.2);
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
const Expand = styled(FontAwesomeIcon)`
  position: relative;
  top: 1%;
  right: 1%;
  color: white;
  cursor: pointer;
`;

const GallFlex = styled.div`
  display: flex;
  align-items: flex-start;
  &.full {
    width: 100%;
  }
  &.regular {
    width: 70%;
  }
`;

// const Thumbgall = styled.div`
//   width: 10%;
// `;

const Gallery = (props) => {
  const [currImg, setCurrImg] = useState(0);

  const changeWidth = props.expandedView ? "full" : "regular";
  console.log(changeWidth);

  return (
    <GallFlex className={changeWidth}>
      <ThumbGall
        currImg={currImg}
        setCurrImg={setCurrImg}
        photos={props.currentStyle.photos}
      />
      {props.currentStyle.photos[currImg].url && (
        <ImageCtn>
          <Image
            style={{
              backgroundImage: `url(${props.currentStyle.photos[currImg].url})`,
            }}
          >
            <LeftRight
              onClick={() => {
                currImg > 0 && setCurrImg(currImg - 1);
              }}
            >
              {currImg !== 0 && <Arrow icon={faArrowLeft} />}
            </LeftRight>
            <Center></Center>
            <Expand
              icon={faExpand}
              onClick={() => props.setExpandedView(!props.expandedView)}
            />
            <LeftRight
              onClick={() => {
                currImg < props.currentStyle.photos.length - 1 &&
                  setCurrImg(currImg + 1);
              }}
            >
              {currImg !== props.currentStyle.photos.length - 1 && (
                <Arrow icon={faArrowRight} />
              )}
            </LeftRight>
          </Image>
        </ImageCtn>
      )}
    </GallFlex>
  );
};

export default Gallery;
