import styled from 'styled-components';
import { Container, Input } from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Index = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 페이지 인덱스를 1부터 시작
  const [totalPages, setTotalPages] = useState(0);
  const booksPerPage = 12;

  const fetchBooks = async (page) => {
    try {
      const response = await axios.get(`/api/books?page=${page - 1}&size=${booksPerPage}`); // 페이지 인덱스는 0부터 시작하므로 -1
      setBooks(response.data.response.content);
      setTotalPages(response.data.response.totalPages);  // 전체 페이지 수를 설정
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);  // currentPage가 변경될 때마다 데이터 다시 로드

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleBookClick = (id) => {
    navigate(`/${id}`);
  };

  // 현재 페이지 기준으로 페이지 버튼 범위를 설정합니다.
  const getPaginatedPages = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2); // 현재 페이지 기준으로 2개 전부터 시작
    const endPage = Math.min(totalPages, startPage + 4); // 5개 페이지 버튼 보이기

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <Container color="#f3f3f3">
      <Header textcolor="#000000" color="#f3f3f3" nextBtnImageUrl="/assets/home.svg" title="도서 목록" nextPage='/' />
      <SearchContainer>
        <Input placeholder="입력하세요" color="#6EA7D0" inputcolor="#E6E6E6" />
        <SearchButton />
      </SearchContainer>
      <GridContainer>
        {books.map((book) => (
          <BookCard key={book.bookId} onClick={() => handleBookClick(book.bookId)}>
            <BookImage src={`data:image/jpeg;base64,${book.bookImage}`} alt={book.bookTitle} />
            <BookInfo>
              <BookTitle>{book.bookTitle}</BookTitle>
              <BookTopic>{book.topicNames.join(', ')}</BookTopic>
            </BookInfo>
          </BookCard>
        ))}
      </GridContainer>
      <Pagination>
        <PageButton onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
          이전
        </PageButton>
        {getPaginatedPages().map((page) => (
          <PageButton
            key={page}
            onClick={() => handlePageClick(page)}
            isActive={page === currentPage}
          >
            {page}
          </PageButton>
        ))}
        <PageButton onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>
          다음
        </PageButton>
      </Pagination>
    </Container>
  );
};

export default Index;

// 스타일 컴포넌트 부분은 기존 코드 그대로 사용
const GridContainer = styled.div`
  display: flex;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 90%;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const BookCard = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 140px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #FFD869;
  }
`;

const BookImage = styled.img`
  width: 80px;
  height: 120px;
  object-fit: cover;
  margin-bottom: 0px;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BookTitle = styled.h3`
  font-size: 12px;
  font-weight: bold;
  margin: 8px 0 0 0;
`;

const BookTopic = styled.span`
  font-size: 10px;
  color: #888;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  width: 90%;
`;

const SearchButton = styled.button`
  width: 24px;
  height: 24px;
  background: url('/assets/search.svg') center / contain no-repeat;
  border: none;
  cursor: pointer;
  margin-left: 10px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PageButton = styled.button`
  border: none;
  background-color: ${props => (props.isActive ? '#fac737' : '#FFD869')};
  color: white;
  width: 30px;
  height: 30px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #fac737;
  }
`;
