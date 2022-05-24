import React, { useState } from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

const Contain = styled.div`
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  margin-right: 5%;
  width: 8%;
`;

const ImgContain = styled.div`
  cursor:pointer;
  height: 50%;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const Arrow = styled(FontAwesomeIcon)`
`;

const ThumbGall = ({currImg, setCurrImg, photos}) => {
  let stateIndex;
  if (currImg + 6 > photos.length - 1) {
    stateIndex = [currImg - 6, currImg]
  } else {
    stateIndex = [currImg, currImg + 6]
  }
  const [listInx, setListInx] = useState(stateIndex);

  const reducedThumbnails = photos.reduce((filtered, currentPhoto, index) => {
    const mappedElement = (
      <ImgContain onClick={() => setCurrImg(index)}><Thumbnail src={currentPhoto.thumbnail_url} /></ImgContain>
    )

    if (listInx <= 6 && index <= 6) {
      filtered.push(mappedElement)
    }
    if (listInx > 6 && index >= currImg - 6 && index <= currImg) {
      filtered.push(mappedElement)
    }
    return filtered;
  }, [])

  return(
    <Contain>
      <Arrow icon={faAngleUp} onClick={() => setListInx}/>
      {reducedThumbnails}
      <Arrow icon={faAngleDown}/>
    </Contain>
  )
}

export default ThumbGall;