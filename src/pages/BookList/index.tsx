import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Button, Input } from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import { useNavigate } from 'react-router-dom';

// 샘플 도서 데이터
const books = [
    { id: 1, title: "Book 1", topic: "Topic A", imageUrl: "/assets/book.jpg" },
    { id: 2, title: "Book 2", topic: "Topic B", imageUrl: "/assets/book.jpg" },
    { id: 3, title: "Book 3", topic: "Topic C", imageUrl: "/assets/book.jpg" },
    { id: 4, title: "Book 4", topic: "Topic D", imageUrl: "/assets/book.jpg" },
    { id: 5, title: "Book 5", topic: "Topic E", imageUrl: "/assets/book.jpg" },
    { id: 6, title: "Book 6", topic: "Topic F", imageUrl: "/assets/book.jpg" },
    { id: 7, title: "Book 1", topic: "Topic A", imageUrl: "/assets/book.jpg" },
    { id: 8, title: "Book 2", topic: "Topic B", imageUrl: "/assets/book.jpg" },
    { id: 9, title: "Book 3", topic: "Topic C", imageUrl: "/assets/book.jpg" },
    { id: 10, title: "Book 4", topic: "Topic D", imageUrl: "/assets/book.jpg" },
    { id: 11, title: "Book 5", topic: "Topic E", imageUrl: "/assets/book.jpg" },
    { id: 12, title: "Book 6", topic: "Topic F", imageUrl: "/assets/book.jpg" },
    { id: 13, title: "Book 7", topic: "Topic G", imageUrl: "/assets/book.jpg" },
    { id: 14, title: "Book 8", topic: "Topic H", imageUrl: "/assets/book.jpg" },
    { id: 15, title: "Book 9", topic: "Topic I", imageUrl: "/assets/book.jpg" },
    // 추가 도서 데이터...
];

const Index = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 12; // 한 페이지당 도서 수

    // 현재 페이지에 따라 보여줄 도서 계산
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    // 페이지 번호 변경 함수
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // 총 페이지 수 계산
    const totalPages = Math.ceil(books.length / booksPerPage);

    const navigate = useNavigate();

    const handleBookClick = (id) => {
        navigate(`/booklist/${id}`); // 해당 도서의 상세 페이지로 이동
    };

    return (
        <Container color="#f3f3f3">
            <Header textcolor="#000000" color="#f3f3f3" nextBtnImageUrl="/assets/home.svg" title="도서 목록" nextPage='/'/>

            <SearchContainer>
                <Input placeholder="입력하세요" color="#6EA7D0" inputcolor='#E6E6E6' />
                <Button color="#FFFFFF" backcolor='#6EA7D0'>검색</Button>
            </SearchContainer>

            <GridContainer>
                {currentBooks.map((book) => (
                    <BookCard key={book.id} onClick={() => handleBookClick(book.id)}>
                        <BookImage src={book.imageUrl} alt={book.title} />
                        <BookInfo>
                            <BookTitle>{book.title}</BookTitle>
                            <BookTopic>{book.topic}</BookTopic>
                        </BookInfo>
                    </BookCard>
                ))}
            </GridContainer>

            <Pagination>
                {[...Array(totalPages)].map((_, index) => (
                    <PageButton key={index + 1} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </PageButton>
                ))}
            </Pagination>
        </Container>
    );
}

export default Index;

// Grid 레이아웃을 위한 스타일
const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);  /* 3열 레이아웃 */
    gap: 20px;  /* 카드 간격 */
    padding: 20px;
`

// 책 카드 스타일
const BookCard = styled.div`
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 20px;
    padding: 41px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

// 책 표지 스타일
const BookImage = styled.img`
    width: 100px;
    height: 150px;
    object-fit: cover;  /* 이미지 크기 조절 */
    margin-bottom: 0px;
`

// 책 정보 스타일 (제목, 주제어)
const BookInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

// 책 제목 스타일
const BookTitle = styled.h3`
    font-size: 18px;
    font-weight: bold;
    margin: 5px 0 5px 0;
`

// 책 주제어 스타일
const BookTopic = styled.span`
    font-size: 14px;
    color: #888;
`

// 검색 입력과 버튼을 위한 스타일
const SearchContainer = styled.div`
    display: flex;  /* Flexbox 사용 */
    align-items: center;  /* 세로 중앙 정렬 */
    margin: 20px 0;  /* 여백 추가 */
`

// 페이지네이션 스타일
const Pagination = styled.div`
    display: flex;
    justify-content: center; /* 가운데 정렬 */
    margin: 20px 0; /* 여백 추가 */
`

// 페이지 버튼 스타일
const PageButton = styled.button`
    border: none;
    background-color: #6EA7D0;
    color: white;
    padding: 10px 15px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background-color: #5a9ec0;
    }
`
