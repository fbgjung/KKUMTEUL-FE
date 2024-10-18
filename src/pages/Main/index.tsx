import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Input } from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import styled from 'styled-components';

const SignUp: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConfirm: '',
        name: '',
        nickname: '',
        phone: '',
        birthdate: ''
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        try {
            const response = await axios.post('/api/users/register', formData);
            alert('회원가입 성공');
            navigate('/login');
        } catch (error) {
            console.error('회원가입 실패', error);
            alert('회원가입 실패');
        }
    };

    const handleDuplicateCheck = (field: string) => {
        alert(`${field} 중복 확인 기능 필요`);
    };

    return (
        <SignUpContainer>
            <FixedHeader textcolor="#000000" color="#FDDC69" nextBtnImageUrl="/assets/home.svg" title="회원가입" nextPage="/" />
            <ContentContainer>
                <Form onSubmit={handleSignUp}>
                    <InputWrapper>
                        <InputStyled
                            placeholder="아이디"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <CheckButton type="button" onClick={() => handleDuplicateCheck('아이디')}>중복확인</CheckButton>
                    </InputWrapper>
                    <InputStyled
                        placeholder="비밀번호"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <InputStyled
                        placeholder="비밀번호 확인"
                        name="passwordConfirm"
                        type="password"
                        value={formData.passwordConfirm}
                        onChange={handleChange}
                    />
                    <InputStyled
                        placeholder="이름"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <InputWrapper>
                        <InputStyled
                            placeholder="닉네임"
                            name="nickname"
                            value={formData.nickname}
                            onChange={handleChange}
                        />
                        <CheckButton type="button" onClick={() => handleDuplicateCheck('닉네임')}>중복확인</CheckButton>
                    </InputWrapper>
                    <InputStyled
                        placeholder="전화번호"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <InputStyled
                        placeholder="생년월일 ex)980905"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                    />
                    <ButtonStyled type="submit">회원가입</ButtonStyled>
                </Form>
            </ContentContainer>
        </SignUpContainer>
    );
};

export default SignUp;

const SignUpContainer = styled(Container)`
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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const InputStyled = styled(Input)`
    width: calc(100% - 40px);  // 입력 필드
    height: 55px;
    margin-bottom: 12px;
    border-radius: 12px;
    padding: 0 15px;
    font-size: 16px;
`;

const ButtonStyled = styled(Button)`
    width: calc(100% - 40px);  // 버튼
    height: 60px;
    background-color: #FFCB05;
    color: #fff;
    border-radius: 12px;
    font-size: 18px;
    margin-top: 20px;
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    width: calc(100% - 40px);
    margin-bottom: 12px;
`;

const CheckButton = styled(Button)`
    width: 100px;  // 중복확인 버튼
    height: 55px;
    background-color: #FFCB05;
    color: white;
    margin-left: 10px;
    border-radius: 12px;
    font-size: 16px;
`;
