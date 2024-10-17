import styled from 'styled-components';
import {Container, Button} from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import { useNavigate } from 'react-router-dom';
import ProgressLine from '../../components/surveyresult/ProgressLine.tsx';


const Index = () => {
  const navigate = useNavigate();

  const handleReSurveyButton = () => {
    navigate('/survey');
  }

  const data = [
    {id: 0, mbti: 'ISFJ', I: '80%', E: '20%', S: '55%', N: '45%', F:'70%', T:'30%', P:'20%', J:'80%'}
  ]

  const interestGenre = [
    {id:0, name: '만화', image: '/assets/book.png'},
    {id:1, name: '자연', image: '/assets/book.png'},
  ]

  const interestKeyWord = [
    {id:0, name: '사랑', image: '/assets/survey.png'},
    {id:1, name: '동물', image: '/assets/survey.png'},
  ]

  // 프로그래스 바 색상 반전을 위한 퍼센트 비교
  const calculateIsReverse = (left: string, right: string) => {
    const leftValue = parseInt(left);
    const rightValue = parseInt(right);
    return leftValue < rightValue;
  };

    return(
      <Container color="#FFFFFF">
        <Header textcolor="#000000" color="#FFD869" nextBtnImageUrl="/assets/home.svg" title="진단 결과" nextPage='/'/>
        <MbtiSection>
          <MbtiImage />
          <MbtiInfo>
              <MbtiTitle>{data[0].mbti}</MbtiTitle>
              <MbtiText>친구들을 걱정하며 늘 돌봐주는 작은 수호천사</MbtiText>
              <MbtiDate>진단일: 2024년 10월 14일</MbtiDate>
          </MbtiInfo>
        </MbtiSection>
        <ProfileSection>
            <ProfileImage />
            <ProfileInfo>
              <ChildName>금정</ChildName>
              <ChildBirth $color='#000000'>2017년 03월 04일</ChildBirth>
              <ChildBirth $color='#757575'>8살</ChildBirth>
            </ProfileInfo>
        </ProfileSection>
        <ResultSection>
          <Title>MBTI 전반적인 특징은?</Title>
          <MbtiDescription>아이들은 보호자와 함께 책을 읽으며 교감하고 싶어해요. 
              ISFJ 성향의 아이들은 특히 보호자와의 친밀한 시간을 소중히 여기며, 
              독서를 통해 깊은 유대감을 형성할 수 있어요. 
              부모님과 함께 독서 여행을 떠난다면 더욱 즐거워할 거예요. 
              (조용하고 세심한 아이들은 독서 습관을 길러 더욱 풍부한 내면 세계를 키울 수 있답니다.)
          </MbtiDescription>

          <Title>성향 상세 분석</Title>
          <Graph>
            <Type>
              <TypeInfoContainer>
                <Image src='/assets/e.png' />
                <TypeInfo>외향형</TypeInfo>
                <TypeInfo>{data[0].E}</TypeInfo>
              </TypeInfoContainer>
              <ProgressLine isReverse={calculateIsReverse(data[0].E, data[0].I)} percentage={data[0].E} />
              <TypeInfoContainer>
              <Image src='/assets/i.png' />
                <TypeInfo>내향형</TypeInfo>
                <TypeInfo>{data[0].I}</TypeInfo>
              </TypeInfoContainer>
              </Type>

              <Type>
                <TypeInfoContainer>
                <Image src='/assets/n.png' />
                    <TypeInfo>직관형</TypeInfo>
                    <TypeInfo>{data[0].N}</TypeInfo>
                  </TypeInfoContainer>
                  <ProgressLine isReverse={calculateIsReverse(data[0].N, data[0].S)} percentage={data[0].N} />
                  <TypeInfoContainer>
                  <Image src='/assets/s.png' />
                    <TypeInfo>현실주의형</TypeInfo>
                    <TypeInfo>{data[0].S}</TypeInfo>
                </TypeInfoContainer>
              </Type>

              <Type>
                <TypeInfoContainer>
                <Image src='/assets/f.png' />
                    <TypeInfo>이성적사고형</TypeInfo>
                    <TypeInfo>{data[0].F}</TypeInfo>
                  </TypeInfoContainer>
                  <ProgressLine isReverse={calculateIsReverse(data[0].F, data[0].T)} percentage={data[0].F} />
                  <TypeInfoContainer>
                  <Image src='/assets/t.png' />
                    <TypeInfo>원칙주의형</TypeInfo>
                    <TypeInfo>{data[0].T}</TypeInfo>
                </TypeInfoContainer>
              </Type>

              <Type>
                <TypeInfoContainer>
                <Image src='/assets/j.png' />
                    <TypeInfo>계획형</TypeInfo>
                    <TypeInfo>{data[0].J}</TypeInfo>
                  </TypeInfoContainer>
                  <ProgressLine isReverse={calculateIsReverse(data[0].J, data[0].P)} percentage={data[0].J} />
                  <TypeInfoContainer>
                  <Image src='/assets/p.png' />
                    <TypeInfo>탐색형</TypeInfo>
                    <TypeInfo>{data[0].P}</TypeInfo>
                </TypeInfoContainer>
              </Type>
            </Graph>

          <Title>아이의 선호 장르</Title>
          <InterestList>
            {interestGenre.map((genre)=> (
              <List key={genre.id}>
                <Image src={genre.image}></Image>
                <Name>{genre.name}</Name>
              </List>
            ))}
          </InterestList>

          <Title>아이의 관심사</Title>
          <InterestList>
          {interestKeyWord.map((keyword)=> (
              <List key={keyword.id}>
                <Image src={keyword.image}></Image>
                <Name>{keyword.name}</Name>
              </List>
            ))}
          </InterestList>
        </ResultSection>
        <ReSurveyButton color="#FFFFFF" backcolor='#FFC317' onClick={handleReSurveyButton}>다시 진단하기</ReSurveyButton>
      </Container>
    )
}

