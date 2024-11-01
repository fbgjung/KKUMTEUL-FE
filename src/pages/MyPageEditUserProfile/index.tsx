import { Container, Button, Input } from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { ChangeEvent, MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import axiosWithToken from '../../axiosWithToken.ts';


const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.userData; // 유저 데이터 넘어온 거 받기
  console.log(userData);

  useEffect(() => {
    if (userData) {
      setNickname(userData.nickName || '');
      setPassword('');
      setConfirmPassword('');
      setPhoneNumber(userData.phoneNumber || '');
      setOriginalNickname(userData.nickName || ''); // 기존 닉네임 저장
      setProfileImage(userData.profileImage);
    }
  }, [userData]);

  const [originalNickname, setOriginalNickname] = useState<string>(''); // 기존 닉네임 상태
  const [nickname, setNickname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [nicknameValid, setNicknameValid] = useState<boolean>(false); // 닉네임 중복 확인 여부
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true); // 비밀번호 확인 여부
  const [profileImage, setProfileImage] = useState<string>('/assets/default_profile.svg'); // 프로필 추가
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null); // 프로필 이미지를 위한 File 타입

  

  const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
      if (file) {
        console.log("프로필 이미지 업로드:", file);
        // const imageUrl = URL.createObjectURL(file);
        setProfileImageFile(file);
      }
  };

  const handleNicknameCheck = async (nickname: string) => {
    try {
      const response = await axiosWithToken.get(`/kkumteul/api/users/duplicate/nickname/${nickname}`);
      if (response.data.response === true) {
        alert(`${nickname}은 이미 사용중 입니다.`);
        setNicknameValid(false);
      } else {
        alert(`${nickname}은 사용할 수 있는 닉네임입니다.`);
        setNicknameValid(true);
      }
    } catch (error) {
      console.error("Error checking nickname:", error);
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
      if (confirmPassword !== '' && e.target.value !== confirmPassword) {
        setPasswordMatch(false);
      } else {
        setPasswordMatch(true);
     }   
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
      if (password !== '' && password !== e.target.value) {
        setPasswordMatch(false);
      } else {
        setPasswordMatch(true);
     }
  };

  const formatImageSrc = (imageData: string) => {
    return imageData ? `data:image/png;base64,${imageData}` : '/assets/dog.svg';
};

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // if (!passwordMatch) {
    //   alert("비밀번호가 일치하지 않습니다.");
    //   return;
    // }
    if (!nickname) {
      alert("닉네임을 입력해 주세요.");
      return;
    }
    if (!phoneNumber) {
        alert("전화번호를 입력해 주세요.");
        return;
    }

    if (nickname !== originalNickname && !nicknameValid) {
      alert('닉네임 중복 검사를 해주세요.');
      return;
    }
  
    const formData = new FormData();
    
    if (nickname) {
        formData.append('nickName', nickname);
    }
    if (phoneNumber) {
        formData.append('phoneNumber', phoneNumber);
    }
    if (password) {
        formData.append('password', password);
    }
 
    if (profileImageFile) {
        formData.append('profileImage', profileImageFile);
    }

    try {
        const response = await axiosWithToken.patch('/kkumteul/api/users', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response.data);
        navigate('/mypage');
    } catch (error) {
        console.error("Error updating user:", error);
    }
  };
  

  return (
    <Container color="#ffffff">
      <Header textcolor="#000000" color="#77a5fe" nextBtnImageUrl="/assets/home.svg" title="내 정보 수정" nextPage="/" />
      
      <ProfileEditContainer>
      <ProfileImageWrapper>
        <ProfileImageLabel htmlFor="profile-upload">
        {profileImageFile ? (
          // formatImageSrc
              <ProfileImage src={URL.createObjectURL(profileImageFile)} alt="profile" />
            ) : (
              // <ProfileImage src="/assets/default_profile.svg" alt="default profile" />
              <ProfileImage src={formatImageSrc(profileImage)} alt="default profile" />
            )}
        </ProfileImageLabel>
        <input type="file" id="profile-upload" style={{ display: 'none' }} onChange={handleProfileImageChange} />
        <ProfileName>{userData.username}</ProfileName>
      </ProfileImageWrapper>
        
        <FormWrapper>
        <InputWrapper>
        <ChildProfileInput
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        color="#77a5fe"
        inputcolor="#ffffff"
        />
        <NicknameCheckButton onClick={() => handleNicknameCheck(nickname)}>중복확인</NicknameCheckButton>
        </InputWrapper>
        {/* {!nicknameValid && <WarningText>이미 존재하는 닉네임입니다.</WarningText>} */}
        <ChildProfileInput
        placeholder="비밀번호"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        color="#77a5fe"
        inputcolor="#ffffff"
        />

        <ChildProfileInput
        placeholder="비밀번호 확인"
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        color="#77a5fe"
        inputcolor="#e1ebfe"
        />
        {!passwordMatch && <WarningText>비밀번호가 일치하지 않습니다.</WarningText>}

        <ChildProfileInput
        placeholder="전화번호"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        color="#77a5fe"
        inputcolor="#ffffff"
        />
        </FormWrapper>
      <EditButton backcolor="#77a5fe" color="#FFFFFF" onClick={handleSubmit}>수정하기</EditButton>
      </ProfileEditContainer>
    </Container>
  );
};

export default EditProfile;

// 스타일링
const ProfileEditContainer  = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`
const ProfileImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 60px;
`;

const ProfileImageLabel = styled.label`
  cursor: pointer;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  background-color: #ffffff;
  border: 2px solid #6EA7D0;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileName = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #77a5fe;
`;


const FormWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const NicknameCheckButton = styled.button`
  background-color: #77a5fe;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 12px;
  margin-left: 8px;
  width: 80px;
  height: 44px;
`;

const WarningText = styled.p`
  color: #6EA7D0;
  font-size: 12px;
  margin-bottom: 10px;
`;

const EditButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
`

const ChildProfileInput = styled(Input)`
  border: 2px solid #77a5fe;
  
`