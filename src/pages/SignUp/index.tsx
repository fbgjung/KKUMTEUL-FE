import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Container, Button, Input} from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import styled from 'styled-components';
import AlertModal from '../../modal/AlertModal';


const SignUp: React.FC = () => {
    const [isAlertModalOpen, setAlertModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string>("");


    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConfirm: '',
        name: '',
        nickName: '',
        phoneNumber: '',
        birth: ''
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.passwordConfirm) {
            setAlertModalOpen(true);
            setAlertMessage("비밀번호가 일치하지 않아요!")
            return;
        }
        try {
            await axios.post('/kkumteul/api/users/register', formData);
            setAlertModalOpen(true);
            setAlertMessage("꿈틀 회원가입 성공!")

            setTimeout(() => {
                navigate('/login');
              }, 1000);
        } catch (error) {
            console.error('회원가입에 실패하였습니다.', error);
            alert('회원가입에 실패하였습니다.');
        }
    };

    const handleDuplicateCheck = async (field: string) => {
        try {
            let apiUrl = '';
            if (field === '아이디') {
                apiUrl = `/kkumteul/api/users/duplicate/username/${formData.username}`;
            } else if (field === '닉네임') {
                apiUrl = `/kkumteul/api/users/duplicate/nickname/${formData.nickName}`;
            }

            const response = await axios.get(apiUrl);
            if (response.data.response === true) {
                // alert(`${field}가 이미 사용 중입니다.`);
                setAlertModalOpen(true);
                setAlertMessage(`이미 사용중인 ${field}에요`)
            } else {
                setAlertModalOpen(true);
                setAlertMessage(`사용할 수 있는 ${field}이에요`)
            }
        } catch (error) {
            console.error(`${field} 중복 확인 오류`, error);
            alert(`${field} 중복 확인에 실패하였습니다.`);
        }
    };

    const handleCloseAlertModal = () => {
        setAlertModalOpen(false);
      };

    return (
        <Container color='#FDDC69'>
            <Header textcolor="#000000" color="#FDDC69" nextBtnImageUrl="/assets/home.svg" title="회원가입" nextPage="/"/>
            <CharacterWrapper>
                <CharacterImage src="/assets/kkumteul_character.png" alt="character"/>
            </CharacterWrapper>
            <ContentContainer>
                <Form onSubmit={handleSignUp}>
                    <InputWrapper>
                        <InputStyled
                            color='#FFCB05'
                            placeholder="아이디"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <CheckButton type="button" onClick={() => handleDuplicateCheck('아이디')}>중복확인</CheckButton>
                    </InputWrapper>

                    <InputStyled
                        color='#FFCB05'
                        placeholder="비밀번호"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <InputStyled
                        color='#FFCB05'
                        placeholder="비밀번호 확인"
                        name="passwordConfirm"
                        type="password"
                        value={formData.passwordConfirm}
                        onChange={handleChange}
                    />
                    <InputStyled
                        color='#FFCB05'
                        placeholder="이름"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <InputWrapper>
                        <InputStyled
                            color='#FFCB05'
                            placeholder="닉네임"
                            name="nickName"
                            value={formData.nickName}
                            onChange={handleChange}
                        />
                        <CheckButton type="button" onClick={() => handleDuplicateCheck('닉네임')}>중복확인</CheckButton>
                    </InputWrapper>
                    <InputStyled
                        color='#FFCB05'
                        placeholder="전화번호"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                    <InputStyled
                        color='#FFCB05'
                        placeholder="생년월일 ex)980905"
                        name="birth"
                        value={formData.birth}
                        onChange={handleChange}
                    />
                    <SignUpButton type="submit">회원가입</SignUpButton>
                </Form>
            </ContentContainer>
            <AlertModal
            isOpen={isAlertModalOpen}
            message={alertMessage}
            onClose={handleCloseAlertModal}
            icon="/assets/flower.png"
            />
        </Container>
    );
};

export default SignUp;

// 스타일 컴포넌트
const CharacterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px 0 0 0;
`;

const CharacterImage = styled.img`
    width: 100px;
    height: 100px;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin: 80px;
    width: 76%;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 0 auto;
`;

const InputStyled = styled(Input)`
    width: 100%;
    max-width: 550px;
    height: 55px;
    margin-bottom: 12px;
    border-radius: 12px;
`;

const SignUpButton = styled(Button)`
    width: 100%;
    background-color: #FFCB05;
    color: #ffffff;
    margin-top: 40px;
`;

const InputWrapper = styled.div`
    display: flex;
    width: 100%;
    max-width: 550px;
    margin-bottom: 12px;
`;

const CheckButton = styled(Button)`
    width: 40%;
    height: 55px;
    background-color: #FFCB05;
    color: white;
    margin-left: 10px;
    border-radius: 12px;
    font-size: 14px;
`;