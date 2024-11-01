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
import UpdateBookList from '../pages/Admin/UpdateBookList';
import MyPageCreateChildProfile from '../pages/MyPageCreateChildProfile';
import MyPageManageChildProfile from '../pages/MyPageManageChildProfile';
import MyPageEditUserProfile from "../pages/MyPageEditUserProfile";
import MyPageDetailChildProfile from "../pages/MyPageDetailChildProfile";
import EventResult from '../pages/EventResult';
import SurveyResult from '../pages/SurveyResult';
import ChildPersonalityHistoryDetail from '../pages/ChildPersonalityHistoryDetail';

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
  
  SurveyResult: {
    path: '/survey/result',
    element: <SurveyResult />
  },

  MyPage: {
    path: '/mypage',
    element: <MyPage />
  },

  MyPageEditUserProfile: {
    path: '/mypage/editUserProfile',
    element: <MyPageEditUserProfile />
  },

  MyPageDetailChildProfile: {
    path: '/mypage/detail/childProfile/:childId',
    element: <MyPageDetailChildProfile />
  },

  Event: {
    path: '/event',
    element: <Event />
  },

  EventResult:{
    path: '/event/result',
    element: <EventResult />
  },

  ManageBookList: {
    path: '/book/manage',
    element: <ManageBookList />
  },

  CreateBookList: {
    path: '/book/create',
    element: <CreateBookList />
  },

  UpdateBookList: {
    path: '/book/update/:book_id',
    element: <UpdateBookList />
  },

  MyPageCreateChildProfile: {
    path: '/mypage/createChildProfile',
    element: <MyPageCreateChildProfile />
  },

  MyPageManageChildProfile: {
    path: '/mypage/manageChildProfile',
    element: <MyPageManageChildProfile />
  },

  ChildPersonalityHistoryDetail: {
    path: '/record/:childProfileId/:historyId',
    element: <ChildPersonalityHistoryDetail />
  }

  
};

export const RouteDef = {
  ...Screens,
};
