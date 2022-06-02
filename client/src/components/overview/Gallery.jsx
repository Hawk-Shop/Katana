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
  background-image: ${(props) => `url("${props.background}")`};
  &.zoomed {
    transform: scale(2.5);
    height: 100%;
    width: 100%;
    // position: relative;
    background-size: contain;
    background-position: center;
    transform-origin: ${(props) => `${props.xAxis}px ${props.yAxis}px`};
  }
`;

const ZoomedImg = styled.img`
  height: 100%;
  width: 100%;
  background-position: 50% 20%;
  background-repeat: no-repeat;
  background-size: auto 100%;
  display: flex;

  &.zoomed {
    transform: scale(2);
    height: 100%;
    width: 100%;
    // position: relative;
    background-size: cover;
    background-position: center;
    transform-origin: ${(props) => `${props.xAxis}px ${props.yAxis}px`};
    &.zoomOut {
      cursor: zoom-out;
    }
  }
`;

const ImageCtn = styled.div`
  width: 100%;
  height: 55vh;
  background-color: rgb(0, 0, 0, 0.3);

  margin-right: 8%;
  &.zoomed {
    background-color: transparent;
    overflow: hidden;
    width: 50%;
    height: 80vh;
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
  &.zoomOut {
    cursor: zoom-out;
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
    width: 75%;
  }
  &.zoomed {
    overflow: hidden;
    justify-content: center;
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
  let cursor = props.expandedView ? "crosshair" : "zoom";

  if (isZoomed) {
    cursor = "zoomOut";
  }
  const handleMouse = (e) => {
    setX(e.clientX - e.target.offsetLeft);
    setY(e.clientY - e.target.offsetTop);
  };
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
          {isZoomed && (
            <ZoomedImg
              src={props.currentStyle.photos[currImg].url}
              xAxis={x}
              yAxis={y}
              onClick={() => setIsZoomed(!isZoomed)}
              className={[cursor, zoomOverflow].join(" ")}
              onMouseMove={handleMouse}
            ></ZoomedImg>
          )}
          {!isZoomed && (
            <Image
              xAxis={x}
              yAxis={y}
              background={props.currentStyle.photos[currImg].url}
              className={zoomOverflow}
            >
              {!isZoomed && (
                <LeftRight
                  onClick={() => {
                    currImg > 0 && setCurrImg(currImg - 1);
                  }}
                >
                  {currImg !== 0 && <Arrow icon={faArrowLeft} />}
                </LeftRight>
              )}
              {props.expandedView ? (
                <Center
                  onClick={() => setIsZoomed(!isZoomed)}
                  className={[cursor, zoomOverflow].join(" ")}
                  onMouseMove={handleMouse}
                ></Center>
              ) : (
                <Center
                  onClick={() => props.setExpandedView(!props.expandedView)}
                  className={cursor}
                ></Center>
              )}
              {!isZoomed && (
                <Expand
                  icon={faExpand}
                  onClick={() => props.setExpandedView(!props.expandedView)}
                />
              )}
              {!isZoomed && (
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
              )}
            </Image>
          )}
          {props.expandedView && !isZoomed && (
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
