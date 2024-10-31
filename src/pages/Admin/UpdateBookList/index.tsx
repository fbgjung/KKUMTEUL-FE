import styled from 'styled-components';
import React, { useRef, useState, useEffect } from 'react';
import { AdminContainer, Button, Input, TextArea } from '../../../styles/globalStyles';
import Header from '../../../components/layout/Header';
import { useNavigate, useParams } from 'react-router-dom';
import axiosWithToken from "../../../axiosWithToken.ts";

const ImageContainer = styled.div<{ imageurl?: string }>`
    width: 150px;
    height: 200px;
    background-color: #D3D3D3;
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

const ButtonFields = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    flex: 1;
`;

const MBTIFields = styled.div`
    display: flex;
    flex-direction: row;
`

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

const MBTIButton = styled(Button)`
    margin-left: 20px;
    width: 20%;
    font-size: 15px;
    height: auto;
    background-color: darkgray;
`

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
  const { book_id } = useParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [bookImage, setBookImage] = useState<File | null>(null);
  const [initialBookData, setInitialBookData] = useState({
    id: '',
    image: null,
    title: '',
    publisher: '',
    author: '',
    price: '',
    ageGroup: '',
    bookGenre: '',
    bookTopicList: []  as string | string[],
    bookMBTI: '',
    summary: '',
    page: '',
  });
  const [book, setBook] = useState({
    title: '',
    publisher: '',
    author: '',
    price: '',
    ageGroup: '',
    bookGenre: '',
    bookTopicList: [] as string | string[],
    bookMBTI: '',
    summary: '',
    page: '',
  });

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axiosWithToken.get(`/kkumteul/api/admin/books/${book_id}`);
        const bookDetail = response.data.response;
        setInitialBookData(bookDetail);
        setBook({
          title: bookDetail.title,
          publisher: bookDetail.publisher,
          author: bookDetail.author,
          price: bookDetail.price,
          ageGroup: bookDetail.ageGroup,
          bookGenre: bookDetail.bookGenre,
          bookTopicList: bookDetail.bookTopicList.join(', '),
          bookMBTI: bookDetail.bookMBTI,
          summary: bookDetail.summary,
          page: bookDetail.page,
        });
        setImageUrl(bookDetail.image ? `data:image/jpeg;base64,${bookDetail.image}` : '/assets/home.svg');
      } catch (error) {
        console.error('도서 상세 조회 실패:', error);
      }
    };

    if (book_id) {
      fetchBookDetail();
    }
  }, [book_id]);

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
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: name === 'bookTopicList' ? value.split(',').map((v) => v.trim()) : value,
    }));
  };

  const handleMBTIClick = async () => {
    try {
      const response = await axiosWithToken.post('/kkumteul/api/hugging/mbti', {
        title: book.title,
        summary: book.summary
      });
      const mbtiValue = response.data.response; // 서버에서 'mbti'가 'response'라는 키로 응답한다고 가정

      setBook(prevData => ({
        ...prevData,
        bookMBTI: mbtiValue
      }));

    } catch (error) {
      console.error('MBTI 생성 오류:', error);
      alert('MBTI 생성 중 오류가 발생했습니다.');
    }
  };

