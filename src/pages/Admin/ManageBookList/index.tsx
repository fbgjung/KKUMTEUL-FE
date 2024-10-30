import { useState, useEffect } from 'react';
import { AdminContainer, Button, Input, Select } from '../../../styles/globalStyles';
import Header from '../../../components/layout/Header';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TableContainer = styled.div`
    width: 100%;
    height: calc(100% - 60px);
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: #ffffff;
`;

const TableHeader = styled.th`
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 8px;
    text-align: center;
`;

const TableCell = styled.td`
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 8px;
    text-align: center;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #ffffff;
    }

    &:nth-child(odd) {
        background-color: #ffffff;
    }
`;

const ImagePlaceholder = styled.img`
    width: 50px;
    height: 70px;
    background-color: #D3D3D3;
    margin-right: 10px;
    object-fit: cover;
`;

const InputContainer = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 20px;
    align-items: center;
`;

const SearchContainer = styled.div`
    display: flex;
    width: 65%;
`;

const SearchInput = styled(Input)`
    width: 88%;
    background-color: #ffffff;
    color: #6EA7D0;
    margin-left: 0px;
`;

const SearchButton = styled(Button)`
    background-color: rgba(110, 167, 208, 0.31);
    width: 10%;
    height: auto;
    color: #FFFFFF;
    font-size: 15px;
`;

const DeleteAddContainer = styled.div`
    display: flex;
    width: 35%;
    justify-content: flex-end;
`;

const DeleteButton = styled(Button)`
    background-color: #ffffff;
    width: 25%;
    color: #A0A0A0;
    font-size: 15px;
`;

const AddButton = styled(Button)`
    background-color: #6EA7D0;
    width: 25%;
    color: #FFFFFF;
    margin-left: 20px;
    font-size: 15px;
`;

const SelectContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
    align-items: flex-start;
    width: 30%;
`;

const TitleContainer = styled.div`
    margin: 0 auto;
`;

const CheckboxHeader = styled.th`
    width: 5%;
    text-align: center;
`;

const GenreOptions = [
  "그림책", "만화", "동화", "외국동화", "자연의 세계", "역사",
  "사회", "생활과 과학", "예술", "시", "기타", "옛날이야기"
];

const SubjectOptions = [
  "환경", "동물", "성장", "가족", "과학", "생명", "수학", "세계 문화", "인물",
  "스포츠", "협동", "미술", "모험", "기계", "식물", "꿈", "관찰", "사랑",
  "영웅", "외계인", "외국어", "용서", "우주", "유머", "음악", "의학",
  "이별", "사랑"
];

const MbtiOptions = [
  "ENTP", "ENTJ", "ENFP", "ENFJ", "ESTP", "ESTJ", "ESFP", "ESFJ",
  "INTP", "INTJ", "INFP", "INFJ", "ISTP", "ISTJ", "ISFP", "ISFJ"
];

type Book = {
  id: number;
  image: string | null;
  title: string;
  publisher: string;
  author: string;
  price: string;
  ageGroup: string;
  bookGenre: string;
  bookTopicList: string[];
  bookMBTI: string;
  summary: string;
  page: string;
};

