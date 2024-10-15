// import styled from 'styled-components';
import {Container, Button, Input} from '../../styles/globalStyles';
import Header from '../../components/layout/Header';

const Index = () => {
    return(
        <Container color="#f3f3f3">
            <Header textcolor="#000000" color="#f3f3f3" nextBtnImageUrl="/src/assets/home.svg" title="회원가입" nextPage='/'/>
            <Button color="#FFFFFF" backcolor='#6EA7D0'>Button1</Button>
            <Input placeholder="입력하세요" color="#6EA7D0" inputcolor='#E6E6E6'></Input>
        </Container>
    )
}

export default Index;