// bookMBTI 값이 변경될 때 StyledInput에 반영
  useEffect(() => {
    const inputElement = document.getElementsByName('bookMBTI')[0] as HTMLInputElement;
    if (inputElement) {
      inputElement.value = book.bookMBTI;
    }
  }, [book.bookMBTI]);

  const handleUpdateBook = async () => {

    // 필수 입력 필드 검증
    const requiredFields = [
      { name: '도서명', value: book.title },
      { name: '출판사', value: book.publisher },
      { name: '작가', value: book.author },
      { name: '가격', value: book.price },
      { name: '연령대', value: book.ageGroup },
      { name: '줄거리', value: book.summary },
      { name: '페이지 수', value: book.page }
    ];

    for (const field of requiredFields) {
      if (!field.value) {
        alert(`${field.name}을(를) 입력해주세요!`);
        return;
      }
    }
    // 기존 이미지와 업데이트한 이미지가 모두 없는 경우, 경고 메시지 표시
    if (!bookImage && !initialBookData.image) {
      alert('이미지를 추가해주세요!' + bookImage + initialBookData.image);
      return;
    }
    // 가격 필드 검증
    if (isNaN(Number(book.price.replace(/원$/, '')))) {
      alert('가격은 숫자로 입력해주세요!');
      return;
    }
    // 가격 필드에 '원' 추가
    if (/^\d+$/.test(book.price)) {
      book.price += '원';
    }
    // 연령대 필드 검증
    if (isNaN(Number(book.ageGroup.replace(/세부터$/, '')))) {
      alert('연령대는 숫자로 입력해주세요!');
      return;
    }
    // 연령대 필드에 '쪽' 추가
    if (/^\d+$/.test(book.ageGroup)) {
      book.ageGroup += '세부터';
    }
    // 페이지 수 필드 검증
    if (isNaN(Number(book.page.replace(/쪽$/, '')))) {
      alert('페이지 수는 숫자로 입력해주세요!');
      return;
    }
    // 페이지 수 필드에 '쪽' 추가
    if (/^\d+$/.test(book.page)) {
      book.page += '쪽';
    }
    // 장르 검증
    if (!genres.includes(book.bookGenre)) {
      alert('예시를 참고하여 장르를 다시 입력해주세요!');
      return;
    }
    // bookTopicList가 단일 문자열인지 배열인지 확인하고, 문자열인 경우 콤마로 구분된 배열로 변환
    const topicList = Array.isArray(book.bookTopicList)
      ? book.bookTopicList
      : book.bookTopicList.split(',');

    // 토픽 검증
    if (topicList.some((topic) => !topics.includes(topic.trim()))) {
      alert('예시를 참고하여 주제어를 다시 입력해주세요!');
      return;
    }
    // MBTI 검증
    if (!mbtis.includes(book.bookMBTI)) {
      alert('유효한 MBTI를 입력해주세요!');
      return;
    }

    const updatedBookData = {
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      price: book.price,
      page: book.page,
      ageGroup: book.ageGroup,
      summary: book.summary,
      bookMBTI: book.bookMBTI,
      genre: book.bookGenre,
      bookTopicList: Array.isArray(book.bookTopicList)
        ? book.bookTopicList
        : typeof book.bookTopicList === 'string'
          ? book.bookTopicList.split(',').map((topic: string) => topic.trim())
          : [],
    };

    const formData = new FormData();
    if (bookImage) {
      formData.append('image', bookImage);
    } else if (initialBookData.image) {
      // 기존 이미지를 유지할 수 있도록 추가
      const byteCharacters = atob(initialBookData.image);
      const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      formData.append('image', blob, 'existing_image.jpg');
    }
    formData.append('book', new Blob([JSON.stringify(updatedBookData)], { type: 'application/json' }));

    try {
      const response = await axiosWithToken.put(`/kkumteul/api/admin/books/${book_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('도서가 성공적으로 수정되었습니다!');
      navigate('/book/manage');

      console.log('도서 수정 성공:', response.data);
    } catch (error) {
      console.error('도서 수정 실패:', error);
    }
  };

  const handleDeleteBook = async () => {
    try {
      await axiosWithToken.delete(`/kkumteul/api/admin/books/${book_id}`);
      alert('도서가 성공적으로 삭제되었습니다!');
      navigate('/book/manage');
    } catch (error) {
      console.error('도서 삭제 실패:', error);
    }
  };

  return (
    <AdminContainer color="#f3f3f3">
      <Header title="도서 수정" textcolor="#000000" color="#6EA7D0" nextBtnImageUrl="/assets/home.svg" nextPage="/" />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <FormContainer>
          <ImageContainer imageurl={imageUrl} onClick={handleImageClick}>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleFileChange} />
          </ImageContainer>
          <FormFields>
            <div>
              <Label>도서명</Label>
              <StyledInput name="title" placeholder="구름 버스 둥둥" color="#6EA7D0" inputcolor="#E6E6E6" value={book.title} onChange={handleInputChange} />
            </div>
            <div>
              <Label>출판사</Label>
              <StyledInput name="publisher" placeholder="꿈틀 출판사" color="#6EA7D0" inputcolor="#E6E6E6" value={book.publisher} onChange={handleInputChange} />
            </div>
            <div>
              <Label>작가</Label>
              <StyledInput name="author" placeholder="작가명" color="#6EA7D0" inputcolor="#E6E6E6" value={book.author} onChange={handleInputChange} />
            </div>
            <div>
              <Label>가격</Label>
              <StyledInput name="price" placeholder="13,000원" color="#6EA7D0" inputcolor="#E6E6E6" value={book.price} onChange={handleInputChange} />
            </div>
            <div>
              <Label>연령대</Label>
              <StyledInput name="ageGroup" placeholder="5세" color="#6EA7D0" inputcolor="#E6E6E6" value={book.ageGroup} onChange={handleInputChange} />
            </div>
            <div>
              <Label>장르{' '}<a href="#" onClick={() => alert(`장르 예시:\n${genres.join(', ')}`)}>[예시]</a></Label>
              <StyledInput name="bookGenre" placeholder="장르를 입력하세요" color="#6EA7D0" inputcolor="#E6E6E6" value={book.bookGenre} onChange={handleInputChange} />
            </div>
            <div>
              <Label>주제어{' '}<a href="#" onClick={() => alert(`주제어 예시:\n${topics.join(', ')}`)}>[예시]</a></Label>
              <StyledInput name="bookTopicList" placeholder="구름, 버스 등등" color="#6EA7D0" inputcolor="#E6E6E6" value={book.bookTopicList} onChange={handleInputChange} />
            </div>
            <div>
              <Label>MBTI</Label>
              <MBTIFields>
                <StyledInput name="bookMBTI" placeholder="INFP" color="#6EA7D0" inputcolor="#E6E6E6" onChange={handleInputChange} readOnly/>
                <MBTIButton color="#FFFFFF" backcolor="#6EA7D0" onClick={handleMBTIClick}>MBTI 생성</MBTIButton>
              </MBTIFields>
            </div>
            <div>
              <Label>줄거리</Label>
              <StyledTextArea
                name="summary"
                placeholder="줄거리를 작성해주세요."
                color="#6EA7D0"
                inputcolor="#E6E6E6"
                rows={5}
                value={book.summary}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>페이지 수</Label>
              <StyledInput name="page" placeholder="30장" color="#6EA7D0" inputcolor="#E6E6E6" value={book.page} onChange={handleInputChange} />
            </div>
            <ButtonFields>
              <StyledButton color="#FFFFFF" backcolor="#6EA7D0" onClick={handleDeleteBook}>
                삭제하기
              </StyledButton>
              <StyledButton color="#FFFFFF" backcolor="#6EA7D0" onClick={handleUpdateBook}>
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