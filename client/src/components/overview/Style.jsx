import styled from "styled-components";
import sortStyles from "../util/sortStyles.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Styler = styled.div`
  width: 100%;
  margin-top: 1%;
`;

const StyleName = styled.div`
  margin: 10% 0 5% 0;
  font-size: 1rem;
  font-weight: bold;
`;
const SelectedStyle = styled.span`
  font-size: 0.9rem;
  font-weight: normal;
`;

const StylesCtn = styled.div`
  display: flex;
  flex-direction: column;
`;
const IconCtn = styled.div`
  display: inline-block;
  width: 15%;
  margin: 0 auto;
  position: relative;
`;

const ImgStyle = styled.img`
  object-fit: cover;
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.1)
  }
`;

const PrimeImg = styled.img`
  object-fit: cover;
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.1)
  }
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
`;
const CheckmarkCtn = styled.div`
  position: absolute;
  left: 50%;
  bottom: 80%;
  width: 15px;
  height: 15px;
  background-color: white;
  border-radius: 50%;
  text-align: center;
  border: 1px solid black;
`;

const Checkmark = styled(FontAwesomeIcon)`
  width: 50%;
  margin: auto;
  background-color: transparent;
`

const ThmCtn = styled.span`
  margin-bottom: 2%;
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  flex-wrap: nowrap
`;

const Style = ({ styles, currentStyle, setStyle }) => {
  let sortedStyles = sortStyles(styles);
  return (
    <Styler>
      <StyleName>
        STYLE {">"} <SelectedStyle>{currentStyle.name}</SelectedStyle>
      </StyleName>
      <StylesCtn>
        {sortedStyles.map((styleArray, index) => {
          return (
            <ThmCtn key={index}>
              {styleArray.map((style, i) => (
                <div style={{marginRight: '3%'}}key={i}>
                  {style.id === currentStyle.style_id ? (
                    <IconCtn key={i}>
                      <PrimeImg
                        src={style.photo}
                        onClick={() => {
                          setStyle(styles[style.index]);
                        }}
                      ></PrimeImg>
                    </IconCtn>
                  ) : (
                    <IconCtn key={i}>
                      <ImgStyle
                        src={style.photo}
                        onClick={() => {
                          setStyle(styles[style.index]);
                        }}
                      ></ImgStyle>
                    </IconCtn>
                  )}
                </div>
              ))}
            </ThmCtn>
          );
        })}
      </StylesCtn>
    </Styler>
  );
};

export default Style;
