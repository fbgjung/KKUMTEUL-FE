import styled from "styled-components";
import { Button } from '../../styles/globalStyles';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

interface Props {
  updateAnswer: (questionId: number, interests: number[]) => void;
}

const Interest = ({ updateAnswer }: Props) => {
  const navigate = useNavigate();
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedKeyWords, setSelectedKeyWords] = useState<number[]>([]);

  const genres = [
    { id: 0, name: '그림책', image: '/assets/sports.png' },
    { id: 1, name: '만화', image: '/assets/sports.png' },
    { id: 2, name: '동화책', image: '/assets/sports.png' },
    { id: 3, name: '외국동화', image: '/assets/sports.png' },
    { id: 4, name: '자연', image: '/assets/sports.png' },
    { id: 5, name: '역사', image: '/assets/sports.png' },
    { id: 6, name: '사회', image: '/assets/sports.png' },
    { id: 7, name: '생활과 과학', image: '/assets/sports.png' },
    { id: 8, name: '예술', image: '/assets/sports.png' },
    { id: 9, name: '시', image: '/assets/sports.png' },
  ];

  const keywords = [
    { id: 0, name: '환경', image: '/assets/sports.png' },
    { id: 1, name: '동물', image: '/assets/sports.png' },
    { id: 2, name: '성장', image: '/assets/sports.png' },
    { id: 3, name: '가족', image: '/assets/sports.png' },
    { id: 4, name: '과학', image: '/assets/sports.png' },
    { id: 5, name: '생명', image: '/assets/sports.png' },
    { id: 6, name: '수학', image: '/assets/sports.png' },
    { id: 7, name: '세계문화', image: '/assets/sports.png' },
    { id: 8, name: '인물', image: '/assets/sports.png' },
    { id: 9, name: '스포츠', image: '/assets/sports.png' },
    { id: 10, name: '협동', image: '/assets/sports.png' },
    { id: 11, name: '미술', image: '/assets/sports.png' },
    { id: 12, name: '모험', image: '/assets/sports.png' },
    { id: 13, name: '기계', image: '/assets/sports.png' },
    { id: 14, name: '식물', image: '/assets/sports.png' },
    { id: 15, name: '꿈', image: '/assets/sports.png' },
    { id: 16, name: '관찰', image: '/assets/sports.png' },
    { id: 17, name: '사랑', image: '/assets/sports.png' },
    { id: 18, name: '영웅', image: '/assets/sports.png' },
    { id: 19, name: '외국어', image: '/assets/sports.png' },
    { id: 20, name: '우주', image: '/assets/sports.png' },
    { id: 21, name: '유머', image: '/assets/sports.png' },
    { id: 22, name: '음악', image: '/assets/sports.png' },
    { id: 23, name: '의학', image: '/assets/sports.png' },
    { id: 24, name: '이별', image: '/assets/sports.png' },
  ]

  const toggleGenre = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
        setSelectedGenres(prev => prev.filter(id => id !== genreId));
    } else if (selectedGenres.length < 3) {
        setSelectedGenres(prev => [...prev, genreId]);
    }
    updateAnswer(21, selectedGenres);
  };


  const toggleKeyWord = (keyWordId: number) => {
    if (selectedKeyWords.includes(keyWordId)) {
      setSelectedKeyWords(prev => prev.filter(id => id !== keyWordId));
    } else if (selectedKeyWords.length < 5) {
      setSelectedKeyWords(prev => [...prev, keyWordId]);
    }
    updateAnswer(22, selectedKeyWords);
  };


  const onNextPage = () => {
    navigate('/survey/result');
  };

  return (
    <Container>
        <GenreTitle>📚 우리 아이가 좋아하는 도서 장르 (3개 선택)</GenreTitle>
        <GenreList>
          {genres.map((genre) => (
              <Item
                key={genre.id}
                isSelected={selectedGenres.includes(genre.id)}
                onClick={() => toggleGenre(genre.id)}
              >
              <Image src={genre.image} alt={genre.name} />
              <Name>{genre.name}</Name>
              </Item>
          ))}
        </GenreList>

        <KeyWordTitle>👀 우리 아이 관심사 (5개 선택)</KeyWordTitle>
        <KeyWordList>
        {keywords.map((keyword) => (
              <Item
                key={keyword.id}
                isSelected={selectedKeyWords.includes(keyword.id)}
                onClick={() => toggleKeyWord(keyword.id)}
              >
              <Image src={keyword.image} alt={keyword.name} />
              <Name>{keyword.name}</Name>
              </Item>
          ))}
        </KeyWordList>
        <NextButton color="#FFFFFF" backcolor='#FFC317' onClick={onNextPage}>결과 보기</NextButton>
    </Container>
  );
};

export default Interest;

const Container = styled.div`
  margin: 0;
  width: calc(100% - 40px);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GenreTitle = styled.p`
  display: flex;
  width: calc(100% - 40px);
  font-weight: bold;
`;

const GenreList = styled.div`
  width: calc(100% - 40px);
  height: 240px;
  background-color: #f3f3f3;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.03);
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 30px;
`;

const Item = styled.div<{ isSelected: boolean }>`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0 5px 20px 5px;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? '#d9d9d9' : 'transparent')};
  border-radius: 100px;
  padding: 10px;
  transition: background-color 0.3s ease;
`;

const Image = styled.img`
  width: 45px;
  height: 45px;
  object-fit: cover;
  border-radius: 10px;
`;

const Name = styled.p`
  margin: 10px 0 0 0;
  font-size: 14px;
  text-align: center;
`;

const KeyWordTitle = styled.p`
  display: flex;
  width: calc(100% - 40px);
  margin-top: 30px;
  font-weight: bold;
`;

const KeyWordList = styled.div`
  width: calc(100% - 40px);
  height: 520px;
  background-color: #f3f3f3;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.03);
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 30px;
`;


const NextButton = styled(Button)`
  width: calc(100% - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 0 0;
`;
