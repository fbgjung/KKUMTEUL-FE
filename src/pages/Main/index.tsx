import styled, { keyframes } from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Container} from '../../styles/globalStyles';
import LoginModal from '../../modal/LoginModal';
import axiosWithToken from '../../axiosWithToken.ts';
import EventResultModal from '../../modal/EventResultModal';
import AlertModal from '../../modal/AlertModal';


interface Event {
  eventId: number;
  eventName: string;
  eventDescription: string;
  startDate: string;
  expiredDate: string;
}


interface PopularBooks {
    bookId: number
    bookTitle: string
    bookImage: string
}

interface RecommendBook {
    bookId: number;
    bookTitle: string;
    bookImage: string;
}

interface Menu {
    id: number;
    name: string;
    link: string;
    image: string;
}

interface ChildProfile {
    childName: string;
    profileId: number;
    childProfileImage: string;
}

const Index = () => {
  const navigate = useNavigate();

  const onClickPrevButton = () => {
    navigate(-1);
  }

  const [childProfileId, setChildProfileId] = useState<number | null>(
    parseInt(sessionStorage.getItem('childProfileId') || '0') || null
  );

  const [isToggleMenuOpen, setIsToggleMenuOpen] = useState(false);
  const [childProfileList, setChildProfileList] = useState<ChildProfile[]>([]);
  const [recommendedBooks, setRecommendedBooks] = useState<RecommendBook[]>([]);
  const [eventData, setEventData] = useState<Event>();
  const [popularBooks, setPopularBooks] = useState<PopularBooks[]>([]);
  const [childName, setChildName] = useState<string>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // 로그인 유무
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isEventModalOpen, setEventModalOpen] = useState(false); // 이벤트 결과 모달
  const [winners, setWinners] = useState([]); // 이벤트 당첨자 리스트 저장

  const [isAlertModalOpen, setAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const menus: Menu[] = [
    {id: 0, name: 'MBTI 검사', link: '/survey', image: '/assets/menu_mbti.png'},
    {id: 1, name: '도서 목록', link: '/booklist', image: '/assets/menu_book.png'},
    {id: 2, name: '마이페이지', link: '/mypage', image: '/assets/menu_mypage.png'},
  ]

  const toggleMenu = () => {
    if(!isLoggedIn) {
      setIsModalOpen(true); // 로그인 안했을 때 모달창 보여주기
    }
      setIsToggleMenuOpen(prev => !prev); // 로그인 했을 때 토글 목록 보여주기
  };


  const onClickEventBanner = () => {
      if (!isLoggedIn) {
          // alert('로그인이 필요합니다.');
          // navigate('/login');
          setIsModalOpen(true);
      } else if (eventData == null){
        alert("진행중인 이벤트가 없습니다!");
      } else {
        navigate('/ticket', {state: eventData});
      }
  }

  const onClickToggleMenuItem = (profile: ChildProfile) => {
    sessionStorage.setItem('childProfileId', profile.profileId.toString());
    setChildProfileId(profile.profileId);
    setChildName(profile.childName);
    fetchRecommendedBooks(profile.profileId);

    setAlertModalOpen(true);
    setAlertMessage("자녀 프로필 변경이 완료되었습니다!");
  };

  const onClickMenuItem = (menuId: number, menuLink: string) => {
      if (!isLoggedIn) {
        setIsModalOpen(true);
          // alert('로그인이 필요합니다.');
          // navigate('/login'); // 로그인 화면으로 이동
          return;
      }

      if (menuId === 0 && !childProfileId) {
          // alert('자녀 프로필을 선택해주세요.');
          setAlertMessage("자녀 프로필을 선택해주세요.");
          setAlertModalOpen(true);
          return;
      }

      navigate(menuLink);
  };

    const onClickSurvey = () => {
      if (!isLoggedIn) {
        // alert('로그인이 필요합니다.');
        setIsModalOpen(true);
        return;
      }

      if(!childProfileId) {
        setAlertMessage("자녀 프로필을 선택해주세요.");
        setAlertModalOpen(true);
        return;
      }
      navigate('/survey')
    }
  

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenEventModal = () => {
    fetchEventResultList();
    setEventModalOpen(true);
  };

  const handleCloseEventModal = () => {
    setEventModalOpen(false);
  };

  const handleCloseAlertModal = () => {
    setAlertModalOpen(false);
  };

  useEffect(() => {
      const accessToken = sessionStorage.getItem('accessToken');
      setIsLoggedIn(!!accessToken);
      
      // 자녀 프로필 리스트 조회
      const fetchChildProfiles = async () => {
          try {
              const response = await axiosWithToken.get(`/kkumteul/api/childProfiles`);
              const childProfiles = response.data.response;
              console.log(childProfiles);
              setChildProfileList(childProfiles);
          } catch (error) {
              console.error('Failed to fetch child profiles:', error);
          }
      };

      // 자녀 프로필 유효성 검증 api 연동 및 추천 도서 조회 함수 호출
      const fetchChildProfileAndRecommendedBooks = async () => {
          if (childProfileId && childProfileId > 0) {
              try {
                  const response = await axiosWithToken.get(`/kkumteul/api/users/childProfiles/${childProfileId}`);
                  console.log(response.data);
                  await fetchRecommendedBooks(childProfileId);
              } catch (error) {
                  console.error('Failed to fetch child profile:', error);
                  alert('잘못된 접근입니다.');
              }
          } else {
            // 없으면 childProfileId = 0
            setChildName('다른');
            await fetchRecommendedBooks(0);
          }
      };

      console.log('로그인상태' + isLoggedIn);
      console.log('토큰' + accessToken);

      if(isLoggedIn){
        fetchChildProfiles();
        fetchChildProfileAndRecommendedBooks();  
        fetchCurrentEvent();
        fetchEventResultList();
      } else{        
        fetchChildProfileAndRecommendedBooks();  
      }
      

  }, [isLoggedIn]);

  console.log(childProfileList);

  // 추천 도서 목록 조회
  const fetchRecommendedBooks = async (childProfileId: number) => {
      try {
          const url = childProfileId != 0 ? `/kkumteul/api/recommendation/books?childProfileId=${childProfileId}`: `/kkumteul/api/recommendation/books`;
          const response = await axiosWithToken.get(url);
          const recommendedBooks = response.data.response.recommendedBooks;
          const popularBooks = response.data.response.popularBooks;
          console.log("추천책:", recommendedBooks);
          console.log("인기책(추천도서가 없을경우): ", popularBooks);
          setRecommendedBooks(recommendedBooks);
          setPopularBooks(popularBooks);
      } catch (error) {
          console.error('Failed to fetch recommended books:', error);
      }
  };

  // 이벤트 결과 조회
  // 이전날 이벤트 결과 조회 
  const fetchEventResultList = async () => {
    try{
      const response = await axiosWithToken.get(`/kkumteul/api/events/result`);
      console.log("이벤트 당첨자:", response.data.response);
      setWinners(response.data.response);
    } catch(error) {
      console.error('Failed to fetch event result list:', error);
    }
  }

  const handleAddChildProfile = () => {
    navigate('/mypage/createChildProfile');
  }

  const formatImageSrc = (imageData: string | null) => {
      return imageData ? `data:image/png;base64,${imageData}` : '/assets/dog.svg';
  };
    

  // 현재 진행중인 이벤트 정보 조회
  const fetchCurrentEvent = async() => {
    try {
      const response = await axiosWithToken.get(`/kkumteul/api/events`);
      console.log("이벤트:", response.data.response);
      setEventData(response.data.response);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <Container color="#fdf8d7">
      <Header>
          <PrevButton onClick={onClickPrevButton} $imageurl="/assets/prev_button.svg"></PrevButton>
          <Title>꿈틀</Title>
          <NextButton onClick={toggleMenu} $imageurl="/assets/menu.svg"></NextButton>
          {!isLoggedIn && isModalOpen && (
          <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
         )}
          
          {isLoggedIn && isToggleMenuOpen && (
          <DropdownMenu>
            {childProfileList.length > 0 ? (
              childProfileList.map((profile) => (
                <DropdownItem
                  key={profile.profileId}
                  onClick={() => onClickToggleMenuItem(profile)}
                >
                <LinkContainer>
                <LinkImage src={formatImageSrc(profile.childProfileImage)} alt={profile.childName} />
                <LinkTitle $color="#6EA7D0">{profile.childName}</LinkTitle>
                </LinkContainer>
                
                </DropdownItem>
              ))
            ) : (
              <>
                <DropdownItem onClick={handleAddChildProfile}>
                  <LinkTitle $color='#FFC317'>자녀 추가하기</LinkTitle>
                </DropdownItem>
              </>
            )}
          </DropdownMenu>
        )}
      </Header>

      <ImageWrapper>
        <Image src="/assets/main.jpg" alt="Main Test" />      
      </ImageWrapper> 

      <MenuSection>
      {menus.map((menu) => (
        <Menus key={menu.id} onClick={() => onClickMenuItem(menu.id, menu.link)}>
          <LinkButton src={menu.image}/>
          <LinkTitle $color='#ffffff'>{menu.name}</LinkTitle>
        </Menus>
      ))}
      </MenuSection>  
      {isAlertModalOpen && (
        <AlertModal
          isOpen={isAlertModalOpen}
          message={alertMessage}
          onClose={handleCloseAlertModal}
          icon="/assets/childprofile.png"
        />
      )}
      
      <EventBanner onClick={onClickEventBanner}>
      <EventImage src="/assets/donut.png" alt="Event" />
        <EventTitle>선착순 쿠키 Event!!</EventTitle>
        <EventText>오늘 오후 1시! 행운의 당첨자는?</EventText>
      </EventBanner>

      <EventResultContainer>
      <EventResult onClick={handleOpenEventModal}>
          <EventResultImage src='/assets/cookie.png'></EventResultImage>
          <EventResultText>당첨확인</EventResultText>
        </EventResult>
      </EventResultContainer>
      <EventResultModal isOpen={isEventModalOpen} onClose={handleCloseEventModal} winners={winners} />

      


          <RecommendTitleSection>
            <RecommendTitleImage src="/assets/help.png"></RecommendTitleImage>
            <RecommendTitleText>
            <RecommendTitle>책을 선택하는</RecommendTitle>
            <RecommendTitle>고민의 시간을 덜어드려요 </RecommendTitle>
            <RecommendExplainText>매일매일 새로운 꿈틀이 맞춤 도서를 만날 수 있어요!</RecommendExplainText>
          </RecommendTitleText>
          </RecommendTitleSection>
        
          <RecommendBookSection>
          <RecommendTitleWrapper>
              <RecommendImage src = "/assets/topic/science.png"></RecommendImage>
              <RecommendBookTitle>자녀 성향 진단으로 책 추천받기</RecommendBookTitle>
            </RecommendTitleWrapper>
              <RecommendBookText>MBTI 검사로 맞춤 도서 추천을 받아보세요.</RecommendBookText>
              <RecommendBookText>진단 내역이 없을 시 연령대 별 도서를 추천해 드려요.</RecommendBookText>
              <RecommendContainer>
              <RecommendInfo $backgroundColor="#ffc127">
                <RecommendInfoTitle>꿈틀이 맞춤</RecommendInfoTitle>
                <RecommendInfoTitle>추천도서</RecommendInfoTitle>
                <RecommendInfoText $textColor='#f7eeac'>성향 진단 결과 맞춤 추천 도서에요!</RecommendInfoText>
                <SurveyButton onClick={onClickSurvey}>진단하기</SurveyButton>
                <RecommendInfoImage src="/assets/kkumteul_character.png" alt="Description" />
              </RecommendInfo>
              {recommendedBooks.map((book) => (
                <RecommendItem key={book.bookId}>
                    <RecommendBookImage
                        onClick={() => navigate(`/booklist/${book.bookId}`)}
                        $imageurl={formatImageSrc(book.bookImage)}
                        $borderColor='#fee208'
                    />
                </RecommendItem>
              ))}
              </RecommendContainer>
          </RecommendBookSection>

          <RecommendBookSection>

            <RecommendTitleWrapper>
              <RecommendImage src = "/assets/genre/topic_image.png"></RecommendImage>
              <RecommendBookTitle>[HOT] 요즘 인기 도서</RecommendBookTitle>
            </RecommendTitleWrapper>
          
              <RecommendContainer>
              <RecommendInfo $backgroundColor="#fd7193">
                <RecommendInfoTitle>친구들은</RecommendInfoTitle>
                <RecommendInfoTitle>어떤 책을?</RecommendInfoTitle>
                <RecommendInfoText $textColor='#fcbbcb'>좋아요를 가장 많이 받았어요!</RecommendInfoText>
                <RecommendInfoImage src="/assets/kkumteul_character.png" alt="Description" />
              </RecommendInfo>
                  {popularBooks.map((book, index) => (
                      <RecommendItem key={book.bookId}>
                        <RankBadge>{index + 1}</RankBadge>  
                          <RecommendBookImage 
                              onClick={() => navigate(`/booklist/${book.bookId}`)}
                              $imageurl={formatImageSrc(book.bookImage)}
                              $borderColor='#fd7193'
                          />
                      </RecommendItem>
                  ))}
              </RecommendContainer>
          </RecommendBookSection>
      </Container>
    );
  };


export default Index;

const bounceEvent = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const Header = styled.div`
    width: 100%;
    height: 60px;
    background-color: #fee208;
    align-items: center;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1000;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 60px;
    right: 10px;
    width: 200px;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    z-index: 1001;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 2px solid #fee208;;

`;

const DropdownItem = styled.div`
    display: flex;
    align-items: center;
    padding: 20px 0;
    cursor: pointer;
    width: 100%;
    justify-content: center;
`;

const Title = styled.h2`
    margin: 0;
    color: #000000;
    font-size: 18px;
    font-family: 'CookieRunRegular', sans-serif;
`;

const PrevButton = styled.button<{ $imageurl: string }>`
    width: 30px;
    height: 30px;
    padding: 0;
    background: no-repeat center/cover url(${({$imageurl}) => $imageurl});
`
const NextButton = styled.button<{ $imageurl: string }>`
    width: 25px;
    height: 25px;
    padding: 0;
    background: no-repeat center/cover url(${({$imageurl}) => $imageurl});
    overflow: hidden;
`

const ImageWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Image = styled.img`
    width: 95%;
    height: 420px;
    border-radius: 20px;
    margin-top: 10px;
`

// 링크
const MenuSection = styled.div`
    width: 95%;
    height: 100px;
    background-color: #ffffff;
    margin: 20px 10px 0 10px;
    border-radius: 20px;
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.03);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 40px;
`;

const Menus = styled.div`
    flex-direction: column;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 20px 0;
`

const LinkButton = styled.img`
    width: 45px;
    height: 45px;
    padding: 0;
    margin-bottom: 8px;
    transition: transform 0.2s ease;
    
    &:hover {
        transform: translateY(-5px);
    }
`

const LinkContainer = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 margin: 0;
 padding: 0;
 
`

const LinkImage = styled.img`
  width: 40px;
  height: 40px;
  border: 2px solid #fee208;
  border-radius: 100px;
  margin-bottom: 4px;
  transition: transform 0.2s ease;
    
    &:hover {
        transform: translateY(-5px);
    }
  
`

const LinkTitle = styled.p<{ $color: string }>`
    font-size: 12px;
    padding: 0;
    margin: 0;

    &:hover {
        color: ${({$color}) => $color}
    }

`

// 이벤트 배너
const EventBanner = styled.div`
    width: 95%;
    height: 100px;
    background-color: #ffd8df;
    margin: 20px 10px 8px 10px;
    border-radius: 20px;
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.03);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    border: 4px solid #ec8396;
    flex-direction: column;
    padding: 30px;
    cursor: pointer;
    position: relative;
    transition: transform 0.2s ease;
    
    &:hover {
        transform: translateY(-5px);
    }
