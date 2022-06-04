import styled from "styled-components";

const Contain = styled.div`
  display: flex;
  margin: 1% auto;
  width: 25%;
  grid-gap: 1%;
  justify-items: stretch;
  max-height: 100%;
  justify-content: space-between
`;

const ImgContain = styled.div`
  cursor: pointer;
  &:hover {
    transform: scale(1.1)
  }
`;

const Thumbnail = styled.div`
  border: 1px solid black;
  color: white;
  border-radius: 50%;
  height: 10px;
  width: 10px;
  background-color: white;
`;

const ThumbnailPrime = styled.div`
  border: 1px solid black;
  height: 10px;
  width: 10px;
  background-color: gray;
  border-radius: 50%;
`;

const IconGall = ({ currImg, setCurrImg, photos }) => {
  const reducedThumbnails = photos.reduce((filtered, currentPhoto, index) => {
    let mappedElement;

    if (currImg === index) {
      mappedElement = (
        <ImgContain onClick={() => setCurrImg(index)}>
          <ThumbnailPrime />
        </ImgContain>
      );
    } else {
      mappedElement = (
        <ImgContain onClick={() => setCurrImg(index)}>
          <Thumbnail />
        </ImgContain>
      );
    }
      filtered.push(mappedElement);

    return filtered;
  }, []);

  return (
    <Contain>
      {reducedThumbnails}
    </Contain>
  );
};

export default IconGall;
