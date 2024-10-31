import styled from 'styled-components';
import { useRef, useState } from 'react';
import { AdminContainer, Button, Input, TextArea } from '../../../styles/globalStyles';
import Header from '../../../components/layout/Header';
import { useNavigate } from 'react-router-dom';
import axiosWithToken from "../../../axiosWithToken.ts";

const ImageContainer = styled.div<{ imageurl?: string }>`
    width: 150px;
    height: 200px;
    background-color: #D3D3D3; /* 이미지가 들어갈 부분을 회색으로 표시 */
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-image: ${({ imageurl }) => (imageurl ? `url(${imageurl})` : 'none')};
    background-size: cover;
    background-position: center;
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 40px;
    width: 800px;
    margin-top: 20px;
`;

const FormFields = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
`;

const Label = styled.label`
    color: #6EA7D0;
    font-weight: bold;
`;

const StyledInput = styled(Input)`
    width: 100%;
    padding-left: 15px;
    margin-top: 5px;
`;

const StyledTextArea = styled(TextArea)`
    width: 100%;
    margin-top: 5px;
`;

const StyledButton = styled(Button)`
    margin-top: 20px;
    width: 100%;
`;

const genres = [
  '그림책', '만화', '동화', '외국동화', '자연의 세계', '역사', '사회', '생활과 과학', '예술', '시', '옛날이야기'
];

const topics = [
  '환경', '동물', '성장', '가족', '과학', '생명', '수학', '세계 문화', '인물', '스포츠', '협동', '미술', '모험', '기계', '식물', '꿈', '관찰', '사랑', '영웅', '외국어', '우주', '유머', '음악', '의학', '이별'
];

const mbtis = [
  'INFP', 'INFJ', 'INTP', 'INTJ', 'ISFP', 'ISFJ', 'ISTP', 'ISTJ',
  'ENFP', 'ENFJ', 'ENTP', 'ENTJ', 'ESFP', 'ESFJ', 'ESTP', 'ESTJ'
];

const Index = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageurl, setImageurl] = useState<string | undefined>(undefined);
  const [bookImage, setBookImage] = useState<File | null>(null);
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    publisher: '',
    price: '',
    page: '',
    ageGroup: '',
    summary: '',
    genre: '',
    bookMBTI: '',
    bookTopicList: [],
  });

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBookImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageurl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: name === 'bookTopicList' ? value.split(',').map((v) => v.trim()) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 필수 입력 필드 검증
    const requiredFields = [
      { name: '도서명', value: bookData.title },
      { name: '출판사', value: bookData.publisher },
      { name: '작가', value: bookData.author },
      { name: '가격', value: bookData.price },
      { name: '연령대', value: bookData.ageGroup },
      { name: '줄거리', value: bookData.summary },
      { name: '페이지 수', value: bookData.page }
    ];

    for (const field of requiredFields) {
      if (!field.value) {
        alert(`${field.name}을(를) 입력해주세요!`);
        return;
      }
    }
    // 이미지가 추가되지 않은 경우 경고 메시지 표시
    if (!bookImage) {
      alert('이미지를 추가해주세요!');
      return;
    }
    // 가격 필드 검증
    if (isNaN(Number(bookData.price.replace(/원$/, '')))) {
      alert('가격은 숫자로 입력해주세요!');
      return;
    }
    // 가격 필드에 '원' 추가
    if (/^\d+$/.test(bookData.price)) {
      bookData.price += '원';
    }
    // 연령대 필드 검증
    if (isNaN(Number(bookData.ageGroup.replace(/세부터$/, '')))) {
      alert('연령대는 숫자로 입력해주세요!');
      return;
    }
    // 연령대 필드에 '쪽' 추가
    if (/^\d+$/.test(bookData.ageGroup)) {
      bookData.ageGroup += '세부터';
    }
    // 페이지 수 필드 검증
    if (isNaN(Number(bookData.page.replace(/쪽$/, '')))) {
      alert('페이지 수는 숫자로 입력해주세요!');
      return;
    }
    // 페이지 수 필드에 '쪽' 추가
    if (/^\d+$/.test(bookData.page)) {
      bookData.page += '쪽';
    }
    // 장르 검증
    if (!genres.includes(bookData.genre)) {
      alert('예시를 참고하여 장르를 다시 입력해주세요!');
      return;
    }
    // 토픽 검증
    if (bookData.bookTopicList.some((topic) => !topics.includes(topic))) {
      alert('예시를 참고하여 주제어를 다시 입력해주세요!');
      return;
    }
    // MBTI 검증
    if (!mbtis.includes(bookData.bookMBTI)) {
      alert('유효한 MBTI를 입력해주세요!');
      return;
    }

    const formData = new FormData();
    // 이미지 파일 추가
    if (bookImage) {
      formData.append('image', bookImage); // image라는 이름으로 전송
    }
    // 도서 관련 JSON 데이터를 문자열화하여 추가
    formData.append('book', new Blob([JSON.stringify(bookData)], { type: 'application/json' }));

    // 서버로 데이터 전송
    try {
      const response = await axiosWithToken.post('/kkumteul/api/admin/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("도서를 성공적으로 등록하였습니다!");
      navigate('/book/manage');
      console.log('도서 등록 성공:', response.data);

    } catch (error) {
      console.error('도서 등록 실패:', error);
    }
  };

  return (
    <AdminContainer color="#f3f3f3">
      <Header
        title="도서 등록"
        textcolor="#000000"
        color="#6EA7D0"
        nextBtnImageUrl="/assets/home.svg"
        nextPage="/"
      />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <FormContainer>
          <ImageContainer imageurl={imageurl} onClick={handleImageClick}>
            {!imageurl && <span>이미지 추가</span>}
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
              <StyledInput name="title" placeholder="구름 버스 둥둥" color="#6EA7D0" inputcolor="#E6E6E6" onChange={handleInputChange} />
            </div>
            <div>
              <Label>출판사</Label>
              <StyledInput name="publisher" placeholder="꿈틀 출판사" color="#6EA7D0" inputcolor="#E6E6E6" onChange={handleInputChange} />
            </div>
            <div>
              <Label>작가</Label>
              <StyledInput name="author" placeholder="작가명" color="#6EA7D0" inputcolor="#E6E6E6" onChange={handleInputChange} />
            </div>
            <div>
              <Label>가격</Label>
              <StyledInput name="price" placeholder="13,000원" color="#6EA7D0" inputcolor="#E6E6E6" onChange={handleInputChange} />
            </div>
            <div>
              <Label>연령대</Label>
              <StyledInput name="ageGroup" placeholder="5세" color="#6EA7D0" inputcolor="#E6E6E6" onChange={handleInputChange} />
            </div>
            <div>
              <Label>장르 <a href="#" onClick={() => alert(`장르 예시:\n${genres.join(', ')}`)}>[예시]</a></Label>
              <StyledInput name="genre" placeholder="장르를 입력하세요" color="#6EA7D0" inputcolor="#E6E6E6" onChange={handleInputChange} />
            </div>
            <div>
              <Label>주제어 <a href="#" onClick={() => alert(`주제어 예시:\n${topics.join(', ')}`)}>[예시]</a></Label>
              <StyledInput name="bookTopicList" placeholder="구름, 버스 등등" color="#6EA7D0" inputcolor="#E6E6E6" onChange={handleInputChange} />
            </div>
            <div>
              <Label>MBTI</Label>
              <StyledInput name="bookMBTI" placeholder="INFP" color="#6EA7D0" inputcolor="#E6E6E6" onChange={handleInputChange} />
            </div>
            <div>
              <Label>줄거리</Label>
              <StyledTextArea name="summary" placeholder="줄거리를 작성해주세요." color="#6EA7D0" inputcolor="#E6E6E6" rows={5} onChange={handleInputChange} />
            </div>
            <div>
              <Label>페이지 수</Label>
              <StyledInput name="page" placeholder="30쪽" color="#6EA7D0" inputcolor="#E6E6E6" onChange={handleInputChange} />
            </div>
            <StyledButton color="#FFFFFF" backcolor="#6EA7D0" onClick={handleSubmit}>
              등록하기
            </StyledButton>
          </FormFields>
        </FormContainer>
      </div>
    </AdminContainer>
  );
};

export default Index;