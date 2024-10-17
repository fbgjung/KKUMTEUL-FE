import { Container, Button, Input } from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import styled from 'styled-components';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import React, { useEffect, useState } from 'react';

// 더미 데이터 생성 함수
const generateDummyData = () => {
  return Array.from({ length: 1000 }, (_, index) => ({
    id: index,
    name: `Item ${index + 1}`,
    isWinner: Math.random() < 0.1, // 10% 확률로 당첨 설정
    appliedDate: new Date(
      2024,
      Math.floor(Math.random() * 12), // 랜덤한 월 (0~11)
      Math.floor(Math.random() * 28) + 1 // 랜덤한 일 (1~28)
    ).toISOString(), // ISO 형식으로 변환
  }));
};

/* 가상 스크롤 리스트 -> 리사이클러뷰 같은 거 */
const VirtualizedListWithDummyData = () => {
  const [data, setData] = useState<any[]>([]); // 데이터를 저장할 상태

  // 컴포넌트가 마운트될 때 더미 데이터로 초기화
  useEffect(() => {
    const dummyData = generateDummyData();
    setData(dummyData);
  }, []);

  // 각 아이템을 렌더링하는 Row 컴포넌트
  const Row = ({ index, style }: ListChildComponentProps) => {
    const item = data[index]; // 현재 인덱스의 아이템 가져오기

    return (
      <ItemContainer style={style}>    
        <ResultDivL>
            <Text1>{item.isWinner ? '당첨' : '꽝'}</Text1>
        </ResultDivL>
        <ResultDivR>
            <Text2>{new Date(item.appliedDate).toLocaleDateString()} 응모</Text2>
        </ResultDivR>
      </ItemContainer>
    );
  };

  return (
    <CustomList
      height={600} // 리스트 전체 높이
      itemCount={data.length} // 아이템 개수
      itemSize={80} // 각 아이템의 높이 (픽셀)
      width="100%" // 리스트의 너비
    >
      {Row}
    </CustomList>
  );
};

//#6EA7D0
const Index = () => {
  return (
    <Container color="#f3f3f3">
      <Header
        textcolor="#000000"
        color="#f3f3f3"
        nextBtnImageUrl="/assets/home.svg"
        title="이벤트"
        nextPage="/"
      />
      <MyContainer>
        <Title>최근 응모 결과</Title> <br />

        <ResultDiv>
          <Title>당첨🎉</Title> <br />
          <Text>2024.10.14 응모 당첨</Text>
        </ResultDiv>

        <Title>응모 내역</Title> <br />

        <VirtualizedListWithDummyData />
      </MyContainer>
    </Container>
  );
};

export default Index;

/* 최근 응모 결과 div */
const ResultDiv = styled.div`
  width: 100%;
  background-color: #ffffff;
  margin-top: 10px;
  margin-bottom: 7%;
  padding-left: 6%;
  padding-top: 8%;
  padding-bottom: 8%;
  border-radius: 10px;
`;

/* 타이틀 span */
const Title = styled.span`
  font-size: 20px;
  font-weight: 500;
  margin-left:5px;
`;

/* 일반 크기 글자 */
const Text = styled.span`
    margin-left:5px;
`;

const MyContainer = styled.div`
  width: 80%;
  height: 100vh;
  overflow-x: hidden; /* 가로 스크롤 방지 */

`;

/* 응모 내역 부분 왼쪽 div */
const ResultDivL = styled.div`
  width: 50%; /* 부모 컨테이너의 70% 너비 */
  display: flex;
  align-items: center;
  overflow: hidden; /* 가로 스크롤 방지 */
`

/* 응모 내역 부분 오른쪽 div */
const ResultDivR = styled.div`
  width: 50%; /* 부모 컨테이너의 30% 너비 */
  display: flex;
  align-items: center;
  justify-content: flex-end; /* 텍스트를 오른쪽 정렬 */
  overflow: hidden; /* 가로 스크롤 방지 */
`

/* 아이템 전체를 감싸는 컨테이너 */
const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%; /* 부모 요소 너비를 벗어나지 않도록 */
  box-sizing: border-box; /* 패딩 포함한 너비 계산 */
  padding: 15px;
  margin : 10px 0;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0; /* 회색 구분선 */
  border-radius: 4px;
  transition: background-color 0.3s;
  overflow: hidden; /* 가로 스크롤 방지 */
  border-radius: 10px;

  &:hover {
    background-color: #f9f9f9; /* 호버 시 살짝 회색 배경 */
  }
`

/* 텍스트 스타일 */
const Text1 = styled.span`
  margin-left: 12%;
  font-size: 20px;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden;
  text-overflow: ellipsis; /* 넘칠 때 '...' 표시 */
`;

const Text2 = styled.span`
  font-size: 14px;
  margin-right: 30px;
  text-align: right;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden;
  text-overflow: ellipsis; /* 넘칠 때 '...' 표시 */
`;

/* 스크롤 바 숨기기 */
const CustomList = styled(List)`
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge에서 스크롤바 숨기기 */
  }
  -ms-overflow-style: none; /* IE 및 Edge에서 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
`;
