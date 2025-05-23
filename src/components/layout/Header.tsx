import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface HeaderProps {
    title: string
    nextBtnImageUrl: string
    color: string
    textcolor: string
    nextPage: string
}


const Header = ({ title, nextBtnImageUrl, color, textcolor, nextPage }: HeaderProps) => {
    const navigate = useNavigate();

    const onClickPrevButton = () => {
        navigate(-1);
    }

    const onClickNextButton = () => {
        navigate(nextPage);
    }

    return (
        <Container color={color}>
            <PrevButton onClick={onClickPrevButton} $imageurl="/assets/prev_button.svg"></PrevButton>
            <Title textcolor={textcolor}>{title}</Title>
            <NextButton onClick={onClickNextButton} $imageurl={nextBtnImageUrl}></NextButton>
        </Container>
    );
};

export default Header;

const Container = styled.div<{color: string}>`
  width: 100%;
  height: 60px;
  background-color: ${({ color }) => color};
  align-items: center; 
  position: sticky;
  top: 0; 
  left: 0;
  z-index: 1000;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h2<{textcolor: string}>`
  margin: 0;
  color: ${({ textcolor }) => textcolor};
  font-size: 18px;
`;

const PrevButton = styled.button<{$imageurl: string}>`
  width: 30px;
  height: 30px;
  padding:0;
  background: no-repeat center/cover url(${({ $imageurl }) => $imageurl});
`

const NextButton = styled.button<{$imageurl: string}>`
  width: 25px;
  height: 25px;
  padding: 0;
  background: no-repeat center/cover url(${({ $imageurl }) => $imageurl});
  overflow: hidden;
`