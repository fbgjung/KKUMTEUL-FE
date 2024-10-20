import { useState } from 'react';
import { Container, Button } from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [children, setChildren] = useState([
    {
      child_id: 1,
      name: "금정",
      birthdate: "2017년 03월 4일 출생",
      age: "8살",
      gender: '여아',
      image: "/assets/dog1.png"
    },
    {
      child_id: 2,
      name: "금정",
      birthdate: "2024년 03월 4일 출생",
      age: "2살",
      gender: '여아',
      image: "/assets/dog2.png"
    },
    {
      child_id: 3,
      name: "금정",
      birthdate: "2024년 03월 4일 출생",
      age: "2살",
      gender: '여아',
      image: "/assets/dog2.png"
    }
  ]);

  const handleDeleteChild = (child_id: number) => {
    setChildren(children.filter((child) => child.child_id !== child_id));
  };

  const handleAddChild = () => {
    navigate('/mypage/createChildProfile');
  };

  return (
    <Container color="#f3f3f3">
      <Header
        textcolor="#000000"
        color="#f3f3f3"
        nextBtnImageUrl="/assets/home.svg"
        title="우리집 꿈틀이들"
        nextPage='/'
      />
      <ListContainer>
        {children.map((child) => (
          <ChildItem key={child.child_id}>
            <ChildInfo>
              <ChildImage src={child.image} alt="자녀 이미지" />
              <ChildDetails>
                <ChildName>{child.name}</ChildName>
                <ChildBirth>{child.birthdate}</ChildBirth>
                <ChildText>
                  <ChildDetailText>{child.age}</ChildDetailText>
                  <ChildDetailText>{child.gender}</ChildDetailText>
                </ChildText>
              </ChildDetails>
            </ChildInfo>
            <DeleteButton color="rgb(110,167,208,0.8)" backcolor="#f3f3f3" onClick={() => handleDeleteChild(child.child_id)}>
              삭제
            </DeleteButton>
          </ChildItem>
        ))}
        <AddChildLink color="#FFFFFF" onClick={handleAddChild}>
          추가하기
        </AddChildLink>
      </ListContainer>
    </Container>
  );
};

export default Index;

const ListContainer = styled.div`
    width: 90%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 10%;
    overflow-y: auto;
    max-height: calc(100vh - 140px);
`;

const ChildItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 16px;
    background-color: #ffffff;
`;

const ChildInfo = styled.div`
    display: flex;
    align-items: center;
`;

const ChildImage = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-right: 20px;
    object-fit: cover;
    background: #888888;
`;

const ChildDetails = styled.div`
    display: flex;
    flex-direction: column;
`;

const ChildName = styled.span`
    font-weight: bold;
    font-size: 19px;
    margin-bottom: 10px;
`;

const ChildBirth = styled.span`
  font-size: 14px;
  font-weight: bold;  
  color: #555;
`;

const ChildText = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`
const ChildDetailText = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0;
`;

const DeleteButton = styled(Button)`
  width: 50px;
  height: 30px;
  font-size: 13px;
  text-align: center;
  
`;

const AddChildLink = styled.a`
  color: #6EA7D0;
  text-decoration: underline;
  font-size: 18px;
  cursor: pointer;
  display: block;
  text-align: center;
  margin-top: 20px;
`;