`;

const EventTitle = styled.p`
    font-family: RecipekoreaFont, sans-serif, Arial;
    font-size: 30px;
    color: #ec8396;
    margin: 0;
`

const EventText = styled.p`
  margin: 0;
  color: #7e4747;

`

const EventImage = styled.img`
    position: absolute;
    top: -30px;
    right: 10px;
    width: 60px;
    height: 60px;
    object-fit: cover;
`;


// 이벤트 결과

const EventResultContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
`
const EventResult = styled.div`
  width: 70px;
  border-radius: 30px 0 0 30px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2px;
`;

const EventResultImage = styled.img`
  width: 35px;
  height: 35px;
  animation: ${bounceEvent} 0.5s ease-in-out infinite;
`

const EventResultText = styled.p`
  margin: 0;
  font-size: 10px;
  color: brown;
`

// 도서 추천
const RecommendBookSection = styled.div`
  width: 95%;
  background-color: #ffffff;
  border-radius: 20px;
  margin: 12px 10px 20px 10px;
  padding: 20px 20px 40px 20px;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const RecommendTitleSection = styled.div`
  width: 90%;
  display: flex;
`



const RecommendTitleImage = styled.img`
  width: 44px;
  height: 44px;
  margin-right: 20px;
`;


const RecommendTitleText = styled.div`
  width: 100%;
  
