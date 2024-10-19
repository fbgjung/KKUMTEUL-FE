import {Container, Button, Input} from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const navigate = useNavigate();

    const onClickResultPage = () => {
        navigate('/event/result')
    }
    return(
        <Container color="#f3f3f3">
            <Header textcolor="#000000" color="#f3f3f3" nextBtnImageUrl="/assets/home.svg" title="이벤트" nextPage='/'/>
            <EventContainer>
                <EventBanner>
                    <p>자녀의 성향을 응모해보세요</p>
                    <p>선착순 EVENT</p>
                </EventBanner>

                <ResultSection onClick={onClickResultPage}>
                    <ResultNoticeText>
                        <Bold>응모 결과를 확인해보세요</Bold>
                        <span>응모 다음날 오후 1시에 공개됩니다.</span>
                    </ResultNoticeText>
                    <ResultLink />
                </ResultSection>
                
                <DescriptionSection>
                    <Description>매일 오후 1시부터 오후 11시 59분까지 진행됩니다.</Description>
                    <Description>응모 결과는 다음날 오후 1시에 공개됩니다.</Description>
                    <Description>마이페이지의 이메일 기준으로 당첨 메일이 발송됩니다.</Description>
                </DescriptionSection>

                <InputDiv>
                    <Input placeholder="이름" color="#FFFFFF" inputcolor='#FFFFFF'></Input>
                    <Input placeholder="전화번호" color="#FFFFFF" inputcolor='#FFFFFF'></Input>

                    <Description color="#565656">이벤트에 참여할 이름과 전화번호를 작성해주세요.</Description>
                </InputDiv>

                <JoinEventButton color="#000000" backcolor='#FFD869'>참여</JoinEventButton>
            </EventContainer>
        </Container>
    )
}

export default Index;

const EventContainer = styled.div`
    width:90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`

/* 배너(?) 파란 부분 */
const EventBanner = styled.div`
  width: 100%;
  background-color: #6EA7D0;
  color: #FFFFFF;
  padding: 64px 0;
  font-size: 20px;
  font-weight: bold;
  border-radius:12px;
  margin: 10px 0;
  text-align: center;
  line-height: 12px;
`

// 응모 결과 확인 배너
const ResultSection = styled.div`
  width: 100%;
  background-color : #FFFFFF;
  margin: 10px auto;
  padding: 5%;
  padding-left: 8%;
  border-radius:10px;
  display : flex;
  cursor: pointer;
  align-items: center;
`

const ResultNoticeText = styled.div`
  width:90%;
  display: flex;
  flex-direction: column;
`

const ResultLink = styled.div`
  width: 35px; /* 부모 컨테이너의 너비에 맞게 설정 */
  height: 18px;
  background: no-repeat center/contain url("/assets/navigate_next.svg");
  background-size: contain;
`

const Bold = styled.span`
  font-size: 20px;
  font-weight : 500;
`

// 이벤트 설명
const DescriptionSection = styled.div`
  width: 100%;
  line-height:110%;
  display: flex;
  flex-direction: column;
  margin-top: 5px;

`

const Description = styled.span`
    color:#565656;
    font-size:11px;
    margin-left:10px;
`

// 이벤트 참여
const InputDiv = styled.div`
  width: 100%;
  margin-top:40px;
  padding:10px;
  display: flex;
  flex-direction: column;
  gap: 10px; /* 요소 간의 간격 설정 */ 
  margin-bottom: 100px;
`

const JoinEventButton = styled(Button)`
  width: 100%;
`