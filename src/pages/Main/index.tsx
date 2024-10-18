import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Container } from '../../styles/globalStyles';


interface RecommendBook {
  id: number;
  title: string;
  image: string;
}

interface Menu {
  id: number;
  name: string;
  link: string;
  image: string;
}

interface ToggleMenu {
  id: number;
  name: string;
  to: string|number;
}

const Index = () => {
  const navigate = useNavigate();

  const onClickPrevButton = () => {
    navigate(-1);
  }

  const [isToggleMenuOpen, setIsToggleMenuOpen] = useState(false);
  const [child, setChild] = useState<number>(0); // 자녀 아이디 설정

  const recommendBookData: RecommendBook[] = [
    { id: 0, title: '구름 버스 둥둥 ', image: '/assets/book1.svg' },
    { id: 1, title: '자신감 안경', image: '/assets/book2.svg' },
    { id: 2, title: '숲속에 숨어 있어', image: '/assets/book3.svg' },
    { id: 3, title: '꿈틀', image: '/assets/book1.svg' },
    { id: 4, title: '꿈틀', image: '/assets/book1.svg' },
  ];

  const menus: Menu[] = [
    { id: 0, name: 'MBTI 검사', link: '/survey', image: '/assets/survey.png' },
    { id: 1, name: '도서 목록', link: '/booklist', image: '/assets/book.png' },
    { id: 2, name: '마이페이지', link: '/mypage', image: '/assets/mypage.png' },
  ]

  const toggleMenus: ToggleMenu[] = [
    { id: 1, name: '꿈틀이1', to: 1},
    { id: 2, name: '꿈틀이2', to: 2},
    { id: 3, name: '꿈틀이3', to: 3},
  ]

  const toggleMenu = () => {
    setIsToggleMenuOpen((prev) => !prev);
  };

  const onClickToggleMenuItem = (menu:ToggleMenu) => {
    setChild(menu.to as number);
  };

  const onClickEventBanner = () => {
    navigate('/event');
  }

  return (
    <Container color="#f3f3f3">
      <Header>
          <PrevButton onClick={onClickPrevButton} $imageurl="/assets/prev_button.svg"></PrevButton>
          <Title>꿈틀</Title>
          <NextButton onClick={toggleMenu} $imageurl="/assets/menu.svg"></NextButton>
          {isToggleMenuOpen && (
          <DropdownMenu>
            {toggleMenus.map((toggleMenu) => (
              <DropdownItem key={toggleMenu.id} onClick={() => onClickToggleMenuItem(toggleMenu)}>
                <LinkTitle $color='#6EA7D0'>{toggleMenu.name}</LinkTitle>
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </Header>
      <Image />
      <MenuSection>
      {menus.map((menu) => (
        <Menus key={menu.id} onClick={() => navigate(menu.link)}>
          <LinkButton src={menu.image}/>
          <LinkTitle $color='#000000'>{menu.name}</LinkTitle>
        </Menus>
      ))}
      </MenuSection>   
      <EventBanner onClick={onClickEventBanner}>
        <EventTitle>선착순 100명 이벤트</EventTitle>
      </EventBanner>
      <RecommendTitle>🐰 꿈틀이를 위한 오늘의 책 추천</RecommendTitle>
      <RecommendBookSection>
          <ArrowBubble>
              <RecommendText>ISFJ 꿈틀이들은 어떤 책을 좋아할까??</RecommendText>
          </ArrowBubble>
          <RecommendContainer>
              <MbtiImage></MbtiImage>
              {recommendBookData.map((book) => (
                  <RecommendItem key={book.id}>
                      <RecommendBookImage $imageurl={book.image} />
                      <RecommendBookTitle>{book.title}</RecommendBookTitle>
                  </RecommendItem>
              ))}
          </RecommendContainer>
      </RecommendBookSection>
    </Container>
  );
};

export default Index;

const Header = styled.div`
  width: 100%;
  height: 60px;
  background-color: #F3F3F3;
  align-items: center; 
  position: sticky;
  top: 0; 
  left: 0;
  z-index: 1000;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 60px;
  right: 10px;
  width: 120px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  width: 100%;
  justify-content: center;
`;

const Title = styled.h2`
  margin: 0;
  color: #000000;
  font-size: 18px;
`;

const PrevButton = styled.button<{$imageurl: string}>`
  width: 30px;
  height: 30px;
  padding:0;
  background: no-repeat center/cover url(${({ $imageurl }) => $imageurl});
`
const NextButton = styled.button<{$imageurl: string}>`
  width: 25px;
  height: 25px;
  padding: 0;
  background: no-repeat center/cover url(${({ $imageurl }) => $imageurl});
  overflow: hidden;
`

const Image = styled.div`
  width: 600px;
  height: 270px;
  background: no-repeat center/contain url("/assets/main_test_image.svg");
  background-size: contain;
`;

// 링크
const MenuSection = styled.div`
  width: calc(100% - 40px);
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
`

const LinkButton = styled.img`
  width: 50px;
  height: 50px;
  padding: 0;
  margin-bottom: 8px;
`

const LinkTitle = styled.p<{$color: string}>`
  font-size: 12px;
  padding: 0;
  margin: 0;
  &:hover {
    color: ${({ $color }) => $color}
  }
  
`

// 이벤트 배너
const EventBanner = styled.div`
  width: calc(100% - 40px);
  height: 100px;
  background-color: #04cb94;
  margin: 20px 10px 10px 10px;
  border-radius: 20px;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.03);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
`;

const EventTitle = styled.p`
  font-weight: bold;
  font-style: italic;
  font-size: 30px;
`

// 도서 추천
const RecommendBookSection = styled.div`
  width: calc(100% - 40px);
  background-color: #ffffff;
  border-radius: 20px;
  margin: 12px 10px 90px 10px;
  padding: 20px 20px 40px 20px;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const RecommendTitle = styled.h3`
  margin-bottom: 2px;
  width: calc(100% - 40px);

`;

const RecommendText = styled.p`
  margin: 0;
  color: #FFC317;
  font-size: 18px;
  text-align: center;
`;

const ArrowBubble = styled.div`
  margin: 10px;
  position: relative;
  width: calc(100% - 40px);
  height: auto;
  padding: 10px;
  background: #ffffff;
  border-radius: 30px;
  border: #FFC317 solid 3px;

  @media screen and (max-width: 650px) {
    width: 90%;
    height: auto;
  }

  ::after {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 10px 15px 0;
    border-color: #ffffff transparent;
    display: block;
    width: 0;
    z-index: 1;
    bottom: -4px;
    left: 15px;
    @media screen and (max-width: 650px) {
      left: 5px;
    }
  }

  ::before {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 8px 12px 0;
    border-color: #FFC317 transparent;
    display: block;
    width: 0;
    z-index: 0;
    bottom: -8px;
    left: 18px;
    @media screen and (max-width: 650px) {
      left: 8px;
    }
  }
`;

const RecommendContainer = styled.div`
  display: flex; 
  flex-wrap: nowrap;
  overflow-x: scroll;
  gap: 0;
`;

const MbtiImage = styled.div`
  width: 80px;
  height: 80px;
  background: no-repeat center/contain url("/assets/blue_ping.svg");
  padding: 0;
  flex-shrink: 0;
  margin-top: 20px;
`;

// 추천 책 리스트
const RecommendItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 10px 0 0;
  justify-content: flex-start;
`;

const RecommendBookImage = styled.svg<{$imageurl: string}>`
  width: 80px;
  height: 100px;
  background: no-repeat center/cover url(${({ $imageurl }) => $imageurl});
  padding: 0;
  margin: 0;
`;

const RecommendBookTitle = styled.p`
  margin: 2px 0 0 0;
  font-size: 12px;
  color: #757575;
  word-wrap: break-word;
  white-space: normal;
  text-align: center;
`;
