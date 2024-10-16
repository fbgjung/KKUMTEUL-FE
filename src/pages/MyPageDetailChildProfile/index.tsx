import {Container} from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

const ChildProfile = () => {
    const navigate = useNavigate();

    const handleRecordClick = (recordId: number) => {
        navigate(`/record/${recordId}`); // 성향 기록 상세 페이지로 이동
    };

    const handleBookClick = (bookId: number) => {
        navigate(`/book-detail/${bookId}`); // 책 상세 페이지로 이동
    };

    return (
        <Container color="#f3f3f3">
            <Header textcolor="#000000" color="#f3f3f3" nextBtnImageUrl="/assets/home.svg" title="내 자녀 프로필"
                    nextPage="/"/>

            <ProfileCard>
                <ProfileImage src="/assets/MBTIImg.svg" alt="Character"/>
                <ProfileText>
                    <h3>ISFJ</h3>
                    <p>용감한 수호자</p>
                </ProfileText>
            </ProfileCard>

            <SectionTitle>민정이의 성향 기록</SectionTitle>
            <SectionWrapper>
                <RecordWrapper>
                    {[1, 2].map((id) => (
                        <RecordCard key={id} onClick={() => handleRecordClick(id)}>
                            <RecordImage src="/assets/MBTIImg.svg" alt="Record"/>
                            <RecordText>
                                <h4>ESFJ</h4>
                            </RecordText>
                            <RecordDate>24.10.14 월</RecordDate>
                        </RecordCard>
                    ))}

                    {[1, 2].map((id) => (
                        <RecordCard key={id} onClick={() => handleRecordClick(id)}>
                            <RecordImage src="/assets/MBTIImg.svg" alt="Record"/>
                            <RecordText>
                                <h4>ISFJ</h4>
                            </RecordText>
                            <RecordDate>24.10.15 화</RecordDate>
                        </RecordCard>
                    ))}

                    {[1].map((id) => (
                        <RecordCard key={id} onClick={() => handleRecordClick(id)}>
                            <RecordImage src="/assets/MBTIImg.svg" alt="Record"/>
                            <RecordText>
                                <h4>ISFP</h4>
                            </RecordText>
                            <RecordDate>24.10.16 수</RecordDate>
                        </RecordCard>
                    ))}
                </RecordWrapper>
            </SectionWrapper>

            <SectionTitle>좋아요 한 책 목록</SectionTitle>
            <BookGrid>
                {[1, 2, 3, 4, 5, 6, 7].map((bookId) => (
                    <BookCard key={bookId} onClick={() => handleBookClick(bookId)}>
                        <BookImage src={`/assets/bookExampleImg.svg`} alt="Book Cover"/>
                        <BookTitle>구름 버스 둥둥</BookTitle>
                    </BookCard>
                ))}
            </BookGrid>
        </Container>
    );
};

export default ChildProfile;

// 스타일링
const ProfileCard = styled.div`
    width: 100%;
    background-color: #FFD869;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
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
    width: 600px;
    background-color: white;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
    font-size: 14px;
    color: #757575;
    position: relative;
    left: -30%;
    transform: translateX(-50%);
    padding: 0;
    margin-bottom: 5px;
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
    width: 600px;
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