const Index = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]); //  useState<Book[]>([])
  const [searchText, setSearchText] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/kkumteul/api/admin/books', {
          params: {
            page: currentPage,
            size: 7,
          },
        });
        setBooks(response.data.response.content);
        setTotalPages(response.data.response.totalPages);
      } catch (error) {
        console.error('도서 목록 조회 실패:', error);
      }
    };
    fetchBooks();
  }, [currentPage]);

  const handleSearchBook = async () => {
    try {
      const response = await axios.get('/kkumteul/api/admin/books/search', {
        params: {
          search: searchText,
          page: currentPage,
          size: 7,
        },
      });
      setBooks(response.data.response.content);
      setTotalPages(response.data.response.totalPages);
    } catch (error) {
      console.error('도서 검색 실패:', error);
    }
  };

  const handleDeleteAll = () => {
    setBooks([]);
  };

  const handleAddBook = () => {
    navigate('/book/create');
  };

  const handleUpdateBook = (book_id: number) => {
    navigate(`/book/update/${book_id}`);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedBooks([]);
    } else {
      setSelectedBooks(books.map((book) => book.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectBook = (id: number) => {
    if (selectedBooks.includes(id)) {
      setSelectedBooks(selectedBooks.filter((bookId) => bookId !== id));
    } else {
      setSelectedBooks([...selectedBooks, id]);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <AdminContainer color="#f3f3f3">
      <TableContainer>
        <Header
          textcolor="#000000"
          color="#6EA7D0"
          nextBtnImageUrl="/assets/home.svg"
          title="도서 관리"
          nextPage="/"
        />
        <div style={{ padding: '20px', height: '100%' }}>
          <InputContainer>
            <SearchContainer>
              <SearchInput
                placeholder="도서 제목 또는 작가를 검색해보세요"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                color="#6EA7D0"
                inputcolor="#E6E6E6"
              />
              <SearchButton color="#FFFFFF" backcolor="#6EA7D0" onClick={handleSearchBook}>
                검색
              </SearchButton>
            </SearchContainer>

            <DeleteAddContainer>
              <DeleteButton color="#A0A0A0" backcolor="#FFFFFF" onClick={handleDeleteAll}>
                일괄 삭제
              </DeleteButton>
              <AddButton color="#FFFFFF" backcolor="#6EA7D0" onClick={handleAddBook}>
                도서 추가
              </AddButton>
            </DeleteAddContainer>
          </InputContainer>
          <SelectContainer>
            <Select color="#FFFFFF" bordercolor="#6EA7D0">
              <option value="">장르</option>
              {GenreOptions.map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </Select>
            <Select color="#FFFFFF" bordercolor="#6EA7D0">
              <option value="">주제어</option>
              {SubjectOptions.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </Select>
            <Select color="#FFFFFF" bordercolor="#6EA7D0">
              <option value="">MBTI</option>
              {MbtiOptions.map((mbti, index) => (
                <option key={index} value={mbti}>
                  {mbti}
                </option>
              ))}
            </Select>
          </SelectContainer>
          <div style={{ height: 'calc(100% - 200px)' }}>
            <Table>
              <thead>
              <tr>
                <CheckboxHeader>
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                </CheckboxHeader>
                <TableHeader>No</TableHeader>
                <TableHeader></TableHeader>
                <TableHeader>도서명</TableHeader>
                <TableHeader>작가</TableHeader>
                <TableHeader>출판사</TableHeader>
                <TableHeader>장르</TableHeader>
                <TableHeader>연령</TableHeader>
                <TableHeader>주제어</TableHeader>
                <TableHeader>MBTI</TableHeader>
                <TableHeader>관리</TableHeader>
              </tr>
              </thead>
              <tbody>
              {books.map((book, index) => (
                <TableRow key={book.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      value={book.id}
                      checked={selectedBooks.includes(book.id)}
                      onChange={() => handleSelectBook(book.id)}
                    />
                  </TableCell>
                  <TableCell>{index + 1 + currentPage * 7}</TableCell>
                  <TableCell style={{ width: '1px'}}><ImagePlaceholder src={book.image ? `data:image/png;base64,${book.image}` : '/assets/home.svg'} alt="이미지 준비중" /></TableCell>
                  <TableCell><TitleContainer>{book.title}</TitleContainer></TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.publisher}</TableCell>
                  <TableCell>{book.bookGenre}</TableCell>
                  <TableCell>{book.ageGroup}</TableCell>
                  <TableCell>{book.bookTopicList.join(', ')}</TableCell>
                  <TableCell>{book.bookMBTI}</TableCell>
                  <TableCell>
                    <Button color="#FFFFFF" backcolor="#6EA7D0"
                            style={{ width: '80px', height: '30px', fontSize: '15px'}}
                            onClick={() => handleUpdateBook(book.id)}>
                      수정
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', position: 'relative', bottom: '0', width: '100%', paddingBottom: '20px' }}>
          <Button color="#FFFFFF" backcolor="#6EA7D0" onClick={handlePreviousPage} disabled={currentPage === 0} style={{ height: 'auto', width: 'auto', fontSize: '15px', margin: '0 5px' }}>
            이전
          </Button>
          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index}
              color={index === currentPage ? "#000000" : "#FFFFFF"}
              backcolor={index === currentPage ? "#FFFFFF" : "#6EA7D0"}
              onClick={() => handlePageClick(index)}
              style={{ height: 'auto', width: 'auto', fontSize: '15px', margin: '0 5px' }}
            >
              {index + 1}
            </Button>
          ))}
          <Button color="#FFFFFF" backcolor="#6EA7D0" onClick={handleNextPage} disabled={currentPage === totalPages - 1} style={{ height: 'auto', width: 'auto', fontSize: '15px', margin: '0 5px' }}>
            다음
          </Button>
        </div>
      </TableContainer>
    </AdminContainer>
  );
};

export default Index;
