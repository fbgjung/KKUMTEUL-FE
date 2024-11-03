import styled from 'styled-components';
import {Container, Button} from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import {useNavigate, useLocation} from 'react-router-dom';
import ProgressLine from '../../components/surveyresult/ProgressLine';
import axios from 'axios';

const Index = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const surveyResult = location.state?.response;

    if (!surveyResult) {
        return <p>결과 데이터를 불러올 수 없습니다.</p>;
    }

    const handleReSurveyButton = async () => {
        const childProfileId = parseInt(sessionStorage.getItem('childProfileId') || '0');

        try {
            await axios.delete(`/kkumteul/api/survey?childProfileId=${childProfileId}`);
            navigate('/survey');
        } catch (error) {
            console.error("Error deleting survey result:", error);
        }
    };

    const calculateIsReverse = (left: string, right: string) => {
        const leftValue = parseInt(left);
        const rightValue = parseInt(right);
        return leftValue < rightValue;
    };

    const calculateAge = (birthDate:string) => {
        const birth = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDifference = today.getMonth() - birth.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    const formattedData = {
        jpercent: surveyResult.jpercent.toFixed(0),
        ppercent: surveyResult.ppercent.toFixed(0),
        fpercent: surveyResult.fpercent.toFixed(0),
        tpercent: surveyResult.tpercent.toFixed(0),
        ipercent: surveyResult.ipercent.toFixed(0),
        epercent: surveyResult.epercent.toFixed(0),
        npercent: surveyResult.npercent.toFixed(0),
        spercent: surveyResult.spercent.toFixed(0)
    };

    const formatImageSrc = (imageData: string) => {
        return imageData ? `data:image/png;base64,${imageData}` : '/assets/dog.svg';
    };


    return (
        <Container color="#fdf8d7">
            <Header textcolor="#000000" color="#fdf8d7" nextBtnImageUrl="/assets/home.svg" title="진단 결과" nextPage='/'/>
            <SurveyContainer>
                <MbtiSection>
                    <MbtiImage src={formatImageSrc(surveyResult.mbtiResult?.mbtiImage) || "/assets/default-mbti.png"} alt="MBTI 이미지"/>
                    <MbtiInfo>
                        <MbtiTitle>{surveyResult.mbtiResult?.mbtiName}</MbtiTitle>
                        <MbtiText>{surveyResult.mbtiResult?.mbtiTitle}</MbtiText>
                        <MbtiDate>진단일: {new Date(surveyResult.diagnosisDate).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</MbtiDate>
                    </MbtiInfo>
                </MbtiSection>

                <ProfileSection>
                    <ProfileImage src={formatImageSrc(surveyResult.profileImage)}/>
                    <ProfileInfo>
                        <ChildName>{surveyResult.childName}</ChildName>
                        <ChildBirth
                            $color='#000000'>
                            {new Date(surveyResult.childBirthDate).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </ChildBirth>
                        <ChildBirth $color='#757575'>
                            {calculateAge(surveyResult.childBirthDate)}살
                        </ChildBirth>
                    </ProfileInfo>
                </ProfileSection>

                <ResultSection>
                    <Title>MBTI 전반적인 특징은?</Title>
                    <MbtiDescription>{surveyResult.mbtiResult?.mbtiDescription}</MbtiDescription>

                    <Title>성향 상세 분석</Title>
                    <Graph>
                        <Type>
                            <TypeInfoContainer>
                                <Image src='/assets/e.png'/>
                                <TypeInfo>외향형</TypeInfo>
                                <TypeInfo>{formattedData.epercent}%</TypeInfo>
                            </TypeInfoContainer>
                            <ProgressLine
                                isReverse={calculateIsReverse(formattedData.epercent, formattedData.ipercent)}
                                percentage={formattedData.epercent}
                            />
                            <TypeInfoContainer>
                                <Image src='/assets/i.png'/>
                                <TypeInfo>내향형</TypeInfo>
                                <TypeInfo>{formattedData.ipercent}%</TypeInfo>
                            </TypeInfoContainer>
                        </Type>

                        <Type>
                            <TypeInfoContainer>
                                <Image src='/assets/n.png'/>
                                <TypeInfo>직관형</TypeInfo>
                                <TypeInfo>{formattedData.npercent}%</TypeInfo>
                            </TypeInfoContainer>
                            <ProgressLine
                                isReverse={calculateIsReverse(formattedData.npercent, formattedData.spercent)}
                                percentage={formattedData.npercent}
                            />
                            <TypeInfoContainer>
                                <Image src='/assets/s.png'/>
                                <TypeInfo>현실형</TypeInfo>
                                <TypeInfo>{formattedData.spercent}%</TypeInfo>
                            </TypeInfoContainer>
                        </Type>

                        <Type>
                            <TypeInfoContainer>
                                <Image src='/assets/t.png'/>
                                <TypeInfo>사고형</TypeInfo>
                                <TypeInfo>{formattedData.tpercent}%</TypeInfo>
                            </TypeInfoContainer>
                            <ProgressLine
                                isReverse={calculateIsReverse(formattedData.tpercent, formattedData.fpercent)}
                                percentage={formattedData.tpercent}
                            />
                            <TypeInfoContainer>
                                <Image src='/assets/f.png'/>
                                <TypeInfo>감정형</TypeInfo>
                                <TypeInfo>{formattedData.fpercent}%</TypeInfo>
                            </TypeInfoContainer>
                        </Type>

                        <Type>
                            <TypeInfoContainer>
                                <Image src='/assets/j.png'/>
                                <TypeInfo>판단형</TypeInfo>
                                <TypeInfo>{formattedData.jpercent}%</TypeInfo>
                            </TypeInfoContainer>
                            <ProgressLine
                                isReverse={calculateIsReverse(formattedData.jpercent, formattedData.ppercent)}
                                percentage={formattedData.jpercent}
                            />
                            <TypeInfoContainer>
                                <Image src='/assets/p.png'/>
                                <TypeInfo>탐색형</TypeInfo>
                                <TypeInfo>{formattedData.ppercent}%</TypeInfo>
                            </TypeInfoContainer>
                        </Type>
                    </Graph>


                    <Title>아이의 선호 장르</Title>
                    <InterestList>
                        {surveyResult.favoriteGenres.map((genre, index) => (
                            <List key={index}>
                                <Image src={formatImageSrc(genre.image) || '/assets/sports.png'} alt={genre.name}/>
                                <Name>{genre.name}</Name>
                            </List>
                        ))}
                    </InterestList>


                    <Title>아이의 관심사</Title>
                    <InterestList>
                        {surveyResult.favoriteTopics.map((topic, index) => (
                            <List key={index}>
                                <Image src={formatImageSrc(topic.image) || '/assets/sports.png'} alt={topic.name}/>
                                <Name>{topic.name}</Name>
                            </List>
                        ))}
                    </InterestList>
                </ResultSection>

                <ReSurveyButton color="#FFFFFF" backcolor='#fee208' onClick={handleReSurveyButton}>
                    다시 진단하기
                </ReSurveyButton>
            </SurveyContainer>
        </Container>
    );
};

export default Index;

const SurveyContainer = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const MbtiSection = styled.div`
    background-color: #b0c8f9;
    width: 100%;
    margin: 10px 0;
    padding: 0 0 0 50px;
    display: flex;
    border-radius: 10px;
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.03);
    align-items: center;
`

const MbtiImage = styled.img`
    width: 130px;
    height: 130px;
    background-size: contain;
`

const MbtiInfo = styled.div`
    width: 100%;
    padding: 30px;
`

const MbtiTitle = styled.span`
    font-size: 60px;
    font-weight: 700;
    color: #77a5fe;
    text-shadow: -1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white;
`

const MbtiText = styled.p`
    margin: 4px 0;
`

const MbtiDate = styled.p`
    font-size: 12px;
    margin: 0;
`

const ProfileSection = styled.div`
    background-color: #FFFFFF;
    width: 100%;
    margin: 10px 0;
    padding: 20px 0;
    display: flex;
    border-radius: 10px;
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.03);
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;
`

const ProfileImage = styled.img`
    width: 64px;
    height: 64px;
    background-size: contain;
`

const ProfileInfo = styled.div`
    width: 200px;
    text-align: center;
`

const ChildName = styled.p`
    font-weight: 700;
    font-size: 18px;
    margin: 10px 0 0 0;
`

const ChildBirth = styled.span<{ $color: string }>`
    margin-right: 6px;
    color: ${({$color}) => $color};
    font-size: 14px;
`

const ResultSection = styled.div`
    background-color: #fdf8d7;
    width: 90%;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const Title = styled.h3`
    margin: 40px 0 0 0;
    width: 100%;
    font-size: 24px;
    font-family: Ownglyph_meetme-Rg, sans-serif, Arial;

`

const MbtiDescription = styled.p`
    margin: 10px 0 0 0;
`

const Graph = styled.div`
    width: 100%;
    background-color: #fdf8d7;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const Type = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    width: 100%;
`

const TypeInfo = styled.p`
    margin: 0;
    font-size: 12px;
`

const TypeInfoContainer = styled.span`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 10px;
    width: 70px;
`;

const Image = styled.img`
    width: 40px;
    height: 40px;
    margin: 8px;
`

const InterestList = styled.div`
    width: 100%;
    height: auto;
    background-color: #ffffff;
    display: flex;
    flex-wrap: wrap;
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.03);
    border-radius: 20px;
    margin-top: 10px;
    align-items: center;
    padding: 10px 0 10px 20px;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 15%;
`

const Name = styled.p`
    margin: 0;
    font-size: 12px;
`

const ReSurveyButton = styled(Button)`
    width: 90%;
    margin: 40px 0;
`