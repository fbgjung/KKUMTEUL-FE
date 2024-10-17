import { useState } from 'react';
import { AdminContainer, Button, Input, Select } from '../../../styles/globalStyles';
import Header from '../../../components/layout/Header';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const TableContainer = styled.div`
    width: 100%;
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

const CheckboxHeader = styled.th`
    width: 5%;
    text-align: center;
`;

const GenreOptions = [
  "그림책", "만화", "동화(옛날이야기)", "외국동화", "자연의 세계", "역사",
  "사회", "생활과 과학", "예술", "시", "기타"
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

const Index = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "구름 버스 동동",
      publisher: "출판사",
      price: "13,000원",
      genre: "동화책",
      age: "5세",
      date: "2024-10-16",
      subject: "우정",
      mbti: "INFP",
      imageUrl: "/assets/book1.svg"
    }
  ]);
  const [searchText, setSearchText] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);

  const handleSearchBook = () => {
    // 검색 버튼을 눌렀을 때 수행 코드
  };

  const handleDeleteAll = () => {
    setBooks([]);
  };

  const handleAddBook = () => {
    navigate('/book/create');
  };

  const handleUpdateBook = () => {
    navigate('/book/update');
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
        <div style={{ padding: '20px' }}>
          <InputContainer>
            <SearchContainer>
              <SearchInput
                placeholder="도서 검색"
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
          <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
            <Table>
              <thead>
              <tr>
                <CheckboxHeader>
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                </CheckboxHeader>
                <TableHeader>No</TableHeader>
                <TableHeader>도서명</TableHeader>
                <TableHeader>판매가</TableHeader>
                <TableHeader>장르</TableHeader>
                <TableHeader>연령</TableHeader>
                <TableHeader>등록일</TableHeader>
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
                  <TableCell>{index + 1}</TableCell>
                  <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                    <ImagePlaceholder src={book.imageUrl} alt="도서 이미지" /> {book.title}
                    <br />
                    {book.publisher}
                  </TableCell>
                  <TableCell>{book.price}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.age}</TableCell>
                  <TableCell>{book.date}</TableCell>
                  <TableCell>{book.subject}</TableCell>
                  <TableCell>{book.mbti}</TableCell>
                  <TableCell>
                    <Button color="#FFFFFF" backcolor="#6EA7D0"
                            style={{ width: '80px', height: '30px', fontSize: '15px'}}
                            onClick={handleUpdateBook}>
                      수정
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              </tbody>
            </Table>
          </div>
        </div>
      </TableContainer>
    </AdminContainer>
  );
};

export default Index;