import React from 'react';
import styled from 'styled-components';
import { Container, Button } from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import { useParams } from 'react-router-dom';

const books = [
    { id: 1, title: "책 1", author: "작가 1", price: 10000, publisher: "출판사 1", page: 200, summary: "이 책은 환경 보호에 관한 이야기입니다.", age_group: "6세 이상", book_image: "/assets/book.jpg", mbti: "INFJ", topic: "환경", genre: "자연" },
    { id: 2, title: "책 2", author: "작가 2", price: 10000, publisher: "출판사 2", page: 180, summary: "이 책은 동물의 생태를 다룹니다.", age_group: "9세 이상", book_image: "/assets/book.jpg", mbti: "ENTP", topic: "동물", genre: "만화" },
    { id: 3, title: "책 3", author: "작가 1", price: 10000, publisher: "출판사 3", page: 150, summary: "이 책은 가족의 소중함을 이야기합니다.", age_group: "6세 이상", book_image: "/assets/book.jpg", mbti: "ISFP", topic: "가족", genre: "그림책" },
    { id: 4, title: "책 4", author: "작가 3", price: 10000, publisher: "출판사 1", page: 250, summary: "이 책은 성장에 관한 내용을 담고 있습니다.", age_group: "12세 이상", book_image: "/assets/book.jpg", mbti: "ESTJ", topic: "성장", genre: "동화(옛날이야기)" },
    { id: 5, title: "책 5", author: "작가 2", price: 10000, publisher: "출판사 2", page: 220, summary: "이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.이 책은 과학의 원리를 설명합니다.", age_group: "9세 이상", book_image: "/assets/book.jpg", mbti: "INTP", topic: "과학", genre: "생활과 과학" },
    { id: 6, title: "책 6", author: "작가 3", price: 10000, publisher: "출판사 3", page: 190, summary: "이 책은 인물에 대한 흥미로운 이야기입니다.", age_group: "12세 이상", book_image: "/assets/book.jpg", mbti: "ENFP", topic: "인물", genre: "역사" },
    { id: 7, title: "책 7", author: "작가 1", price: 10000, publisher: "출판사 1", page: 170, summary: "이 책은 스포츠의 중요성을 강조합니다.", age_group: "6세 이상", book_image: "/assets/book.jpg", mbti: "ISFJ", topic: "스포츠", genre: "기타" },
    { id: 8, title: "책 8", author: "작가 2", price: 10000, publisher: "출판사 2", page: 210, summary: "이 책은 꿈을 이루는 방법에 대해 설명합니다.", age_group: "9세 이상", book_image: "/assets/book.jpg", mbti: "ENTJ", topic: "꿈", genre: "예술" },
    { id: 9, title: "책 9", author: "작가 3", price: 10000, publisher: "출판사 3", page: 240, summary: "이 책은 과거와 현재의 관계를 탐구합니다.", age_group: "12세 이상", book_image: "/assets/book.jpg", mbti: "ESTP", topic: "역사", genre: "사회" },
    { id: 10, title: "책 10", author: "작가 1", price: 10000, publisher: "출판사 1", page: 160, summary: "이 책은 협동의 중요성을 다룹니다.", age_group: "6세 이상", book_image: "/assets/book.jpg", mbti: "INFP", topic: "협동", genre: "시" },
    { id: 11, title: "책 11", author: "작가 2", price: 10000, publisher: "출판사 2", page: 200, summary: "이 책은 사랑의 의미를 탐구합니다.", age_group: "9세 이상", book_image: "/assets/book.jpg", mbti: "ENFJ", topic: "사랑", genre: "동화(옛날이야기)" },
    { id: 12, title: "책 12", author: "작가 3", price: 10000, publisher: "출판사 3", page: 230, summary: "이 책은 외계인의 이야기를 다룹니다.", age_group: "12세 이상", book_image: "/assets/book.jpg", mbti: "ISTJ", topic: "외계인", genre: "자연" },
    { id: 13, title: "책 13", author: "작가 1", price: 10000, publisher: "출판사 1", page: 190, summary: "이 책은 음악의 아름다움을 탐구합니다.", age_group: "6세 이상", book_image: "/assets/book.jpg", mbti: "ESFP", topic: "음악", genre: "예술" },
    { id: 14, title: "책 14", author: "작가 2", price: 10000, publisher: "출판사 2", page: 220, summary: "이 책은 기계의 원리를 설명합니다.", age_group: "9세 이상", book_image: "/assets/book.jpg", mbti: "ISTP", topic: "기계", genre: "생활과 과학" },
    { id: 15, title: "책 15", author: "작가 3", price: 10000, publisher: "출판사 3", page: 210, summary: "이 책은 식물의 신비로운 세계를 다룹니다.", age_group: "12세 이상", book_image: "/assets/book.jpg", mbti: "ESFJ", topic: "식물", genre: "자연" }
];

