import styled from "styled-components";
import {Button} from '../../styles/globalStyles';
import { useNavigate } from "react-router-dom";


const Interest = () => {
  const navigate = useNavigate();

  const onNextPage = () => {
    navigate('/survey/result');
  }
  return(
    <Container>
      <KeyWordTitle>👀 우리 아이 관심사 (3개 선택)</KeyWordTitle>
      <KeyWordList></KeyWordList>

      <GenreTitle>📚 우리 아이가 좋아하는 도서 장르 (5개 선택)</GenreTitle>
      <GenreList></GenreList>
      <NextButton color="#FFFFFF" backcolor='#FFC317' onClick={onNextPage}>결과 보기</NextButton>
    </Container>
  )
}

export default Interest;

const Container = styled.div`
  margin: 0;
  width: calc(100% - 40px);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`
const KeyWordTitle = styled.p`
  display: flex;
  width: calc(100% - 40px);
`

const KeyWordList = styled.div`
  width: calc(100% - 40px);
  height: 230px;
  background-color: #f3f3f3;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.03);
  border-radius: 20px;
  margin-bottom: 20px;
`

const GenreTitle = styled.p`
  display: flex;
  width: calc(100% - 40px);
`

const GenreList = styled.div`
  width: calc(100% - 40px);
  height: 320px;
  background-color: #f3f3f3;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.03);
  border-radius: 20px;
  margin-bottom: 20px;
`

const NextButton = styled(Button)`
  width: calc(100% - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 0 0;
`
