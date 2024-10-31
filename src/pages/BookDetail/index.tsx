import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container, Button } from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import { useParams } from 'react-router-dom';
import axiosWithToken from '../../axiosWithToken.ts';

const Index = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likeStatus, setLikeStatus] = useState(false);
  const [childProfileId, setChildProfileId] = useState<number | null>(() => {
    const storedId = sessionStorage.getItem('childProfileId');
    return storedId ? parseInt(storedId) : null;
  });

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axiosWithToken.get(`/kkumteul/api/books/${id}`);
        console.log(response.data.response);
        setBook(response.data.response);
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [id]);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (childProfileId !== null) {
        try {
          const response = await axiosWithToken.get('/kkumteul/api/books/like', {
            params: {
              bookId: id,
              childProfileId: childProfileId,
            },
          });
          console.log(response.data.response);
          setLikeStatus(response.data.response.isLiked);
        } catch (error) {
          console.error('Error fetching like status:', error);
        }
      }
    };

    fetchLikeStatus();
  }, [id, childProfileId]);

  const handleLike = async (likeType) => {
    if (childProfileId === null) {
      alert("🌈 자녀를 선택해 주세요 🌈");
      return;
    }

    try {
      const response = await axiosWithToken.post('/kkumteul/api/books/like', {
        bookId: book.bookId,
        childProfileId: childProfileId,
        likeType: likeType,
      });
      alert(response.data.response);

      // 상태 업데이트
      if (likeType === 'LIKE') {
        setLikeStatus(true);
      } else if (likeType === 'DISLIKE') {
        setLikeStatus(false);
      }

    } catch (error) {
      console.error('Error processing like/dislike:', error);
      alert(error.response?.data || '오류가 발생했습니다.');
    }
  };

  if (loading) {
    return <Container color="null">로딩 중...</Container>;
  }

  if (!book) {
    console.log("Book object is null or undefined");
    return null;
  }

  return (
    <Container color="#FFD869">
      <Header
        textcolor="#000000"
        color="#FFD869"
        title={book.bookTitle}
        nextPage="/"
        nextBtnImageUrl="/assets/home.svg"
      />

      <BookImage src={`data:image/jpeg;base64,${book.bookImage}`} alt={book.bookTitle} />
      <BookInfo>
        <BookTitle>{book.bookTitle}</BookTitle>
        <Author>{book.bookAuthor}</Author>

        <TitleText>MBTI</TitleText>
        <MbtiValue>{book.mbtiInfo}</MbtiValue>

        <TitleText>줄거리</TitleText>
        <SummaryContainer>
          <Summary>{book.bookSummary}</Summary>
        </SummaryContainer>

        <InfoWrapper>
          <TitleText>장르</TitleText>
          <InfoValue>{book.genreName}</InfoValue>
        </InfoWrapper>

        <InfoWrapper>
          <TitleText>주제</TitleText>
          <InfoValue>{Array.isArray(book.topicNames) ? book.topicNames.join(', ') : book.topicNames}</InfoValue>
        </InfoWrapper>

        <InfoWrapper>
          <TitleText>추천 연령</TitleText>
          <InfoValue>{book.ageGroup}</InfoValue>
        </InfoWrapper>

        <InfoWrapper>
          <TitleText>페이지 수</TitleText>
          <InfoValue>{book.bookPage}</InfoValue>
        </InfoWrapper>

        <InfoWrapper>
          <TitleText>출판사</TitleText>
          <InfoValue>{book.publisher}</InfoValue>
        </InfoWrapper>
      </BookInfo>

      <ButtonContainer>
        <LikeButton
          onClick={() => handleLike('LIKE')}
          color={likeStatus ? "#FFC317" : "#757575"}
          backcolor={likeStatus ? "#FFD869" : "#ffffff"}
          active={likeStatus} // 눌려있는 상태 표시
        >
          좋아요
        </LikeButton>
        <DisLikeButton
          onClick={() => handleLike('DISLIKE')}
          color={likeStatus ? "#757575" : "#6EA7D0"}
          backcolor={likeStatus ? "#ffffff" : "#6EA7D0"}
          active={!likeStatus} // 눌려있는 상태 표시
        >
          싫어요
        </DisLikeButton>
      </ButtonContainer>
    </Container>
  );
};

export default Index;

// 스타일 컴포넌트 정의
const BookImage = styled.img`
  width: 180px;
  height: 240px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  margin: 80px 0 0 0;
  z-index: 100;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const BookTitle = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 2px;
  text-align: center;
  color: #000000;
`;

const Author = styled.h3`
  font-size: 16px;
  color: #757575;
  text-align: center;
  margin: 0;
`;

const TitleText = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #757575;
`;

const InfoValue = styled.span`
  font-size: 16px;
  margin-left: 10px;
`;

const MbtiValue = styled.span`
  font-size: 47px;
  color: #FFC317;
  margin-bottom: 30px;
`;

const SummaryContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 12px;
  margin: 10px 0 20px 0;
  padding: 0 20px;
  overflow-y: auto;
`;

const Summary = styled.p`
  font-size: 14px;
  margin: 20px 0;
  line-height: 1.5;
  color: #757575;
`;

const InfoWrapper = styled.div`
  display: flex;
  color: gray;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 80%;
  gap: 10px;
  margin: 60px 0;
`;

// 스타일 컴포넌트 정의
const LikeButton = styled(Button)`
  border: 4px solid #FFC317;
  font-size: 16px;
  background-color: ${(props) => (props.active ? '#FFC317' : '#ffffff')};
  color: ${(props) => (props.active ? '#ffffff' : '#757575')};
  &:hover {
    background-color: #FFC317;
    color: #ffffff;
  }
`;

const DisLikeButton = styled(Button)`
  border: 4px solid #6EA7D0;
  font-size: 16px;
  background-color: ${(props) => (props.active ? '#6EA7D0' : '#ffffff')};
  color: ${(props) => (props.active ? '#ffffff' : '#757575')};
  &:hover {
    background-color: #6EA7D0;
    color: #ffffff;
  }
`;