const BookDetail = () => {
  const { id } = useParams();
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    return <Container>도서를 찾을 수 없습니다.</Container>;
  }

  return (
    <Container color="#f3f3f3">
      <Header textcolor="#000000" color="#f3f3f3" title={book.title} nextPage="/" nextBtnImageUrl="/assets/home.svg"/>

        <BookImage src={book.book_image} alt={book.title} />
        <BookInfo>
          <BookTitle>{book.title}</BookTitle>
          <Author>{book.author}</Author>

          <TitleText>MBTI</TitleText>
          <MbtiValue>{book.mbti}</MbtiValue>

          <TitleText>줄거리 </TitleText>
          <Summary>{book.summary}</Summary>

          <GenreInfo>
            <TitleText>장르 </TitleText>
            <InfoValue>{book.genre}</InfoValue>
          </GenreInfo>

          <TopicInfo>
            <TitleText>주제 </TitleText>
            <InfoValue>{book.topic}</InfoValue>
          </TopicInfo>

          <AgeGroupInfo>
            <TitleText>추천 연령 </TitleText>
            <InfoValue>{book.age_group}</InfoValue>
          </AgeGroupInfo>

          <AgeGroupInfo>
            <TitleText>페이지 수 </TitleText>
            <InfoValue>{book.page}</InfoValue>
          </AgeGroupInfo>

          <PublisherInfo>
            <TitleText>출판사 </TitleText>
            <InfoValue>{book.publisher}</InfoValue>
          </PublisherInfo>

          <ButtonContainer>
            <Button color="#000000" backcolor='#e3e3e3'>좋아요</Button>
            <Button color="#ffffff" backcolor="#FFD869">싫어요</Button>
          </ButtonContainer>
        </BookInfo>
    </Container>
  );
};

export default BookDetail;

const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const BookImage = styled.img`
  width: 200px;
  height: 300px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
`;

const BookTitle = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: center;
  color: #757575
`;

const Author = styled.h3`
  font-size: 16px;
  color: gray;
  margin-bottom: 10px;
  text-align: center;
`;

const TitleText = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #757575
`;

const InfoValue = styled.span`
  font-size: 18px;
  margin-left: 10px;
`;

const MbtiValue = styled.span`
  font-size: 47px;
  color: #FFC317;
  margin-bottom: 30px;
`;

const Summary = styled.p`
  font-size: 16px;
  margin: 20px 0;
  line-height: 1.5;
`;

const SmallInfo = styled.div`
  display: flex;
  color: gray;
  margin-bottom: 10px;
`;



const GenreInfo = styled(SmallInfo)``;

const TopicInfo = styled(SmallInfo)``;

const AgeGroupInfo = styled(SmallInfo)``;

const PublisherInfo = styled(SmallInfo)``;

const ButtonContainer = styled.div`
    margin-top: 50px; /* BookInfo 아래에 버튼을 배치 */
    display: flex;
    justify-content: space-between;
    width: 100%; /* 버튼의 너비를 100%로 설정하여 정렬 */
    gap: 20px; /* 버튼 사이의 간격 추가 */
`;
