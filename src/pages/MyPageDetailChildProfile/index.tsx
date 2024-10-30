import { Container } from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

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

    const {child} = location.state;
    // console.log("넘어온 자녀정보", child);
    const [childProfile, setChildProfile] = useState<ChildProfile>();

    const fetchChildProfile = async (childProfileId: number) => {
        try {
            const response = await axios.get(`/kkumteul/api/childProfiles/${childProfileId}`);
            setChildProfile(response.data.response);
            // console.log("히스토리 정보:",response.data.response);             
        } catch (error) {
            console.error("Error fetching child profile:", error);
        }
    };

    useEffect(() => {
        if (child) {
            fetchChildProfile(child.childProfileId);
          }
    },[child])

    console.log(childProfile);


    const handleRecordClick = (recordId: number) => {
        navigate(`/record/${recordId}`);
    };

    const handleBookClick = (bookId: number) => {
        navigate(`/booklist/${bookId}`);
    }

    const latestPersonality = childProfile?.childPersonalityHistoryList[0]; // 가장 최신 성향 히스토리 기록

    return (
        <Container color="#f3f3f3">
            <Header textcolor="#000000" color="#f3f3f3" nextBtnImageUrl="/assets/home.svg" title="내 자녀 프로필"
                    nextPage="/" />

            <ChildProfileDetailContainer>
                {/* 가장 최신 성향 기록 */}
                {latestPersonality && (
                    <ProfileCard onClick={() => handleRecordClick(latestPersonality.historyId)}>
                        {/* src={`data:image/jpeg;base64,${book.bookImage}`} */}
                        <ProfileImage src={`data:image/jpeg;base64,${latestPersonality.mbtiImage}`} alt="Character" />
                        <ProfileText>
                            <h3>{latestPersonality.mbti}</h3>
                            <p>{latestPersonality.mbtiTitle}</p>
                        </ProfileText>
                    </ProfileCard>
                )}

                <SectionTitle>{childProfile?.childName} 성향 기록</SectionTitle>
                <SectionWrapper>
                    <RecordWrapper>
                        {childProfile?.childPersonalityHistoryList.slice(1).map((history, index) => (
                            <RecordCard key={index} onClick={() => handleRecordClick(history.historyId)}>
                                <RecordImage src={`data:image/jpeg;base64,${history.mbtiImage}`} alt="Record" />
                                <RecordText>
                                    <h4>{history.mbti}</h4>
                                    <p>{history.mbtiTitle}</p>
                                </RecordText>
                                <RecordDate>{new Date(history.createdAt).toLocaleDateString()}</RecordDate>
                            </RecordCard>
                        ))}
                    </RecordWrapper>
                </SectionWrapper>

                <SectionTitle>좋아요 한 책 목록</SectionTitle>
                <BookGrid>
                    {childProfile?.bookLikeList.map((book:BookLike) => (
                        <BookCard key={book.bookId} onClick={() => handleBookClick(book.bookId)}>
                        <BookImage src={`data:image/jpeg;base64,${book.bookImage}`} alt="Book Cover" />
                            <BookTitle>{book.bookTitle}</BookTitle>
                        </BookCard>
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
`
const ProfileCard = styled.div`
  width: 100%;
  background-color: #FFD869;
  border-radius: 12px;
  padding: 30px;
  display: flex;
  align-items: center;
  margin-bottom: 20px; 
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 20px;
`;

const ProfileText = styled.div`
  h3 {
    margin: 0;
    font-size: 24px;
  }

  p {
    margin: 4px 0 0;
    font-size: 14px;
    color: #888888;
  }
`;

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
  box-sizing: border-box;
  width: calc(100% - 3px);
`;

const RecordWrapper = styled.div`
  max-height: 320px;
  overflow-y: auto;
`;

const RecordCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
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

  h4 {
    margin: 0;
    font-size: 20px;
  }

  p {
    margin: 2px 0;
  }
`;

const RecordDate = styled.p`
  margin: 0;
  font-size: 14px;
  color: #888888;
`;

const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 10px;
  width: 100%;
`;

const BookCard = styled.div`
  background-color: white;
  border-radius: 12px;
  width: 90%;
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

const BookImage = styled.img`
  width: 80%;
  height: auto;
  margin: 10px 0;
  border-radius: 12px;
`;

const BookTitle = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: #757575;
`;
