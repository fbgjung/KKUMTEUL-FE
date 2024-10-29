import styled from 'styled-components';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { AdminContainer, Button, Input, TextArea } from '../../../styles/globalStyles';
import Header from '../../../components/layout/Header';
import { useNavigate, useParams } from 'react-router-dom';

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
    bookTopicList: []  as string | string[],
    bookMBTI: '',
    summary: '',
    page: '',
  });

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axios.get(`/kkumteul/api/admin/books/${book_id}`);
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

  const handleUpdateBook = async () => {
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
      const response = await axios.put(`/kkumteul/api/admin/books/${book_id}`, formData, {
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
      await axios.delete(`/kkumteul/api/admin/books/${book_id}`);
      alert('도서가 성공적으로 삭제되었습니다!');
      navigate('/book/manage');
    } catch (error) {
      console.error('도서 삭제 실패:', error);
    }
  };

  return (
    <AdminContainer color="#f3f3f3">
      <Header
        title="도서 수정"
        textcolor="#000000"
        color="#6EA7D0"
        nextBtnImageUrl="/assets/home.svg"
        nextPage="/"
      />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <FormContainer>
          <ImageContainer imageurl={imageUrl} onClick={handleImageClick}>
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
              <Label>장르</Label>
              <StyledInput name="bookGenre" placeholder="장르를 입력하세요" color="#6EA7D0" inputcolor="#E6E6E6" value={book.bookGenre} onChange={handleInputChange} />
            </div>
            <div>
              <Label>주제어</Label>
              <StyledInput name="bookTopicList" placeholder="구름, 버스 등등" color="#6EA7D0" inputcolor="#E6E6E6" value={book.bookTopicList} onChange={handleInputChange} />
            </div>
            <div>
              <Label>MBTI</Label>
              <StyledInput name="bookMBTI" placeholder="INFP" color="#6EA7D0" inputcolor="#E6E6E6" value={book.bookMBTI} onChange={handleInputChange} />
            </div>
            <div>
              <Label>줄거리</Label>
              <StyledTextArea name="summary" placeholder="줄거리를 작성해주세요." color="#6EA7D0" inputcolor="#E6E6E6" rows={5} value={book.summary} onChange={handleInputChange} />
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
