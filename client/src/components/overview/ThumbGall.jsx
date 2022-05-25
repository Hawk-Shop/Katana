import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

const Contain = styled.div`
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  margin-right: 5%;
  width: 8%;
  grid-gap: 5%;
  justify-items: stretch;
`;

const ImgContain = styled.div`
  max-height: 5vh;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;

`;

const ThumbnailPrime = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 2px solid grey;
`;
const Arrow = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const NoArrow = styled(FontAwesomeIcon)`
  visibility: hidden;
`;

const ThumbGall = ({ currImg, setCurrImg, photos }) => {
  const reducedThumbnails = photos.reduce((filtered, currentPhoto, index) => {
    let mappedElement;

    if (currImg === index) {
      mappedElement = (
        <ImgContain onClick={() => setCurrImg(index)}>
          <ThumbnailPrime src={currentPhoto.thumbnail_url} />
        </ImgContain>
      );
    } else {
      mappedElement = (
        <ImgContain onClick={() => setCurrImg(index)}>
          <Thumbnail src={currentPhoto.thumbnail_url} />
        </ImgContain>
      );
    }

    if (currImg <= 6 && index <= 6) {
      filtered.push(mappedElement);
    }
    if (currImg > 6 && index <= currImg && index >= currImg - 6 ) {
      filtered.push(mappedElement);
    }
    return filtered;
  }, []);

  return (
    <Contain>
      {currImg !== 0 && (
        <Arrow icon={faAngleUp} onClick={() => setCurrImg(currImg - 1)} />
      )}
      {currImg === 0 && (
        <NoArrow icon={faAngleUp} />
      )}
      {reducedThumbnails}
      {currImg !== photos.length - 1 && (
        <Arrow icon={faAngleDown} onClick={() => setCurrImg(currImg + 1)} />
      )}
    </Contain>
  );
};

export default ThumbGall;
