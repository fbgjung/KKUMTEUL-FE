import { useState, useEffect } from 'react';
import { AdminContainer, Button, Input, Select } from '../../../styles/globalStyles';
import Header from '../../../components/layout/Header';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axiosWithToken from "../../../axiosWithToken.ts";

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
    background-color: #FFFFFF;
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
  const [books, setBooks] = useState<Book[]>([]); // 페이지네이션된 도서 목록
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]); // 필터링된 도서 목록
  const [searchResults, setSearchResults] = useState<Book[]>([]); // 검색 결과 목록
  const [searchText, setSearchText] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  interface FilterParams {
    page: number;
    size: number;
    genre?: string;
    topic?: string;
    mbti?: string;
  }

  // 새로운 상태 추가
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedMBTI, setSelectedMBTI] = useState<string>('');

  // 조건에 따라 렌더링할 목록 선택
  const displayedBooks = searchText ? searchResults : filteredBooks;

  // 필터 기능 - 조건에 따라 API 요청
  useEffect(() => {
    const applyFilters = async () => {
      // 필터 초기화
      setFilteredBooks([]);

      // 기본 엔드포인트 및 매개변수 설정
      let endpoint = '/kkumteul/api/admin/books';
      let params: FilterParams = { page: currentPage, size: 7 };

      // 필터 조합에 따라 엔드포인트를 변경
      if (selectedGenre && selectedSubject && selectedMBTI) {
        endpoint += '/filter/all';
        params = { ...params, genre: selectedGenre, topic: selectedSubject, mbti: selectedMBTI };
      } else if (selectedGenre && selectedSubject) {
        endpoint += '/filter/genreandtopic';
        params = { ...params, genre: selectedGenre, topic: selectedSubject };
      } else if (selectedGenre && selectedMBTI) {
        endpoint += '/filter/genreandmbti';
        params = { ...params, genre: selectedGenre, mbti: selectedMBTI };
      } else if (selectedSubject && selectedMBTI) {
        endpoint += '/filter/topicandmbti';
        params = { ...params, topic: selectedSubject, mbti: selectedMBTI };
      } else if (selectedGenre) {
        endpoint += '/filter/genre';
        params.genre = selectedGenre;
      } else if (selectedSubject) {
        endpoint += '/filter/topic';
        params.topic = selectedSubject;
      } else if (selectedMBTI) {
        endpoint += '/filter/mbti';
        params.mbti = selectedMBTI;
      }

      // 필터 API 요청
      try {
        const response = await axiosWithToken.get(endpoint, { params });
        setFilteredBooks(response.data.response.content);
        setTotalPages(response.data.response.totalPages);
      } catch (error) {
        console.error("Error fetching filtered books: ", error);
      }
    };

    // 검색어가 없을 때만 필터를 적용
    if (!searchText){
      applyFilters();
    }
  }, [selectedGenre, selectedSubject, selectedMBTI, currentPage]);

  useEffect(() => {
    if (searchText) {
      handleSearchBook();
    } else {
      // 데이터 초기화
      setSearchResults([]);
      const fetchBooks = async () => {
        try {
          const response = await axiosWithToken.get('/kkumteul/api/admin/books', {
            params: {
              page: currentPage,
              size: 7,
            },
          });
          setBooks(response.data.response.content); // 전체 목록 저장
          setTotalPages(response.data.response.totalPages);
        } catch (error) {
          console.error('도서 목록 조회 실패:', error);
        }
      };
      fetchBooks();
    }
  }, [searchText, currentPage]);


  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchBook();
    }
  };

  const handleSearchBook = async () => {
    // 데이터 초기화
    setFilteredBooks([]);

    try {
      const response = await axiosWithToken.get('/kkumteul/api/admin/books/search', {
        params: {
          page: currentPage,
          size: 7,
          search: searchText
        },
      });
      console.log("Search response:", response.data.response.content);

      setSearchResults(response.data.response.content); // 검색어 결과 목록도 설정
      setTotalPages(response.data.response.totalPages);
    } catch (error) {
      console.error('도서 검색 실패:', error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      // 선택된 도서 ID마다 삭제 요청 보내기
      await Promise.all(selectedBooks.map(async (bookId) => {
        await axiosWithToken.delete(`/kkumteul/api/admin/books/${bookId}`);
      }));

      alert("선택된 도서가 삭제되었습니다!");

      // 삭제 후 목록 갱신
      const remainingBooks = books.filter((book) => !selectedBooks.includes(book.id));
      setBooks(remainingBooks);
      setFilteredBooks(remainingBooks); // filteredBooks도 함께 갱신
      setSelectedBooks([]); // 선택 항목 초기화
    } catch (error) {
      console.error('도서 삭제 실패:', error);
    }
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

  const getVisiblePageNumbers = () => {
    const maxVisibleButtons = 5;
    const totalPageButtons = Math.min(totalPages, maxVisibleButtons);

    // 시작 페이지 계산
    const start = Math.floor(currentPage / maxVisibleButtons) * maxVisibleButtons;
    const end = Math.min(start + totalPageButtons, totalPages);

    return Array.from({ length: end - start }, (_, i) => start + i);
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
         fontSize={'auto'}/>
        <div style={{ padding: '20px', height: '100%' }}>
          <InputContainer>
            <SearchContainer>
              <SearchInput
                placeholder="도서 제목 또는 작가를 검색해보세요"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleKeyDown} // 엔터키 이벤트 추가
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
            <Select color="#FFFFFF" bordercolor="#6EA7D0" onChange={(e) => setSelectedGenre(e.target.value)}>
              <option value="">장르</option>
              {GenreOptions.map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </Select>
            <Select color="#FFFFFF" bordercolor="#6EA7D0" onChange={(e) => setSelectedSubject(e.target.value)}>
              <option value="">주제어</option>
              {SubjectOptions.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </Select>
            <Select color="#FFFFFF" bordercolor="#6EA7D0"  onChange={(e) => setSelectedMBTI(e.target.value)}>
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
              {displayedBooks.length > 0 ? (
                displayedBooks.map((book, index) => (
                <TableRow key={`${book.id}-${index}`}>
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
                  <TableCell>
                    {Array.isArray(book.bookTopicList)
                      ? book.bookTopicList.length === 1
                        ? book.bookTopicList[0]             // 배열의 값이 하나일 때
                        : book.bookTopicList.join(', ')      // 배열의 값이 여러 개일 때
                      : book.bookTopicList}
                  </TableCell>
                  <TableCell>{book.bookMBTI}</TableCell>
                  <TableCell>
                    <Button color="#FFFFFF" backcolor="#6EA7D0"
                            style={{ width: '80px', height: '30px', fontSize: '15px'}}
                            onClick={() => handleUpdateBook(book.id)}>
                      수정
                    </Button>
                  </TableCell>
                </TableRow>
              ))
              ) : (
                <tr>
                  <td colSpan={10}>데이터가 없습니다.</td>
                </tr>
              )}
              </tbody>
            </Table>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', position: 'relative', bottom: '0', width: '100%', paddingBottom: '20px' }}>
          <Button color="#FFFFFF" backcolor="#708090" onClick={handlePreviousPage} disabled={currentPage === 0} style={{ height: '30px', width: '50px', fontSize: '15px', margin: '0 5px' }}>
            이전
          </Button>
          {getVisiblePageNumbers().map((pageNumber) => (
            <Button
              key={pageNumber}
              color={pageNumber === currentPage ? "#000000" : "#FFFFFF"}
              backcolor={pageNumber === currentPage ? "#FFFFFF" : "#6EA7D0"}
              onClick={() => handlePageClick(pageNumber)}
              style={{ height: '30px', width: '30px', fontSize: '15px', margin: '0 5px', borderRadius: '1px'}}
            >
              {pageNumber + 1}
            </Button>
          ))}
          <Button color="#FFFFFF" backcolor="#708090" onClick={handleNextPage} disabled={currentPage === totalPages - 1} style={{ height: '30px', width: '50px', fontSize: '15px', margin: '0 5px' }}>
            다음
          </Button>
        </div>
      </TableContainer>
    </AdminContainer>
  );
};

export default Index;