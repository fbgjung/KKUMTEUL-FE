import React, { useState } from 'react'; //241017
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Input } from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import styled from 'styled-components';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/login', {
                username,
                password,
            });
            localStorage.setItem('accessToken', response.data.accessToken);
            navigate('/');
        } catch (error) {
            console.error('Login failed', error);
            alert('로그인 실패');
        }
    };

    return (
        <LoginContainer>
            <FixedHeader textcolor="#000000" color="#FDDC69" nextBtnImageUrl="/assets/home.svg" title="로그인" nextPage="/" />
            <ContentContainer>
                <CharacterWrapper>
                    <CharacterImage src="/assets/character.png" alt="character" />
                </CharacterWrapper>
                <Form onSubmit={handleLogin}>
                    <InputStyled placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <InputStyled placeholder="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <ButtonStyled type="submit">로그인</ButtonStyled>
                </Form>
                <SignUpLink onClick={() => navigate('/signup')}>회원가입하러 가기</SignUpLink>
            </ContentContainer>
        </LoginContainer>
    );
};

export default Login;

const LoginContainer = styled(Container)`
    max-width: 600px;
    margin: 0 auto;
    background-color: #FDDC69;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const FixedHeader = styled(Header)`
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    font-size: 32px;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 90px;
    padding-bottom: 20px;
`;

const CharacterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 35px;
`;

const CharacterImage = styled.img`
    width: 150px;
    height: 150px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const InputStyled = styled(Input)`
    width: 130%;
    height: 80px;
    margin-bottom: 20px;
    border-radius: 15px;
    padding: 0 25px;
    font-size: 24px;
`;

const ButtonStyled = styled(Button)`
    width: 130%;
    height: 80px;
    background-color: #FFCB05;
    color: #fff;
    border-radius: 15px;
    font-size: 24px;
    margin-bottom: 60px;
`;

const SignUpLink = styled.p`
    margin-top: 10px;
    color: #74A5D0;
    cursor: pointer;
    text-decoration: underline;
    font-size: 18px;
`;

