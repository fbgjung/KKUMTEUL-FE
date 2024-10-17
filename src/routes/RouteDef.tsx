import Main from '../pages/Main';
import BookList from '../pages/BookList';
import BookDetail from '../pages/BookDetail';
import Login from '../pages/Login';
import Survey from '../pages/Survey';
import MyPage from '../pages/MyPage';
import Event from '../pages/Event';
import SignUp from '../pages/SignUp';
import ManageBookList from '../pages/Admin/ManageBookList'
import CreateBookList from '../pages/Admin/CreateBookList'


export const Screens = {
  Main: {
    path: '/',
    element: <Main />
  },

  Login: {
    path: '/login',
    element: <Login />
  },

  SignUp: {
    path: '/signup',
    element: <SignUp />
  },

  BookList: {
    path: '/booklist',
    element: <BookList />
  },

  BookDetail: {
    path: '/bookdetail',
    element: <BookDetail />
  },

  Survey: {
    path: '/survey',
    element: <Survey />
  },
  
  MyPage: {
    path: '/mypage',
    element: <MyPage />
  },

  Event: {
    path: '/event',
    element: <Event />
  },

  ManageBookList: {
    path: '/book/manage',
    element: <ManageBookList />
  },

  CreateBookList: {
    path: '/book/create',
    element: <CreateBookList />
  },




  
};

export const RouteDef = {
  ...Screens,
};
