// import styled from 'styled-components';
import {AdminContainer, Button, Input} from '../../../styles/globalStyles';
import Header from '../../../components/layout/Header';

const Index = () => {
    return(
        <AdminContainer color="#f3f3f3">
            <Header textcolor="#000000" color="#f3f3f3" nextBtnImageUrl="null" title="도서 목록" nextPage='null'/>
            <Button color="#FFFFFF" backcolor='#6EA7D0'>Button1</Button>
            <Input placeholder="입력하세요" color="#6EA7D0" inputcolor='#E6E6E6'></Input>
        </AdminContainer>
    )
}

export default Index;