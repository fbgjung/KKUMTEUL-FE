import { useRef, useState } from 'react';
import { Container, Button, Input } from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import styled from 'styled-components';

const Index = () => {
  // const [profileImage, setProfileImage] = useState('/assets/default_profile.png');
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 입력 필드를 클릭하여 파일 탐색기를 엽니다.
    }
  };

  const handleFileChange  = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string); // 파일의 URL을 상태로 설정
      };
      reader.readAsDataURL(file); // 파일을 Data URL로 읽음
    }

    console.log(file);
  };

  const handleGenderSelect = (selectedGender: 'MALE' | 'FEMALE') => {
    setGender(selectedGender);
  };

  const handleAddChild = () => {
    if (!/^\d{8}$/.test(birthdate)) {
      alert('생년월일은 8자리 숫자 형식으로 입력해주세요 (예: 19980905)');
      return;
    }
    // 추가 로직 구현
    // #f3f3f3
  };

  return (
    <Container color="#f3f3f3">
      <Header textcolor="#000000" color="#f3f3f3" nextBtnImageUrl="/assets/home.svg" title="자녀 등록" nextPage='/' />
      <WholeContainer color="#f3f3f3">
        <ProfileImageContainer  imageUrl={imageUrl} onClick={handleImageClick}>
          {!imageUrl && <span>프로필사진 추가</span>}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleFileChange}
          />
        </ProfileImageContainer>
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

const ProfileImageContainer = styled.div<{ imageUrl?: string }>`
  width: 200px;
  height: 200px;
  background-color: #D3D3D3;
  border-radius: 100%;
  overflow: hidden;
  position: relative;
  justify-content: center;
  align-items: center;
  display: flex;
  background: cover center ${({ imageUrl }) => (imageUrl ? `url(${imageUrl})` : 'none')};
  // imageUrl 상태를 추가하여 선택한 이미지를 저장 (useState<string | null>).
  cursor: pointer;
`;

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