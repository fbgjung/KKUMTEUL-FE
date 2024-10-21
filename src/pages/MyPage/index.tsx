import { Container, Button } from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { RouteDef } from "../../routes/RouteDef.tsx";

const Index = () => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate(RouteDef.MyPageEditUserProfile.path);
  };

  const handleEditChildrenProfile = () => {
    navigate('/mypage/manageChildProfile');
  };

  const handleViewChildProfile = (childId: number) => {
    navigate(RouteDef.MyPageDetailChildProfile.path.replace(':childId', String(childId)));
  };

  const handleLogout = () => {
    console.log('로그아웃');
  };

  const handleDeleteAccount = () => {
    navigate('/delete-account');
  };

  return (
    <Container color="#f3f3f3">
      <Header textcolor="#000000" color="#f3f3f3" nextBtnImageUrl="/assets/home.svg" title="마이페이지" nextPage="/" />
      <MyPageContainer>
        <ProfileCard>
          <ProfileContent>
            <ProfileImage src="/assets/sports.png" alt="Profile" />
            <ProfileInfo>
              <h3>류금정</h3>
              <p>금정씨</p>
            </ProfileInfo>
            <UserEditButton onClick={handleEditProfile}>편집</UserEditButton>
          </ProfileContent>
        </ProfileCard>

        <ProfileCard>
          <ProfileHeader>
            <ProfileTitle>우리집 꿈틀이들</ProfileTitle>
            <ChildEditButton onClick={handleEditChildrenProfile}>편집</ChildEditButton>
          </ProfileHeader>
          <Divider />

          {childProfiles.map((child) => (
            <ChildProfile key={child.id}>
              <ProfileImage src={child.profileImage} alt={child.name} />
              <ChildInfo>
                <h4>{child.name}</h4>
                <p>{child.birthDate}</p>
                <ChildInfoText>{child.age}</ChildInfoText>
                <ChildInfoText>{child.gender}</ChildInfoText>
              </ChildInfo>
              <ArrowButton onClick={() => handleViewChildProfile(child.id)}>{'>'}</ArrowButton>
            </ChildProfile>
          ))}

        </ProfileCard>

        <LogoutButton backcolor="#FFC317" color="#FFFFFF" onClick={handleLogout}>로그아웃</LogoutButton>
        <DeleteAccount onClick={handleDeleteAccount}>탈퇴하기</DeleteAccount>

      </MyPageContainer>
    </Container>
  );
};

export default Index;

// 스타일링
const MyPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileCard = styled.div`
  width: 90%;
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  margin: 20px 0 10px 0;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  position: relative;
`;

const ProfileImage = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  margin-right: 16px;
`;

const ChildInfoText = styled.span`
  color: #888888;
  font-size: 12px;
  margin-right: 4px;
`;

const ProfileInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  margin-bottom: 11px;

  h3 {
    margin: 12px;
    font-size: 18px;
  }

  p {
    margin: 0 0 0 12px;
    font-size: 14px;
  }
`;

const UserEditButton = styled.button`
  background-color: #e6e6e6;
  border: none;
  border-radius: 12px;
  padding: 8px 12px;
  font-size: 14px;
  position: absolute;
  top: 2px;
  right: 0;
  &:hover {
    background-color: #6EA7D0;
    color: #ffffff;
  }
`;

const ChildEditButton = styled.button`
  background-color: #e6e6e6;
  border: none;
  border-radius: 12px;
  padding: 8px 12px;
  font-size: 14px;
  &:hover {
    background-color: #6EA7D0;
    color: #ffffff;
  }
`;

const ProfileTitle = styled.h3`
  font-size: 18px;
  margin: 0;
`;

const Divider = styled.div`
  margin-top: 10px;
`;

const ChildProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.03);
`;

const ChildInfo = styled.div`
  flex-grow: 1;
  margin-left: 12px;

  h4 {
    margin: 0;
    font-size: 16px;
  }

  p {
    margin: 4px 0 0 0;
    font-size: 12px;
  }
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
`;

const DeleteAccount = styled.p`
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
  color: #6EA7D0;
  cursor: pointer;
  text-decoration: underline;
`;

const LogoutButton = styled(Button)`
  width: 90%;
  margin-top: 300px;
`;


const childProfiles = [
    {
      id: 1,
      name: "금정",
      birthDate: "2017년 03월 4일",
      age: "8살",
      gender: "여아",
      profileImage: "/assets/sports.png"
    },
    {
      id: 2,
      name: "금정",
      birthDate: "2024년 03월 4일",
      age: "2살",
      gender: "남아",
      profileImage: "/assets/sports.png"
    }
  ];