`

const RecommendTitle = styled.h2`
    margin-bottom: 0px;
    width: 90%;
    color: #605951;
    margin: 0;

`;
const RecommendExplainText = styled.p`
  color: #FFC317;
  margin: 2px;
  font-weight: bold;
`

const RecommendTitleWrapper = styled.div`
  display: flex;
  width: 100%;
`
const RecommendImage = styled.img`
  width: 34px;
  height: 34px;
`
const RecommendBookTitle = styled.h3`
  margin: 10px 0 6px 10px;
  width: 100%;
`

const RecommendBookText = styled.p`
  margin: 0 0 0 90px;
  width: 100%;
  font-size:12px;
  color: #9f9f9f;
`

const RecommendContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    gap: 0;
    width: 100%;

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const RecommendInfo = styled.div<{ $backgroundColor?: string}>` 
  width: 134px;
  height: 160px;
  background-color: ${({ $backgroundColor }) => $backgroundColor || '#FFC317'};
  padding: 20px;
  flex-shrink: 0;
  border-radius: 20px;
  margin: 10px 20px 10px 0;
  display: flex;
  position: relative;
  flex-direction: column;
`;


const RecommendInfoTitle = styled.h4`
  color: #ffffff;
  margin: 0;
`

const RecommendInfoText = styled.p<{ $textColor: string}>` 
  font-size:12px;
  margin:0px;
  color: ${({ $textColor }) => $textColor || '#000000'};
