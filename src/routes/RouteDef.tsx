import Main from '../pages/Main';
import BookList from '../pages/BookList';
import Login from '../pages/Login';
import Survey from '../pages/Survey';
import MyPage from '../pages/MyPage';
import Event from '../pages/Event';
import SignUp from '../pages/SignUp';


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



  
};

export const RouteDef = {
  ...Screens,
};
