import { useState, useEffect, useContext } from "react";
import { Context } from "../util/context.js";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import ThumbGall from "./ThumbGall.jsx";
import IconGall from "./IconGall.jsx";

const Image = styled.div`
  height: 100%;
  width: 100%;
  background-position: 50% 20%;
  background-repeat: no-repeat;
  background-size: auto 100%;
  display: flex;
  &.zoomed {
    transform: scale(5);
    height: 50%;
    position: relative;
  }
`;

const ImageCtn = styled.div`
  width: 100%;
  height: 55vh;
  background-color: rgb(0, 0, 0, 0.3);
  margin-right: 8%;
  &.zoomed {
    background-color: transparent;
    width: 85%;
  }

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
  &.crosshair {
    cursor: crosshair;
  }
  &.zoom {
    cursor: zoom-in;
  }
  &.zoomed {
    overflow: hidden;
  }
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
  &.zoomed {
    overflow: hidden;
  }
`;

// const Thumbgall = styled.div`
//   width: 10%;
// `;

const Gallery = (props) => {
  const [currImg, setCurrImg] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const expanded = props.expandedView ? "full" : "regular";
  const zoomOverflow = isZoomed ? "zoomed" : "nothing";
  const cursor = props.expandedView ? "crosshair" : "zoom";
  console.log(expanded);

  const handleMouse = (e) => {
    setX(500 - e.clientX)
    setY(500 - e.clientY)
    console.log(window.innerWidth, e.clientX)
  }

  return (
    <GallFlex className={[expanded, zoomOverflow].join(" ")}>
      {!props.expandedView && (
        <ThumbGall
          currImg={currImg}
          setCurrImg={setCurrImg}
          photos={props.currentStyle.photos}
        />
      )}
      {props.currentStyle.photos[currImg].url && (
        <ImageCtn className={zoomOverflow}>
          <Image
            style={
              isZoomed
                ? {
                    backgroundImage: `url(${props.currentStyle.photos[currImg].url})`,
                    left: `${x}px`,
                    top: `${y}px`,
                  }
                : {
                    backgroundImage: `url(${props.currentStyle.photos[currImg].url})`,
                  }
            }
            className={zoomOverflow}
          >
            <LeftRight
              onClick={() => {
                currImg > 0 && setCurrImg(currImg - 1);
              }}
            >
              {currImg !== 0 && <Arrow icon={faArrowLeft} />}
            </LeftRight>
            {props.expandedView ? (
              <Center
                onClick={() => setIsZoomed(!isZoomed)}
                className={[cursor, zoomOverflow].join(' ')}
                onMouseMove={handleMouse}
              ></Center>
            ) : (
              <Center
                onClick={() => props.setExpandedView(!props.expandedView)}
                className={cursor}
              ></Center>
            )}

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
          {(props.expandedView && !isZoomed) && (
            <IconGall
              currImg={currImg}
              setCurrImg={setCurrImg}
              photos={props.currentStyle.photos}
            />
          )}
        </ImageCtn>
      )}
    </GallFlex>
  );
};

export default Gallery;
