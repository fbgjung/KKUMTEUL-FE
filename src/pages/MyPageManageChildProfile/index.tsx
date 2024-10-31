import { Container, Button } from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import axiosWithToken from '../../axiosWithToken.ts';


interface ChildProfileProps {
  childName:string
  childBirthDate:string
  age:string
  childProfileId:number
  childGender: string; 
  childProfileImage: string;
}

// '2024년 10월 28일' 로 생년월일 포맷팅
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}년 ${month}월 ${day}일`;
};

// 나이 계산
const calculateAge = (birthDate: string): string => {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();
  
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return `${age}세`;
};

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [childProfiles, setChildProfiles] = useState<ChildProfileProps[]>(location.state?.childProfiles || []);

  console.log(childProfiles);

  const handleDeleteChild = async (childProfileId: number) => {
    try {
      await axiosWithToken.delete(`/kkumteul/api/childProfiles/${childProfileId}`);
      setChildProfiles((prevProfiles) => prevProfiles.filter(child => child.childProfileId !== childProfileId));
      alert("삭제가 완료되었습니다.")
    } catch (error) {
      console.error('Failed deleting child profile:', error);
    }
    console.log(childProfileId);
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
      {childProfiles.map((child: ChildProfileProps) => {
        const formattedBirthDate = formatDate(child.childBirthDate);
        const age = calculateAge(child.childBirthDate);
        return (
        <ChildItem key={child.childProfileId}>
          <ChildInfo>
            <ChildImage src={child.childProfileImage} alt="자녀 이미지" />
            <ChildDetails>
              <ChildName>{child.childName}</ChildName>
              <ChildBirth>{formattedBirthDate}</ChildBirth>
              <ChildText>
                <ChildDetailText>{child.childGender}</ChildDetailText>
                <ChildDetailText>{age}</ChildDetailText>
              </ChildText>
            </ChildDetails>
          </ChildInfo>
          <DeleteButton color="rgb(110,167,208,0.8)" backcolor="#f3f3f3" onClick={() => handleDeleteChild(child.childProfileId)}>
            삭제
          </DeleteButton>
          </ChildItem>
        );})}
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
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 10%;
  overflow-y: auto;
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
