import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RouteDef } from './RouteDef';
import BookList from '../pages/BookList';  // 도서 목록 페이지
import BookDetail from '../pages/BookDetail';  // 도서 상세 페이지

const AppPages = () => {
  return (
    <BrowserRouter>
      <Routes>
        {Object.entries({ ...RouteDef }).map(([name, { path, element }], index) => (
          <Route key={name + index} path={path} element={element} />
        ))}
        <Route path="/" element={<BookList />} />
        <Route path="/booklist/:id" element={<BookDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppPages;