`

const SurveyButton = styled.span`
  margin-top: 30px;
  width: 40px;
  background-color: #ffff;
  border-radius: 20px;
  font-size:10px;
  padding: 4px 10px;
  text-align: center;
  cursor: pointer;
`

const RecommendInfoImage = styled.img`
  position: absolute; 
  bottom: -10px;
  right: -20px;
  width: 75px;
  height: 75px;
`


// 추천 책 리스트
const RecommendItem = styled.div`
    /* width: 100%; */
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 10px 0 0;
    justify-content: flex-start;
    cursor: pointer;
    position: relative;
`;

const RecommendBookImage = styled.img<{ $imageurl: string, $borderColor:string }>`
  width: 100px;
  height: 140px;
  background: no-repeat center/cover url(${({$imageurl}) => $imageurl});
  padding: 0;
  margin: 0;
  border-radius: 18px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  border: 2px solid ${({ $borderColor }) => $borderColor || '#ffffff'};
  &:hover {
        transform: scale(1.05);
    }

    &.active {
        transform: scale(0.9); 
        transition: transform 0.1s ease;
    }
`;

const RankBadge = styled.div`
    position: absolute;
    top: 100px;
    left: 72px;
    color: #fd7193;
    font-weight: 900;
    border-radius: 50%;
    font-size: 60px;
    z-index: 1;
    -webkit-text-stroke: 1px #ffffff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    font-family: 'Nunito', sans-serif;
`;
