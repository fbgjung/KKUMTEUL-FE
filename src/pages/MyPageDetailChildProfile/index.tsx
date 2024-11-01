import { Container } from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosWithToken from '../../axiosWithToken.ts';

interface BookLike {
    bookId: number;
    bookTitle: string;
    bookImage: string | null;
}

interface ChildPersonalityHistory {
    historyId: number;
    mbti: string;
    mbtiTitle: string;
    mbtiImage: string | null;
    createdAt: string;
    historyCreatedType: "DIAGNOSIS" | "FEEDBACK";
}

interface ChildProfile {
    childName: string;
    bookLikeList: BookLike[];
    childPersonalityHistoryList: ChildPersonalityHistory[];
}

const ChildProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { child } = location.state;
    const [childProfile, setChildProfile] = useState<ChildProfile>();

    const fetchChildProfile = async (childProfileId: number) => {
        try {
            const response = await axiosWithToken.get(`/kkumteul/api/childProfiles/${childProfileId}`);
            setChildProfile(response.data.response);
        } catch (error) {
            console.error("Error fetching child profile:", error);
        }
    };

    useEffect(() => {
      if (child) {
          fetchChildProfile(child.childProfileId);
      }
    }, [child]);

    const handleRecordClick = (recordId: number, historyCreatedType: string) => {
      navigate(`/record/${child.childProfileId}/${recordId}`, {state: historyCreatedType});
  };

    const handleBookClick = (bookId: number) => {
        navigate(`/booklist/${bookId}`);
    };

    const latestPersonality = childProfile?.childPersonalityHistoryList[0];

    return (
        <Container color="#fdf8d7">
            <Header
                textcolor="#000000"
                color="#fdf8d7"
                nextBtnImageUrl="/assets/home.svg"
                title="내 자녀 프로필"
                nextPage="/"
            />

            <ChildProfileDetailContainer>
                {latestPersonality && (
                    <ProfileCard
                        onClick={() => handleRecordClick(latestPersonality.historyId, latestPersonality.historyCreatedType)}
                        bgColor= "#fee208"
                    >
                        <ProfileImage src={`data:image/jpeg;base64,${latestPersonality.mbtiImage}`} alt="Character" />
                        <ProfileText>
                            <ProfileMbti>{latestPersonality.mbti}</ProfileMbti>
                            <p>{latestPersonality.mbtiTitle}</p>
                        </ProfileText>
                        <RecordTo>
                          <RecordButton onClick={() => handleRecordClick(latestPersonality.historyId, latestPersonality.historyCreatedType)}>상세보기</RecordButton>
                          <RecordDate>
                          {new Date(latestPersonality.createdAt).toLocaleDateString('ko-KR').replace(/\.$/, '')}
                        </RecordDate>                               
                          </RecordTo>
                    </ProfileCard>
                )}

                <SectionTitle>{childProfile?.childName} 성향 기록</SectionTitle>
                <SectionWrapper>
                    <RecordWrapper>
                        {childProfile?.childPersonalityHistoryList.slice(0).map((history, index) => (
                            <RecordCard
                                key={index}
                                bgColor={history.historyCreatedType === "DIAGNOSIS" ? "#D0E8FF" : "#F3F3F3"}
                            >
                                <RecordImage src={`data:image/jpeg;base64,${history.mbtiImage}`} alt="Record" />
                                <RecordText>
                                    <h4>{history.mbti}</h4>
                                    <RecordMbtiTitle>{history.mbtiTitle}</RecordMbtiTitle>
                                </RecordText>
                                <RecordTo>
                                <RecordButton onClick={() => handleRecordClick(history.historyId, history.historyCreatedType)}>상세보기</RecordButton>
                                <RecordDate>
                                {new Date(history.createdAt).toLocaleDateString('ko-KR').replace(/\.$/, '')}
                              </RecordDate>                               
                               </RecordTo>
                                                              
                            </RecordCard>
                        ))}
                    </RecordWrapper>
                </SectionWrapper>

                <SectionTitle>좋아요 한 책 목록</SectionTitle>
                <BookGrid>
                    {childProfile?.bookLikeList.map((book: BookLike) => (
                        <BookImageCard key={book.bookId} onClick={() => handleBookClick(book.bookId)}>
                            <BookImage src={`data:image/jpeg;base64,${book.bookImage}`} alt="Book Cover" />
                        </BookImageCard>
                    ))}
                </BookGrid>
            </ChildProfileDetailContainer>
        </Container>
    );
};

export default ChildProfile;

// 스타일링
const ChildProfileDetailContainer = styled.div`
  margin-top: 30px;
  width: 90%;
`;

const ProfileCard = styled.div<{ bgColor: string }>`
  width: 100%;
  background-color: ${(props) => props.bgColor};
  border-radius: 12px;
  padding: 30px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 20px;
`;

const ProfileText = styled.div`  
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin: 4px 0 0;
    font-size: 14px;
    color: #888888;
  }
`;

const ProfileMbti = styled.h1`
  margin:0;
  font-weight: 900;
`

const SectionWrapper = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  color: #757575;
  margin: 5px;
  padding-left: 5px;
  text-align: left;
`;

const RecordWrapper = styled.div`
  max-height: 320px;
  overflow-y: auto;
`;

const RecordCard = styled.div<{ bgColor: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.bgColor};
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 10px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const RecordImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const RecordText = styled.div`
  flex-grow: 1;
  text-align: center;
  display: flex;
  gap: 12px;
  margin-left: 10px;
  h4 {
    margin: 0;
    font-size: 20px;
  }

  p {
    margin: 2px 0;
  }
`;

const RecordMbtiTitle = styled.p`
  font-size: 14px;
  color: #8a8a8a;
`

const RecordTo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const RecordButton = styled.span`
  width: 60px;
  height: 20px;
  background-color: #ffffff;
  text-align: center;
  border-radius: 20px;
  padding: 3px;
  font-size:12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const RecordDate = styled.p`
  margin: 2px;
  font-size: 10px;
  color: #888888;
`;

const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 10px;
  width: 100%;
`;

const BookImageCard = styled.div`
  cursor: pointer;
`;

const BookImage = styled.img`
    width: 100px;
    height: 150px;
    border-radius: 12px;
    background-color: white;
    object-fit: cover;
    padding: 10px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;