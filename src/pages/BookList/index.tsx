import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Button, Input } from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import { useNavigate } from 'react-router-dom';

const books = [
    { id: 1, title: "책 1", author: "작가 1", price: 10000, publisher: "출판사 1", page: 200, summary: "이 책은 환경 보호에 관한 이야기입니다.", age_group: "6세 이상", book_image: "/assets/book.jpg", mbti: "INFJ", topic: "환경", genre: "자연의 세계" },
    { id: 2, title: "책 2", author: "작가 2", price: 10000, publisher: "출판사 2", page: 180, summary: "이 책은 동물의 생태를 다룹니다.", age_group: "9세 이상", book_image: "/assets/book.jpg", mbti: "ENTP", topic: "동물", genre: "만화" },
    { id: 3, title: "책 3", author: "작가 1", price: 10000, publisher: "출판사 3", page: 150, summary: "이 책은 가족의 소중함을 이야기합니다.", age_group: "6세 이상", book_image: "/assets/book.jpg", mbti: "ISFP", topic: "가족", genre: "그림책" },
    { id: 4, title: "책 4", author: "작가 3", price: 10000, publisher: "출판사 1", page: 250, summary: "이 책은 성장에 관한 내용을 담고 있습니다.", age_group: "12세 이상", book_image: "/assets/book.jpg", mbti: "ESTJ", topic: "성장", genre: "동화(옛날이야기)" },
    { id: 5, title: "책 5", author: "작가 2", price: 10000, publisher: "출판사 2", page: 220, summary: "이 책은 과학의 원리를 설명합니다.", age_group: "9세 이상", book_image: "/assets/book.jpg", mbti: "INTP", topic: "과학", genre: "생활과 과학" },
    { id: 6, title: "책 6", author: "작가 3", price: 10000, publisher: "출판사 3", page: 190, summary: "이 책은 인물에 대한 흥미로운 이야기입니다.", age_group: "12세 이상", book_image: "/assets/book.jpg", mbti: "ENFP", topic: "인물", genre: "역사" },
    { id: 7, title: "책 7", author: "작가 1", price: 10000, publisher: "출판사 1", page: 170, summary: "이 책은 스포츠의 중요성을 강조합니다.", age_group: "6세 이상", book_image: "/assets/book.jpg", mbti: "ISFJ", topic: "스포츠", genre: "기타" },
    { id: 8, title: "책 8", author: "작가 2", price: 10000, publisher: "출판사 2", page: 210, summary: "이 책은 꿈을 이루는 방법에 대해 설명합니다.", age_group: "9세 이상", book_image: "/assets/book.jpg", mbti: "ENTJ", topic: "꿈", genre: "예술" },
    { id: 9, title: "책 9", author: "작가 3", price: 10000, publisher: "출판사 3", page: 240, summary: "이 책은 과거와 현재의 관계를 탐구합니다.", age_group: "12세 이상", book_image: "/assets/book.jpg", mbti: "ESTP", topic: "역사", genre: "사회" },
    { id: 10, title: "책 10", author: "작가 1", price: 10000, publisher: "출판사 1", page: 160, summary: "이 책은 협동의 중요성을 다룹니다.", age_group: "6세 이상", book_image: "/assets/book.jpg", mbti: "INFP", topic: "협동", genre: "시" },
    { id: 11, title: "책 11", author: "작가 2", price: 10000, publisher: "출판사 2", page: 200, summary: "이 책은 사랑의 의미를 탐구합니다.", age_group: "9세 이상", book_image: "/assets/book.jpg", mbti: "ENFJ", topic: "사랑", genre: "동화(옛날이야기)" },
    { id: 12, title: "책 12", author: "작가 3", price: 10000, publisher: "출판사 3", page: 230, summary: "이 책은 외계인의 이야기를 다룹니다.", age_group: "12세 이상", book_image: "/assets/book.jpg", mbti: "ISTJ", topic: "외계인", genre: "자연의 세계" },
    { id: 13, title: "책 13", author: "작가 1", price: 10000, publisher: "출판사 1", page: 190, summary: "이 책은 음악의 아름다움을 탐구합니다.", age_group: "6세 이상", book_image: "/assets/book.jpg", mbti: "ESFP", topic: "음악", genre: "예술" },
    { id: 14, title: "책 14", author: "작가 2", price: 10000, publisher: "출판사 2", page: 220, summary: "이 책은 기계의 원리를 설명합니다.", age_group: "9세 이상", book_image: "/assets/book.jpg", mbti: "ISTP", topic: "기계", genre: "생활과 과학" },
    { id: 15, title: "책 15", author: "작가 3", price: 10000, publisher: "출판사 3", page: 210, summary: "이 책은 식물의 신비로운 세계를 다룹니다.", age_group: "12세 이상", book_image: "/assets/book.jpg", mbti: "ESFJ", topic: "식물", genre: "자연의 세계" }
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
              <Input placeholder="     입력하세요" color="#6EA7D0" inputcolor="#E6E6E6" />
              <BtnMagnifier
                color="#FFFFFF"
                backcolor="#6EA7D0"
                nextBtnImageUrl="/assets/magnifier.png"
              />
            </SearchContainer>

            <GridContainer>
                {currentBooks.map((book) => (
                    <BookCard key={book.id} onClick={() => handleBookClick(book.id)}>
                        <BookImage src={book.book_image} alt={book.title} />
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

    &:hover {
        background-color: #fcf5d2;
    }

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
    width: 100%;  /* 컨테이너 전체 너비 사용 */
`;

const BtnMagnifier = styled.button`
  width: 40px;
  height: 40px;
  background-color: transparent; /* 배경을 투명으로 설정 */
  color: ${(props) => props.color || "#FFF"}; /* 텍스트 색상 */
  background-image: url(${(props) => props.nextBtnImageUrl}); /* 돋보기 아이콘 */
  background-size: contain; /* 아이콘 크기 조정 */
  background-repeat: no-repeat; /* 아이콘 반복 안 함 */
  background-position: center; /* 아이콘 중앙 정렬 */
  border: none; /* 기본 테두리 제거 */
  border-radius: 5px; /* 모서리 둥글게 */
  cursor: pointer; /* 커서 포인터 */
  margin-left: 10px; /* 입력 필드와의 간격 */
`;


// 페이지네이션 스타일
const Pagination = styled.div`
    display: flex;
    justify-content: center; /* 가운데 정렬 */
    margin: 20px 0; /* 여백 추가 */
`

// 페이지 버튼 스타일
const PageButton = styled.button`
    border: none;
    background-color: #FFD869;
    color: white;
    padding: 10px 15px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background-color: #fac737;
    }
`
