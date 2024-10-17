import styled from 'styled-components';
import {Container, Button, Input} from '../../styles/globalStyles';
import Header from '../../components/layout/Header';

const Index = () => {
    return(
        <Container color="#ffffff">
            <Header textcolor="#000000" color="#FFD869" nextBtnImageUrl="/assets/home.svg" title="진단 결과" nextPage='/'/>
            
            <MbtiDiv>
                <LeftDiv>
                    
                </LeftDiv>
                <RightDiv>
                    <MbtiText>
                        ISFJ
                    </MbtiText><br/>
                    <span>친구들을 걱정하며 늘 돌봐주는 작은 수호천사</span><br/>
                    <span>진단일: 2024년 10월 14일</span>
                </RightDiv>
            </MbtiDiv>
            <Profile>
                <ProfileImage></ProfileImage>
                <ProfileDiv>
                    <BoldText>금정</BoldText><br/>
                    <span>2017년 03월 04일</span><br/>
                    <span style={{color:'#757575'}}>8살</span>
                </ProfileDiv>
            </Profile>
            <Div>
                <BoldText>MBTI 전반적인 특징은?</BoldText><br/>
                <MbtiFeatureText>집에서 책읽는 게 최고야~</MbtiFeatureText>
            </Div>
            <Div>
                <BoldText>성향 상세 분석</BoldText>
            </Div>
            <Div>
                <BoldText>아이의 관심사</BoldText>
                <GrayDiv></GrayDiv>
            </Div>
            <Div>
                <BoldText>아이 선호 장르</BoldText>
                <GrayDiv></GrayDiv>
            </Div>
            
            <Button color="#FFFFFF" backcolor='#FFC317'>다시 진단하기</Button>
        </Container>
    )
}

export default Index;

/* MBTI 노란 부분 div */
const MbtiDiv = styled.div`
    background-color:#FFD869;
    width:90%;
    margin:3% 10%;
    padding:3%;
    display:flex;
    border-radius:10px;
`

/* MBTI 노란 부분 왼쪽 이미지 */
const LeftDiv = styled.div`
    width: 130px;
    height:130px;
    background: no-repeat center/contain url("/assets/isfj.svg");
    background-size: contain;
    margin: 3%;
`
/* MBTI 노란 부분 오른쪽 div */
const RightDiv = styled.div`
    width: 100%;
    margin-top: 6%;
    margin-left: 3%;
`

/* MBTI ISFJ 텍스트 */
const MbtiText = styled.span`
    font-size : 40px;
    font-weight : 700;
    color:#FFBD00;
    text-shadow: -1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white;
`

/* 프로필 부분 div */
const Profile = styled.div`
    display:flex;
    justify-content: flex-start; /* 왼쪽 정렬 */
    align-items: center; /* 세로 방향 가운데 정렬 */
    width: 80%; /* 부모의 전체 너비 사용 */
    margin : 5px 5%;
`

/* 프로필 왼쪽 이미지 */
const ProfileImage = styled.div`
    width: 100px;
    height:100px;
    background: no-repeat center/contain url("/assets/dog.svg");
    background-size: contain;
`

/* 프로필 오른쪽 텍스트 */
const ProfileDiv = styled.div`
    width:80%;
    margin-left : 5%;
    line-height:28px;
`
/* 굵은 글씨 (프로필 이름 부분, MBTI 전반적인 특징, 성향 상세 분석) */
const BoldText = styled.span`
    font-weight : 700;
    font-size : 18px;
`

/* MBTI 전반적인 특징은?부터 아래부분 div 이걸로 구분  div */
const Div = styled.div`
    width : 85%;
    margin : 5% 3%;
    padding: 5px;
`

/* 특징 파란 글씨 부분 */
const MbtiFeatureText = styled.span`
    color:#6EA7D0;
    font-weight:600;
`

/* 아이의 관심사, 아이 선호 장르 회색 div */
const GrayDiv = styled.div`
    background-color:#F3F3F3;
    margin-top: 3%;
    border-radius:10px;
    width:100%;
    height:200px;
`

/* */