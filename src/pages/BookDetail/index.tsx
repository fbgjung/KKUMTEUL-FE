import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container, Button } from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import { useParams } from 'react-router-dom';
import axiosWithToken from '../../axiosWithToken.ts';
import AlertModal from '../../modal/AlertModal';


interface Book {
  ageGroup:string;
  bookAuthor:string;
  bookId:number;
  bookImage:string;
  bookPage:string;
  bookSummary:string;
  bookTitle:string;
  genreName:string;
  mbtiInfo:string;
  publisher:string;
  topicNames:string[];
}

const Index = () => {
    const { id } = useParams();
    const [book, setBook] = useState<Book>();
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [childProfileId, setChildProfileId] = useState<number | null>(() => {
        const storedId = sessionStorage.getItem('childProfileId');
        return storedId ? parseInt(storedId) : null;
    });

    const [isAlertModalOpen, setAlertModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string>("");

    useEffect(() => {
        const fetchBookDetail = async () => {
            try {
                const response = await axiosWithToken.get(`/kkumteul/api/books/${id}`);
                setBook(response.data.response);
                console.log(response.data.response);
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
                    setIsLiked(response.data.response.liked);
                    setIsDisliked(response.data.response.disliked);
                } catch (error) {
                    console.error('Error fetching like status:', error);
                }
            }
        };

        fetchLikeStatus();
    }, [id, childProfileId]);

    const handleLike = async (likeType:string) => {
        if (childProfileId === null) {
            setAlertModalOpen(true);
            setAlertMessage("자녀 프로필을 선택해 주세요");
            return;
        }

        try {
            const response = await axiosWithToken.post('/kkumteul/api/books/like', {
                bookId: book.bookId,
                childProfileId: childProfileId,
                likeType: likeType,
            });
            // alert(response.data.response);
            


            if (likeType === 'LIKE') {
                setIsLiked(true);
                setIsDisliked(false);
                setAlertModalOpen(true);
                setAlertMessage("저는 이 책이 좋아요!");
            } else if (likeType === 'DISLIKE') {
                setIsLiked(false);
                setIsDisliked(true);
                setAlertModalOpen(true);
                setAlertMessage("다음에 다시 볼게요!");
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
        return null;
    }

    const handleCloseAlertModal = () => {
      setAlertModalOpen(false);
    };

    return (
      <Container color="#fee208">
        <Header
          textcolor="#000000"
          color="#fee208"
          title={book.bookTitle}
          nextPage="/"
          nextBtnImageUrl="/assets/home.svg"
          fontSize='14px'
        />

        <ImageAndContentContainer>

          <BookImageContainer>
          <BookImage src={`data:image/jpeg;base64,${book.bookImage}`} alt={book.bookTitle} />
          <OverlayImage src="/assets/detail_page_book.png" alt="Overlay" />
          </BookImageContainer>
            

          <ContentContainer>
            <BookInfo>
              <BookInfoFirstSection>
                <BookTitle>{book.bookTitle}</BookTitle>
                <Author>{book.bookAuthor}</Author>
                <GenreAndAge>
                  <Genre>{book.genreName}</Genre>
                  <Age>{book.ageGroup} 추천</Age>
                </GenreAndAge>
              </BookInfoFirstSection>
              
              <TitleText>이런 성향의 꿈틀이들과 잘 맞는 책이에요</TitleText>
              <MbtiValue>{book.mbtiInfo}</MbtiValue>
              {/* <MbtiValue>{book.mbtiInfo}</MbtiValue> */}

              <TitleText>줄거리</TitleText>
              <SummaryContainer>
                  <Summary>{book.bookSummary}</Summary>
              </SummaryContainer>

              <InfoWrapper>
                  <TitleText>주제</TitleText>
                  <InfoValue>{Array.isArray(book.topicNames) ? book.topicNames.join(', ') : book.topicNames}</InfoValue>
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
                  color={isLiked ? "#FFC317" : "#757575"}
                  backcolor={isLiked ? "#FFD869" : "#ffffff"}
                  active={isLiked}
              >
                  좋아요
              </LikeButton>
              <DisLikeButton
                  onClick={() => handleLike('DISLIKE')}
                  color={isDisliked ? "#757575" : "#6EA7D0"}
                  backcolor={isDisliked ? "#ffffff" : "#6EA7D0"}
                  active={isDisliked}
              >
                  다음에 볼래요
              </DisLikeButton>
              {isAlertModalOpen && (
              <AlertModal
                isOpen={isAlertModalOpen}
                message={alertMessage}
                onClose={handleCloseAlertModal}
                icon="/assets/childprofile.png"
              />
              )}
            </ButtonContainer>
          </ContentContainer>
        </ImageAndContentContainer>
      </Container>
    );
};

export default Index;

const ImageAndContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-top: 130px;
  
`;

const BookInfoFirstSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 50px;
  text-align: center;
  align-items: center;
`

const BookTitle = styled.h3`
  font-size: 30px;
  font-weight: bold;
  margin: 40px 0 10px 0;
  color: #000000;
`;

const Author = styled.p`
  margin: 0;
  font-size: 16px;
  color: #757575;
`;

const GenreAndAge = styled.div`
 display: flex;
 gap: 10px;
`

const Genre = styled.p`
  margin: 5;
  font-size: 14px;
  color: #757575;
  background-color: #ffe7bb;
  color: #f98109;
  padding: 10px;
  border-radius: 12px;
`

const Age = styled.p`
  margin: 5;
  font-size: 14px;
  color: #757575;
  background-color: #ffe7bb;
  color: #f98109;
  padding: 10px;
  border-radius: 12px;
`

const BookImageContainer = styled.div`
  position: relative;
`

const BookImage = styled.img`
  width: 180px;
  height: 240px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  margin-top: -40px;
  margin-bottom: -50px;
  z-index: 1;
`;

const OverlayImage = styled.img`
  position: absolute;
  bottom: -60px;
  left: -30px;
  width: 100px;
  height: 100px;
  z-index: 2;
  animation: float 1.5s ease-in-out infinite;

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const ContentContainer = styled.div`
  background-color: #ffffff;
  border-radius: 24px 24px 0 0;
  padding: 100px 20px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -50px;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  padding: 0 20px;
`;


const TitleText = styled.h3`
  font-size: 17px;
  color: #757575;
  margin: 0;

`;

const InfoValue = styled.span`
  font-size: 16px;
  margin-left: 10px;
`;

const MbtiValue = styled.span`
  font-size: 50px;
  font-weight: bold;
  color: #77a5fe;
  margin-bottom: 30px;
  font-family: 'Helvetica', 'Arial', sans-serif;
`;


const SummaryContainer = styled.div`
  width: 100%;
  background-color: #d0dffb;
  border-radius: 12px;
  margin: 10px 0 20px 0;
  padding: 0 20px;
  overflow-y: auto;
`;

const Summary = styled.p`
  font-size: 14px;
  margin: 20px 0;
  line-height: 1.8;
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
  margin: 60px 0 0 0;
`;

const LikeButton = styled(Button)`
  border: 4px solid #fee208;
  border-radius: 100px;
  font-size: 16px;
  background-color: ${(props) => (props.active ? '#fee208' : '#ffffff')};
  color: ${(props) => (props.active ? '#ffffff' : '#757575')};
  &:hover {
    background-color: #fee208;
    color: #ffffff;
  }
`;

const DisLikeButton = styled(Button)`
  border: 4px solid #77a5fe;
  border-radius: 100px;
  font-size: 16px;
  background-color: ${(props) => (props.active ? '#77a5fe' : '#ffffff')};
  color: ${(props) => (props.active ? '#ffffff' : '#757575')};
  &:hover {
    background-color: #77a5fe;
    color: #ffffff;
  }
`;