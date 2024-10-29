import { useState } from 'react';
import { Container, Button, Input } from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import styled from 'styled-components';
import { ChangeEvent, MouseEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null); // 프로필 이미지를 위한 File 타입

  const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
      if (file) {
        console.log("프로필 이미지 업로드:", file);
        // const imageUrl = URL.createObjectURL(file);
        setProfileImageFile(file);
      }
  };

  const handleGenderSelect = (selectedGender: 'MALE' | 'FEMALE') => {
    setGender(selectedGender);
  };

  const handleAddChild = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!/^\d{8}$/.test(birthdate)) {
      alert('생년월일은 8자리 숫자 형식으로 입력해주세요 (예: 19980905)');
      return;
    }

    if (!gender) {
      alert("성별을 선택 해주세요.");
      return;
    }

    if (!name) {
      alert("이름을 선택 해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append('childName', name);
    formData.append('childGender', gender);
    formData.append('childBirthDate', birthdate);
    if (profileImageFile) {
      formData.append('childProfileImage', profileImageFile);
    }

    // log
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await axios.post('/kkumteul/api/childProfiles', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    alert("자녀 프로필이 성공적으로 추가되었습니다!");
    navigate('/mypage');

    console.log(response.data.response);
    } catch (error) {
        console.error("Error inserting childProfile:", error);
    }
  };

  return (
    <Container color="#f3f3f3">
      <Header textcolor="#000000" color="#f3f3f3" nextBtnImageUrl="/assets/home.svg" title="자녀 등록" nextPage='/' />
      <WholeContainer color="#f3f3f3">

        <ProfileImageWrapper>
        <ProfileImageLabel htmlFor="profile-upload">
        {profileImageFile ? (
              <ProfileImage src={URL.createObjectURL(profileImageFile)} alt="profile" />
            ) : (
              <ProfileImage src="/assets/default_profile.svg" alt="default profile" />
            )}
        </ProfileImageLabel>
        <input type="file" id="profile-upload" style={{ display: 'none' }} onChange={handleProfileImageChange} />
      </ProfileImageWrapper>

        <FormContainer>
          <Label>이름</Label>
          <StyledInput
            placeholder="이름"
            color="#6EA7D0"
            inputcolor='#E6E6E6'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Label>성별</Label>
          <GenderButtonContainer>
            <GenderButton
              isSelected={gender === 'MALE'}
              onClick={() => handleGenderSelect('MALE')}
            >
              남아
            </GenderButton>
            <GenderButton
              isSelected={gender === 'FEMALE'}
              onClick={() => handleGenderSelect('FEMALE')}
            >
              여아
            </GenderButton>
          </GenderButtonContainer>
          <Label>생년월일</Label>
          <StyledInput
            placeholder="ex) 19980905"
            color="#6EA7D0"
            inputcolor='#E6E6E6'
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </FormContainer>
        <AddButton color="#FFFFFF" backcolor='#6EA7D0' onClick={handleAddChild}>추가하기</AddButton>
      </WholeContainer>
    </Container>
  );
};

export default Index;

const WholeContainer = styled.div`
  margin-top: 100px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;

`;

// const ProfileImageContainer = styled.div<{ imageUrl?: string }>`
//   width: 200px;
//   height: 200px;
//   background-color: #D3D3D3;
//   border-radius: 100%;
//   overflow: hidden;
//   position: relative;
//   justify-content: center;
//   align-items: center;
//   display: flex;
//   background: cover center ${({ imageUrl }) => (imageUrl ? `url(${imageUrl})` : 'none')};
//   // imageUrl 상태를 추가하여 선택한 이미지를 저장 (useState<string | null>).
//   cursor: pointer;
// `;

const FormContainer = styled.div`
  width: 90%;
  margin-top: 20px;
`;

const Label = styled.label`
  margin-top: 15px;
  font-size: 16px;
  font-weight: bold;
  color: #6EA7D0;
  display: block;
`;

const GenderButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const GenderButton = styled.button<{ isSelected: boolean }>`
  flex: 1;
  height: 48px;
  border-radius: 16px;
  background-color: ${({ isSelected }) => (isSelected ? 'rgb(110,167,208,0.5)' : '#E6E6E6')};
  color: ${({ isSelected }) => (isSelected ? '#FFFFFF' : '#6EA7D0')};
  font-size: 16px;
  border: none;
`;

const AddButton = styled(Button)`
  margin-top: 70px;
  width: 90%;
  height: 64px;
`;

const StyledInput = styled(Input)`
    width: 100%; /* 입력 필드의 너비를 부모 요소에 맞추도록 설정 */
    padding-left: 15px;
    margin-top: 5px;
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ProfileImageLabel = styled.label`
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  background-color: #E6E6E6;
  border: 2px solid #6EA7D0;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;