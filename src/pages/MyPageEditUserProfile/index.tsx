import { Container, Button, Input } from '../../styles/globalStyles'; // 기존 Input 컴포넌트 사용
import Header from '../../components/layout/Header';
import styled from 'styled-components';
import { useState } from 'react';

const EditProfile = () => {
        const [nickname, setNickname] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [phoneNumber, setPhoneNumber] = useState('');
        const [nicknameValid, setNicknameValid] = useState(true); // 닉네임 중복 확인 여부
        const [passwordMatch, setPasswordMatch] = useState(true); // 비밀번호 확인 여부

        const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                const file = event.target.files?.[0];
                if (file) {
                        console.log("프로필 이미지 업로드:", file);
                }
        };

        const handleNicknameCheck = () => {
                if (nickname === '이미 있는 닉네임') {
                        setNicknameValid(false);
                } else {
                        setNicknameValid(true);
                }
        };

        const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
                if (confirmPassword !== '' && e.target.value !== confirmPassword) {
                        setPasswordMatch(false);
                } else {
                        setPasswordMatch(true);
                }
        };

        const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                setConfirmPassword(e.target.value);
                if (password !== '' && password !== e.target.value) {
                        setPasswordMatch(false);
                } else {
                        setPasswordMatch(true);
                }
        };

        const handleSubmit = () => {
                if (!passwordMatch) {
                        alert("비밀번호가 일치하지 않습니다.");
                        return;
                }
                console.log('닉네임:', nickname);
                console.log('비밀번호:', password);
                console.log('전화번호:', phoneNumber);
        };

        return (
            <Container color="#f3f3f3">
                    <Header textcolor="#000000" color="#f3f3f3" nextBtnImageUrl="/assets/home.svg" title="내 정보 수정" nextPage="/" />

                    <ProfileImageWrapper>
                            <ProfileImageLabel htmlFor="profile-upload">
                                    <ProfileImage src="/assets/userProfileImg.svg" alt="Profile" />
                            </ProfileImageLabel>
                            <input type="file" id="profile-upload" style={{ display: 'none' }} onChange={handleProfileImageChange} />
                            <ProfileName>류금정</ProfileName>
                    </ProfileImageWrapper>

                    <FormWrapper>
                            <InputWrapper>
                                    <Input
                                        placeholder="닉네임"
                                        value={nickname}
                                        onChange={(e) => setNickname(e.target.value)}
                                        color="#6EA7D0"
                                        inputcolor="#E6E6E6"
                                        style={{ width: 'calc(100% - 130px)', paddingLeft: '16px' }} // 좌측 여백 추가
                                    />
                                    <NicknameCheckButton onClick={handleNicknameCheck}>중복확인</NicknameCheckButton>
                            </InputWrapper>
                            {!nicknameValid && <WarningText>이미 존재하는 닉네임입니다.</WarningText>}

                            <Input
                                placeholder="비밀번호"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                color="#6EA7D0"
                                inputcolor="#E6E6E6"
                                style={{ width: '600px', marginBottom: '10px', paddingLeft: '16px' }} // 좌측 여백 추가
                            />

                            <Input
                                placeholder="비밀번호 확인"
                                type="password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                color="#6EA7D0"
                                inputcolor="#E6E6E6"
                                style={{ width: '600px', marginBottom: '16px', paddingLeft: '16px' }} // 좌측 여백 추가
                            />
                            {!passwordMatch && <WarningText>비밀번호가 일치하지 않습니다.</WarningText>}

                            <Input
                                placeholder="전화번호"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                color="#6EA7D0"
                                inputcolor="#E6E6E6"
                                style={{ width: '600px', paddingLeft: '16px' }}
                            />
                    </FormWrapper>

                    <Button backcolor="#6EA7D0" color="#FFFFFF" onClick={handleSubmit}>수정하기</Button>
            </Container>
        );
};

export default EditProfile;

// 스타일링
const ProfileImageWrapper = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
`;

const ProfileImageLabel = styled.label`
        cursor: pointer;
`;

const ProfileImage = styled.img`
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-bottom: 10px;
`;

const ProfileName = styled.p`
        font-size: 16px;
        font-weight: bold;
        color: #6EA7D0;
`;

const FormWrapper = styled.div`
        margin-bottom: 20px;
`;

const InputWrapper = styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
        width: 600px;
`;

const NicknameCheckButton = styled.button`
        padding: 10px 20px;
        background-color: #6EA7D0;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        margin-left: 8px;
        width: 120px;
`;

const WarningText = styled.p`
        color: #007bff;
        font-size: 12px;
        margin-bottom: 10px;
`;