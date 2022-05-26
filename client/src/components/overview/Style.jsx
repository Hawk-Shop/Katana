import { useState, useEffect, useContext } from "react";
import { Context } from "../util/context.js";
import styled from "styled-components";
import sortStyles from "../util/sortStyles.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Styler = styled.div`
  width: auto;
`;

const StyleName = styled.div`
  margin: 10% 0 5% 0;
  font-size: 1rem;
  font-weight: bold;
`;
const SelectedStyle = styled.span`
  font-size: 1rem;
  font-weight: normal;
`;

const StylesCtn = styled.div`
  display: flex;
  flex-direction: column;
`;
const IconCtn = styled.div`
  display: inline-block;
  width: 11%
`;

const ImgStyle = styled.img`
  object-fit: cover;
  border-radius: 50%;
  border: 0.5px solid black;
  height: 3rem;
  width: 3rem;
  cursor: pointer;
`;
const CheckmarkCtn = styled.div`
  position: relative;
  bottom: 40px;
  width: 15px;
  height: 15px;
  display: inline-block;
  background-color: white;
  border-radius: 50%;
  text-align: center;
  margin-left: -20%;
  border: 1px solid black;
`;

const Checkmark = styled(FontAwesomeIcon)`
  width: 50%;
  margin: auto;
  background-color: transparent;
`

const ThmCtn = styled.span`
  margin-bottom: 2%;
`;

const Style = ({ product, styles, currentStyle, setStyle }) => {
  let sortedStyles = sortStyles(styles);
  return (
    <Styler>
      <StyleName>
        STYLE {">"} <SelectedStyle>{currentStyle.name}</SelectedStyle>
      </StyleName>
      <StylesCtn>
        {sortedStyles.map((styleArray) => {
          return (
            <ThmCtn>
              {styleArray.map((style) => (
                <>
                  {style.id === currentStyle.style_id ? (
                    <IconCtn>
                      <ImgStyle
                        src={style.photo}
                        onClick={() => {
                          setStyle(styles[style.index]);
                        }}
                      ></ImgStyle>
                      <CheckmarkCtn>
                        <Checkmark icon={faCheck}/>
                      </CheckmarkCtn>
                    </IconCtn>
                  ) : (
                    <IconCtn>
                      <ImgStyle
                        src={style.photo}
                        onClick={() => {
                          setStyle(styles[style.index]);
                        }}
                      ></ImgStyle>
                    </IconCtn>
                  )}
                </>
              ))}
            </ThmCtn>
          );
        })}
      </StylesCtn>
    </Styler>
  );
};

export default Style;
