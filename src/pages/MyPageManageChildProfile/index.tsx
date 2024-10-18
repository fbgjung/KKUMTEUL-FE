// import { useState } from 'react';
// import { AdminContainer, Button, Input, Select } from '../../../styles/globalStyles';
// import Header from '../../../components/layout/Header';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
//
// const TableContainer = styled.div`
//     width: 100%;
// `;
//
// const Table = styled.table`
//     width: 100%;
//     border-collapse: collapse;
//     margin-top: 20px;
//     background-color: #ffffff;
// `;
//
// const TableHeader = styled.th`
//     border-top: 1px solid #ddd;
//     border-bottom: 1px solid #ddd;
//     padding: 8px;
//     text-align: center;
// `;
//
// const TableCell = styled.td`
//     border-top: 1px solid #ddd;
//     border-bottom: 1px solid #ddd;
//     padding: 8px;
//     text-align: center;
// `;
//
// const TableRow = styled.tr`
//     &:nth-child(even) {
//         background-color: #ffffff;
//     }
//
//     &:nth-child(odd) {
//         background-color: #ffffff;
//     }
// `;
//
// const ImagePlaceholder = styled.img`
//     width: 50px;
//     height: 70px;
//     background-color: #D3D3D3;
//     margin-right: 10px;
//     object-fit: cover;
// `;
//
// const InputContainer = styled.div`
//     display: flex;
//     width: 100%;
//     margin-bottom: 20px;
//     align-items: center;
// `;
//
// const SearchContainer = styled.div`
//     display: flex;
//     width: 65%;
// `;
//
// const SearchInput = styled(Input)`
//     width: 88%;
//     background-color: #ffffff;
//     color: #6EA7D0;
//     margin-left: 0px;
// `;
//
// const SearchButton = styled(Button)`
//     background-color: rgba(110, 167, 208, 0.31);
//     width: 10%;
//     height: auto;
//     color: #FFFFFF;
//     font-size: 15px;
// `;
//
// const DeleteAddContainer = styled.div`
//     display: flex;
//     width: 35%;
//     justify-content: flex-end;
// `;
//
// const DeleteButton = styled(Button)`
//     background-color: #ffffff;
//     width: 25%;
//     color: #A0A0A0;
//     font-size: 15px;
// `;
//
// const AddButton = styled(Button)`
//     background-color: #6EA7D0;
//     width: 25%;
//     color: #FFFFFF;
//     margin-left: 20px;
//     font-size: 15px;
// `;
//
// const SelectContainer = styled.div`
//     display: flex;
//     gap: 10px;
//     margin-top: 10px;
//     align-items: flex-start;
//     width: 30%;
// `;
//
// const CheckboxHeader = styled.th`
//     width: 5%;
//     text-align: center;
// `;
//
// const GenreOptions = [
//   "그림책", "만화", "동화(옛날이야기)", "외국동화", "자연의 세계", "역사",
//   "사회", "생활과 과학", "예술", "시", "기타"
// ];
//
// const SubjectOptions = [
//   "환경", "동물", "성장", "가족", "과학", "생명", "수학", "세계 문화", "인물",
//   "스포츠", "협동", "미술", "모험", "기계", "식물", "꿈", "관찰", "사랑",
//   "영웅", "외계인", "외국어", "용서", "우주", "유머", "음악", "의학",
//   "이별", "사랑"
// ];
//
// const MbtiOptions = [
//   "ENTP", "ENTJ", "ENFP", "ENFJ", "ESTP", "ESTJ", "ESFP", "ESFJ",
//   "INTP", "INTJ", "INFP", "INFJ", "ISTP", "ISTJ", "ISFP", "ISFJ"
// ];
//
// const Index = () => {
//   const navigate = useNavigate();
//   const [books, setBooks] = useState([
//     {
//       book_id: 1,
//       title: "구름 버스 동동",
//       author: "김작가",
//       publisher: "출판사",
//       genre: "동화책",
//       age_group: "5세",
//       date: "2024-10-16",
//       subject: "우정",
//       mbti: "INFP",
//       book_image: "/assets/home.svg"
//     },
//     {
//       book_id: 2,
//       title: "구름 버스 동동",
//       author: "김작가",
//       publisher: "출판사",
//       genre: "동화책",
//       age_group: "5세",
//       date: "2024-10-16",
//       subject: "우정",
//       mbti: "INFP",
//       book_image: "/assets/home.svg"
//     },
//     {
//       book_id: 3,
//       title: "구름 버스 동동",
//       author: "김작가",
//       publisher: "출판사",
//       genre: "동화책",
//       age_group: "5세",
//       date: "2024-10-16",
//       subject: "우정",
//       mbti: "INFP",
//       book_image: "/assets/home.svg"
//     }
//   ]);
//   const [selectedGenre, setSelectedGenre] = useState('');
//   const [selectedSubject, setSelectedSubject] = useState('');
//   const [selectedMbti, setSelectedMbti] = useState('');
//
//   const handleSelectGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedGenre(event.target.value);
//   };
//
//   const handleSelectSubject = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedSubject(event.target.value);
//   };
//
//   const handleSelectMbti = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedMbti(event.target.value);
//   };
//
//   const filteredBooks = books.filter((book) => {
//     return (
//       (selectedGenre === '' || book.genre === selectedGenre) &&
//       (selectedSubject === '' || book.subject === selectedSubject) &&
//       (selectedMbti === '' || book.mbti === selectedMbti)
//     );
//   });
//
//   const handleDeleteAll = () => {
//     setBooks([]);
//   };
//
//   const handleAddBook = () => {
//     navigate('/book/create');
//   };
//
//   const handleUpdateBook = (book_id) => {
//     navigate(`/book/update/${book_id}`);
//   };
//
//   return (
//     <AdminContainer color="#f3f3f3">
//       <TableContainer>
//         <Header
//           textcolor="#000000"
//           color="#f3f3f3"
//           nextBtnImageUrl="/assets/home.svg"
//           title="우리집 꿈틀이들"
//           nextPage='/'
//         />
//         <div style={{ padding: '20px' }}>
//           <SelectContainer>
//             <Select color="#FFFFFF" bordercolor="#6EA7D0" value={selectedGenre} onChange={handleSelectGenre}>
//               <option value="">장르</option>
//               {GenreOptions.map((genre, index) => (
//                 <option key={index} value={genre}>
//                   {genre}
//                 </option>
//               ))}
//             </Select>
//             <Select color="#FFFFFF" bordercolor="#6EA7D0" value={selectedSubject} onChange={handleSelectSubject}>
//               <option value="">주제어</option>
//               {SubjectOptions.map((subject, index) => (
//                 <option key={index} value={subject}>
//                   {subject}
//                 </option>
//               ))}
//             </Select>
//             <Select color="#FFFFFF" bordercolor="#6EA7D0" value={selectedMbti} onChange={handleSelectMbti}>
//               <option value="">MBTI</option>
//               {MbtiOptions.map((mbti, index) => (
//                 <option key={index} value={mbti}>
//                   {mbti}
//                 </option>
//               ))}
//             </Select>
//           </SelectContainer>
//           <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
//             <Table>
//               <thead>
//               <tr>
//                 <CheckboxHeader>
//                   <input type="checkbox" />
//                 </CheckboxHeader>
//                 <TableHeader>No</TableHeader>
//                 <TableHeader>도서명</TableHeader>
//                 <TableHeader>작가</TableHeader>
//                 <TableHeader>출판사</TableHeader>
//                 <TableHeader>장르</TableHeader>
//                 <TableHeader>연령</TableHeader>
//                 <TableHeader>등록일</TableHeader>
//                 <TableHeader>주제어</TableHeader>
//                 <TableHeader>MBTI</TableHeader>
//                 <TableHeader>관리</TableHeader>
//               </tr>
//               </thead>
//               <tbody>
//               {filteredBooks.map((book, index) => (
//                 <TableRow key={book.book_id}>
//                   <TableCell>
//                     <input
//                       type="checkbox"
//                       value={book.book_id}
//                     />
//                   </TableCell>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell style={{ display: 'flex', alignItems: 'center' }}>
//                     <ImagePlaceholder src={book.book_image} alt="이미지 준비중" /> {book.title}
//                   </TableCell>
//                   <TableCell>{book.author}</TableCell>
//                   <TableCell>{book.publisher}</TableCell>
//                   <TableCell>{book.genre}</TableCell>
//                   <TableCell>{book.age_group}</TableCell>
//                   <TableCell>{book.date}</TableCell>
//                   <TableCell>{book.subject}</TableCell>
//                   <TableCell>{book.mbti}</TableCell>
//                   <TableCell>
//                     <Button color="#FFFFFF" backcolor="#6EA7D0"
//                             style={{ width: '80px', height: '30px', fontSize: '15px'}}
//                             onClick={() => handleUpdateBook(book.book_id)}>
//                       수정
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//               </tbody>
//             </Table>
//           </div>
//         </div>
//       </TableContainer>
//     </AdminContainer>
//   );
// };
//
// export default Index;
