import {Container, Button, Input} from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
//#6EA7D0
const Index = () => {
    const navigate = useNavigate();

    const onClickResultPage = () => {
        navigate('/event/result')
    }
    return(
        <Container color="#f3f3f3">
            <Header textcolor="#000000" color="#f3f3f3" nextBtnImageUrl="/assets/home.svg" title="이벤트" nextPage='/'/>
                <MyContainer>
                    <BannerDiv>
                        <p>자녀의 성향을 응모해보세요</p>
                        <p>선착순 EVENT</p>
                    </BannerDiv>

                    <ResultDiv onClick={onClickResultPage}>
                        <ResultDivL>
                            <Bold>응모 결과를 확인해보세요</Bold> <br/>
                            <span>응모 다음날 오후 1시에 공개됩니다.</span>
                        </ResultDivL>
                        <ResultDivR>
                            <Icon></Icon>
                        </ResultDivR>
                    </ResultDiv>
                    
                    <LeftDiv>
                        <Description>매일 오후 1시부터 오후 11시 59분까지 진행됩니다.</Description><br/>
                        <Description>응모 결과는 다음날 오후 1시에 공개됩니다.</Description><br/>
                        <Description>마이페이지의 이메일 기준으로 당첨 메일이 발송됩니다.</Description><br/>
                    </LeftDiv>

                    <InputDiv>
                        <Input placeholder="이름" color="#FFFFFF" inputcolor='#FFFFFF'></Input>
                        <Input placeholder="전화번호" color="#FFFFFF" inputcolor='#FFFFFF'></Input>

                        <Description color="#565656">이벤트에 참여할 이름과 전화번호를 작성해주세요.</Description>
                    </InputDiv>

                    <Button color="#000000" backcolor='#FFD869'>참여</Button>
                </MyContainer>
        </Container>
    )
}

export default Index;

/* 배너(?) 파란 부분 */
const BannerDiv = styled.div`
    width : 100%;
    background-color: #6EA7D0;
    color: #FFFFFF;
    padding: 15% 10%;
    font-size: x-large;
    font-weight: 700;
    border-radius:10px;
    margin: 10px auto;
    text-align:center;
    line-height:50%;
`
/* 응모 결과 부분 div */
const ResultDiv = styled.div`
    width : 100%;
    background-color : #FFFFFF;
    margin: 10px auto;
    padding: 5%;
    padding-left: 8%;
    border-radius:10px;
    display : flex;
    cursor: pointer;
`

/* 응모 결과 부분 글자 div */
const ResultDivL = styled.div`
    width:90%;
`
/* 응모 결과 부분 아이콘 div */
const ResultDivR = styled.div`
    width:10%;
    display:flex;
    align-items : center;
`
/* 아이콘 > */
const Icon = styled.div`
  width: 35px; /* 부모 컨테이너의 너비에 맞게 설정 */
  height: 18px;
  background: no-repeat center/contain url("/assets/navigate_next.svg");
  background-size: contain;
`
/* 응모 결과를 확인해보세요 span */
const Bold = styled.span`
    font-size: 20px;
    font-weight : 500;
`
/* 설명 div (왼쪽으로 조금 치우쳐 있어서) */
const LeftDiv = styled.div`
    width:100%;
    margin:5px;
    line-height:110%;

`

/* 설명 span */
const Description = styled.span`
    color:#565656;
    font-size:11px;
    margin-left:15px;

`

/* 이름, 전화번호, 설명 div */
const InputDiv = styled.div`
    width:83%;
    margin-top:40px;
    padding:10px;
    display: flex;
    flex-direction: column;
    gap: 10px; /* 요소 간의 간격 설정 */ 
    margin-bottom: 30%;
`


/* 컨테이너 건드리기 무서워서 일단 이렇게 함 */
const MyContainer = styled.div`
    width:80%;
    height:100vh;
`