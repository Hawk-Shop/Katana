import { FaStar } from "react-icons/fa";
import styled from 'styled-components';

const Container = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   min-height: 5vh;
   font-size: 20px;
  `
  const Radio = styled.input`
   display: none;
  `
  const Rating = styled.div`
   cursor: pointer;
  `

const Rate = ({rate, setRate}) => {
  return (
    <Container>
      {[...Array(5)].map((item, index) => {
        const givenRating = index + 1;
        return (
          <label>
            <Radio
              type="radio"
              value={givenRating}
              onClick={() => {
                setRate(givenRating);
              }}
            />
            <Rating>
              <FaStar
                color={
                  givenRating < rate || givenRating === rate
                    ? "gold"
                    : "white"
                }
              />
            </Rating>
          </label>
        );
      })}
    </Container>
  );
};

export default Rate;