import styled from "styled-components";
import { Button } from '../../styles/globalStyles';
import { useState, useEffect } from 'react';

interface Props {
  updateAnswer: (favoriteId: string, interests: number[]) => void;
  handleSubmit: () => void; // 최종 제출 함수를 부모로부터 전달받음
}

const Interest = ({ updateAnswer, handleSubmit }: Props) => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedKeyWords, setSelectedKeyWords] = useState<number[]>([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const genres = [
    { id: 1, name: '그림책', image: '/assets/genre/picture_book.png' },
    { id: 2, name: '만화', image: '/assets/genre/comic_book.png' },
    { id: 3, name: '동화책', image: '/assets/genre/tale_book.png' },
    { id: 4, name: '외국동화', image: '/assets/genre/world_book.png' },
    { id: 5, name: '자연', image: '/assets/genre/natural_book.png' },
    { id: 6, name: '역사', image: '/assets/genre/history_book.png' },
    { id: 7, name: '사회', image: '/assets/genre/social_book.png' },
    { id: 8, name: '생활과 과학', image: '/assets/genre/science_book.png' },
    { id: 9, name: '예술', image: '/assets/genre/art_book.png' },
    { id: 10, name: '시', image: '/assets/genre/poem_book.png' },
    { id: 11, name: '기타', image: '/assets/genre/other_book.png' },
  ];

  const keywords = [
    { id: 1, name: '환경', image: '/assets/topic/environment.png' },
    { id: 2, name: '동물', image: '/assets/topic/animal.png' },
    { id: 3, name: '성장', image: '/assets/topic/growth.png' },
    { id: 4, name: '가족', image: '/assets/topic/family.png' },
    { id: 5, name: '과학', image: '/assets/topic/science.png' },
    { id: 6, name: '생명', image: '/assets/topic/life.png' },
    { id: 7, name: '수학', image: '/assets/topic/math.png' },
    { id: 8, name: '세계문화', image: '/assets/topic/culture.png' },
    { id: 9, name: '인물', image: '/assets/topic/human.png' },
    { id: 10, name: '스포츠', image: '/assets/topic/sport.png' },
    { id: 11, name: '협동', image: '/assets/topic/collaboration.png' },
    { id: 12, name: '미술', image: '/assets/topic/art.png' },
    { id: 13, name: '모험', image: '/assets/topic/adventure.png' },
    { id: 14, name: '기계', image: '/assets/topic/machine.png' },
    { id: 15, name: '식물', image: '/assets/topic/plant.png' },
    { id: 16, name: '꿈', image: '/assets/topic/dream.png' },
    { id: 17, name: '관찰', image: '/assets/topic/observation.png' },
    { id: 18, name: '사랑', image: '/assets/topic/love.png' },
    { id: 19, name: '영웅', image: '/assets/topic/hero.png' },
    { id: 20, name: '외국어', image: '/assets/topic/language.png' },
    { id: 21, name: '우주', image: '/assets/topic/space.png' },
    { id: 22, name: '유머', image: '/assets/topic/humor.png' },
    { id: 23, name: '음악', image: '/assets/topic/music.png' },
    { id: 24, name: '의학', image: '/assets/topic/medicine.png' },
    { id: 25, name: '이별', image: '/assets/topic/parting.png' },
  ];

  const toggleGenre = (genreId: number) => {
    setSelectedGenres(prev =>
        prev.includes(genreId) ? prev.filter(id => id !== genreId) : [...prev, genreId].slice(0, 3)
    );
  };

  const toggleKeyWord = (keyWordId: number) => {
    setSelectedKeyWords(prev =>
        prev.includes(keyWordId) ? prev.filter(id => id !== keyWordId) : [...prev, keyWordId].slice(0, 5)
    );
  };

  // 선택된 장르와 키워드가 변경될 때마다 부모 컴포넌트에 업데이트
  useEffect(() => {
    updateAnswer('favoriteGenres', selectedGenres);
    updateAnswer('favoriteTopics', selectedKeyWords);
    setIsButtonEnabled(selectedGenres.length === 3 && selectedKeyWords.length === 5);
  }, [selectedGenres, selectedKeyWords, updateAnswer]);

  return (
      <Container>
        <GenreTitleContainer>
          <GenreImage src='/assets/genre/genre_image.png'></GenreImage>
          <GenreTitle>우리 아이가 좋아하는 도서 장르 (3개 선택)</GenreTitle>
        </GenreTitleContainer>
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

        <KeyWordTitleContainer>
          <KeyWordImage src='/assets/genre/topic_image.png'></KeyWordImage>
          <KeyWordTitle>우리 아이 관심사 (5개 선택)</KeyWordTitle>
        </KeyWordTitleContainer>
        
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

        {/* handleSubmit 함수로 최종 제출 */}
        <NextButton
            color={isButtonEnabled ? "#565656" : "#999999"}
            backcolor={isButtonEnabled ? '#fee208' : '#d9d9d9'}
            onClick={isButtonEnabled ? handleSubmit : undefined} // 버튼이 활성화된 경우에만 제출 가능
            disabled={!isButtonEnabled}
        >
          결과 보기
        </NextButton>
      </Container>
  );
};

export default Interest;

const Container = styled.div`
  margin: 0;
  width: 90%;
  background-color: #fdf8d7;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GenreTitleContainer = styled.div`
  display: flex;
  width: 90%;
  margin-top: 20px;
  align-items: center;
`

const GenreImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 8px;
  
`
const GenreTitle = styled.h3`
  display: flex;
  width: 100%;
  font-weight: bold;
`;

const GenreList = styled.div`
  width: 95%;
  background-color: #ffffff;
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  margin-bottom: 30px;
`;

const Item = styled.div<{ isSelected: boolean }>`
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin: 10px 6px;
  background-color: ${({ isSelected }) => (isSelected ? '#fee208' : 'transparent')};
  border-radius: 50%;
  justify-content: center;
  transition: background-color 0.3s ease, transform 0.1s ease;
  color: #565656;

  &:active {
    transform: scale(0.95);
  }
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 10px;
`;

const Name = styled.p`
  margin: 10px 0 0 0;
  font-size: 14px;
  text-align: center;
`;

const KeyWordTitleContainer = styled.div`
  display: flex;
  width: 90%;
  margin-top: 20px;
  align-items: center;
`

const KeyWordImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 8px;
  
`

const KeyWordTitle = styled.h3`
  display: flex;
  width: 100%;
  margin-top: 30px;
  font-weight: bold;
`;

const KeyWordList = styled.div`
  width: 95%;
  background-color: #ffffff;
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

const NextButton = styled(Button)`
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
`;
