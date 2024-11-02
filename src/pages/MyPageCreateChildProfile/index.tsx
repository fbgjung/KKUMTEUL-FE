import { useState } from 'react';
import { Container, Button, Input } from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import styled from 'styled-components';
import { ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosWithToken from '../../axiosWithToken.ts';


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
      const response = await axiosWithToken.post('/kkumteul/api/childProfiles', formData, {
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
    <Container color="#ffffff">
      <Header textcolor="#000000" color="#fee208" nextBtnImageUrl="/assets/home.svg" title="자녀 등록" nextPage='/' />
      <WholeContainer color="#f3f3f3">
      <ProfileImageWrapper>
        <ProfileImageContainer>
          <ProfileImageLabel htmlFor="profile-upload">
            {profileImageFile ? (
              <ProfileImage src={URL.createObjectURL(profileImageFile)} alt="profile" />
            ) : (
              <ProfileImage src="/assets/childprofile.png" alt="default profile" />
            )}
          </ProfileImageLabel>
          <OverlayImage src="/assets/camera.png" alt="overlay" />
        </ProfileImageContainer>
        <input type="file" id="profile-upload" style={{ display: 'none' }} onChange={handleProfileImageChange} />
      </ProfileImageWrapper>

        <FormContainer>
          <Label>이름</Label>
          <StyledInput
            placeholder="이름"
            color="#fee208"
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
            placeholder="ex) 20190101"
            color="#fee208"
            inputcolor='#E6E6E6'
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </FormContainer>
        <AddButton color="#FFFFFF" backcolor='#fee208' onClick={handleAddChild}>추가하기</AddButton>
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
const FormContainer = styled.div`
  width: 90%;
  margin-top: 20px;
`;

const Label = styled.label`
  margin-top: 20px;
  font-size: 14px;
  color: #dcc728;
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
  border-radius: 20px;
  border: 2px solid #fee208;
  background-color: ${({ isSelected }) => (isSelected ? '#fee208' : '#ffffff')};
  color: ${({ isSelected }) => (isSelected ? '#6a6d6f' : '#6a6d6f')};
  font-size: 16px;
  cursor: pointer;
`;

const AddButton = styled(Button)`
  margin-top: 70px;
  width: 90%;
  height: 64px;
`;

const StyledInput = styled(Input)`
  width: 100%;
  padding-left: 15px;
  margin-top: 5px;
  background-color: #fdf8d7;
  border: 2px solid #fee208;
`;


const ProfileImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
`;

const ProfileImageLabel = styled.label`
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  background-color: #ffffff;
  border: 2px solid #fee208;
`;

const ProfileImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: cover;
`;

const OverlayImage = styled.img`
  position: absolute;
  bottom: -5px;
  right: -5px;
  width: 40px;
  height: 40px;
  object-fit: cover;
`;
