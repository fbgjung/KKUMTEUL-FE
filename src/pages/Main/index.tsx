import styled from 'styled-components';
import {Container, Button, Input } from '../../styles/globalStyles';
import Header from '../../components/layout/Header';

const Index = () => {
    return(
        <Container color="#f3f3f3">
            <Header textcolor="#000000" color="#FFD869" nextBtnImageUrl="/assets/home.svg" title="꿈틀" nextPage='/mypage'/>
            <Image/>
            <Image/>
            <Image/>
            <Image/>
            <Image/>
            <Image/>
            <Image/>
            <Image/>
            <Image/>
            {/* color: 글자 색상, backcolor: 버튼 백그라운드 색상 */}
            <Button color="#FFFFFF" backcolor='#6EA7D0'>Button1</Button>
            <Button color="#000000" backcolor='#FFD869'>Button2</Button>
            {/* color: 클릭 테두리 색상, inputcolor: input 영역 색상*/}
            <Input placeholder="입력" color="#6EA7D0" inputcolor='#E6E6E6'></Input>
            <Input placeholder="입력" color="#FFD869" inputcolor='#FFFFFF'></Input>
        </Container>
    )
}

export default Index;

const Image = styled.div`
  width: 100%; /* 부모 컨테이너의 너비에 맞게 설정 */
  height: 100px;
  background: no-repeat center/contain url("/assets/main_test_image.svg");
  background-size: contain;
`