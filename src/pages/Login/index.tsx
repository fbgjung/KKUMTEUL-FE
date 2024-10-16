import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AdminContainer, Button, Input } from '../../styles/globalStyles';
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

// 스타일 컴포넌트
const LoginContainer = styled(AdminContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #FDDC69;
    height: 100vh;
    padding: 0;
    position: relative;
    max-width: 600px;
    margin: 0 auto;
`;

const FixedHeader = styled(Header)`
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 40px;
    padding-bottom: 20px;
    flex-grow: 1;
`;

const CharacterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 40px;
`;

const CharacterImage = styled.img`
    width: 120px;
    height: 120px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 100px;
`;

const InputStyled = styled(Input)`
    width: 80%;
    height: 50px;
    margin-bottom: 15px;
    border-radius: 10px;
    padding: 0 15px;
    font-size: 16px;
`;

const ButtonStyled = styled(Button)`
    width: 80%;
    height: 50px;
    background-color: #FFCB05;
    color: #fff;
    border-radius: 10px;
    font-size: 18px;
    margin-bottom: 50px;
`;

const SignUpLink = styled.p`
    margin-top: auto;
    color: #74A5D0;
    cursor: pointer;
    text-decoration: underline;
    margin-bottom: 20px;
    position: absolute;
    bottom: 10px;
`;