export default Index;

const MbtiSection = styled.div`
  background-color:#FFC317;
  width: 90%;
  margin: 10px 0;
  padding: 0 0 0 50px;
  display:flex;
 border-radius:10px;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.03);
  align-items: center;
`

const MbtiImage = styled.div`
  width: 130px;
  height:130px;
  background: no-repeat center/contain url("/assets/isfj.png");
  background-size: contain;
`

const MbtiInfo = styled.div`
  width: 100%;
  padding: 30px;
`

const MbtiTitle = styled.span`
  font-size : 60px;
  font-weight : 700;
  color:#ff6f00;
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
  background-color:#FFFFFF;
  width: 90%;
  margin: 10px 0;
  padding: 20px 0;
  display:flex;
  border-radius:10px;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.03);
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
`

const ProfileImage = styled.div`
  width: 64px;
  height:64px;
  background: no-repeat center/contain url("/assets/dog.svg");
  background-size: contain;
`

const ProfileInfo = styled.div`
  width: 200px;
  text-align: center;
`

const ChildName = styled.p`
  font-weight : 700;
  font-size : 18px;
  margin: 10px 0 0 0;
`

const ChildBirth = styled.span<{$color:string}>`
  margin-right: 6px;
  color: ${({ $color }) => $color};
  font-size: 14px;
`

const ResultSection = styled.div`
  background-color: #ffffff;
  width: 90%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Title = styled.h3`
  margin: 60px 0 0 0;
  width: 100%;
`

const MbtiDescription = styled.p`
  margin: 10px;
`

const Graph = styled.div`
  width: 100%;
  background-color: #ffffff;
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
  height: 100px;
  background-color: #f3f3f3;
  display: flex;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.03);
  border-radius: 20px;
  margin-top: 14px;
  align-items: center;
  padding: 0 0 0 20px;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Name = styled.p`
 margin: 0;
 font-size: 12px;
`

const ReSurveyButton = styled(Button)`
  width: 90%;
  margin: 30px 0;
`