// import styled from 'styled-components';
import { useRef, useState } from 'react';
import { AdminContainer, Button, Input, TextArea } from '../../../styles/globalStyles';
import Header from '../../../components/layout/Header';
import styled from 'styled-components';

const ImageContainer = styled.div<{ imageUrl?: string }>`
    width: 150px;
    height: 200px;
    background-color: #D3D3D3; /* 이미지가 들어갈 부분을 회색으로 표시 */
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-image: ${({ imageUrl }) => (imageUrl ? `url(${imageUrl})` : 'none')};
    // imageUrl 상태를 추가하여 선택한 이미지를 저장 (useState<string | null>).
    background-size: cover;
    background-position: center;
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 40px;
    width: 800px; /* 전체 너비를 800px로 설정 */
    margin-top: 20px;
`;

const FormFields = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
`;

const ButtonFields = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    flex: 1;
`;


const Label = styled.label`
    color: #6EA7D0;
    font-weight: bold;
`;

const StyledInput = styled(Input)`
    width: 100%; /* 입력 필드의 너비를 부모 요소에 맞추도록 설정 */
    padding-left: 15px;
    margin-top: 5px;
`;

const StyledTextArea = styled(TextArea)`
    width: 100%; /* 텍스트 영역의 너비를 부모 요소에 맞추도록 설정 */
    margin-top: 5px;
`;

const StyledButton = styled(Button)`
    margin-top: 20px;
    width: 100%; /* 버튼의 너비를 부모 요소에 맞추도록 설정 */
`;

const Index = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 입력 필드를 클릭하여 파일 탐색기를 엽니다.
    }
  };

  // 파일이 선택되면 FileReader를 사용해 해당 파일을 읽고, 이를 Data URL로 변환
  // 변환된 Data URL을 imageUrl 상태로 설정하여 미리보기 이미지로 사용
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string); // 파일의 URL을 상태로 설정
      };
      reader.readAsDataURL(file); // 파일을 Data URL로 읽음
    }
  };

  return (
    <AdminContainer color="#f3f3f3">
      <Header
        title="도서 수정"
        textcolor="#000000"
        color="#6EA7D0"
        nextBtnImageUrl="/assets/home.svg" // 홈 아이콘 URL 설정
        nextPage="/" // 홈 페이지로 이동 설정
      />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <FormContainer>
          <ImageContainer imageUrl={imageUrl} onClick={handleImageClick}>
            {!imageUrl && <span>이미지 추가</span>}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </ImageContainer>
          <FormFields>
            <div>
              <Label>도서명</Label>
              <StyledInput placeholder="구름 버스 둥둥" color="#6EA7D0" inputcolor="#E6E6E6" />
            </div>
            <div>
              <Label>출판사</Label>
              <StyledInput placeholder="꿈틀 출판사" color="#6EA7D0" inputcolor="#E6E6E6" />
            </div>
            <div>
              <Label>작가</Label>
              <StyledInput placeholder="작가명" color="#6EA7D0" inputcolor="#E6E6E6" />
            </div>
            <div>
              <Label>가격</Label>
              <StyledInput placeholder="13,000원" color="#6EA7D0" inputcolor="#E6E6E6" />
            </div>
            <div>
              <Label>연령대</Label>
              <StyledInput placeholder="5세" color="#6EA7D0" inputcolor="#E6E6E6" />
            </div>
            <div>
              <Label>장르</Label>
              <StyledInput placeholder="장르를 입력하세요" color="#6EA7D0" inputcolor="#E6E6E6" />
            </div>
            <div>
              <Label>주제어</Label>
              <StyledInput placeholder="구름, 버스 등등" color="#6EA7D0" inputcolor="#E6E6E6" />
            </div>
            <div>
              <Label>MBTI</Label>
              <StyledInput placeholder="INFP" color="#6EA7D0" inputcolor="#E6E6E6" />
            </div>
            <div>
              <Label>줄거리</Label>
              <StyledTextArea placeholder="줄거리를 작성해주세요." color="#6EA7D0" inputcolor="#E6E6E6" rows={5} />
            </div>
            <div>
              <Label>페이지 수</Label>
              <StyledInput placeholder="30장" color="#6EA7D0" inputcolor="#E6E6E6" />
            </div>
            <ButtonFields>
              <StyledButton color="#FFFFFF" backcolor="#6EA7D0">
                삭제하기
              </StyledButton>
              <StyledButton color="#FFFFFF" backcolor="#6EA7D0">
                수정하기
              </StyledButton>
            </ButtonFields>
          </FormFields>
        </FormContainer>
      </div>
    </AdminContainer>
  );
};

export default Index;