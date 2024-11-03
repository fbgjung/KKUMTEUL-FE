import { Container, Button } from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { RouteDef } from "../../routes/RouteDef.tsx";
import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosWithToken from '../../axiosWithToken.ts';


interface UserProps {
  name:string
  profileImageBase64:string
  nickName:string
  phoneNumber:string
  birthDate:string
}

interface ChildProfileProps {
  childName:string
  childBirthDate:string
  age:string
  childProfileId:number
  childGender: string; 
  childProfileImage: string;
}


const Index = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserProps>();
  const [childProfiles, setChildProfiles] = useState<ChildProfileProps[]>([]);

  // 유저 정보 조회
  const fetchUserData = async () => {
    try {
      const response = await axiosWithToken.get(`/kkumteul/api/users`);
      console.log('User data:', response.data.response);
      const userResponse = response.data.response;

      if (userResponse.profileImageBase64) {
        userResponse.profileImageBase64 = `data:image/jpeg;base64,${userResponse.profileImageBase64}`;
      }
      // console.log(typeof(userResponse.profileImageBase64));

      const formattedChildProfiles = userResponse.childProfileList?.map((child: { childProfileImage: string; }) => {
        if (child.childProfileImage) {
          child.childProfileImage = `data:image/jpeg;base64,${child.childProfileImage}`;
        }
        return child;
      }) || [];

      setUserData(response.data.response); // 조회한 유저 정보 세팅
      setChildProfiles(response.data.response.childProfileList || []); // 조회한 유저의 자녀 프로필 정보 세팅
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('사용자 정보 가져오기 실패:', error);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  // 성별 정보 포맷팅
  const formatGender = (gender: string) => {
    switch (gender) {
      case 'MALE':
        return '남아';
      case 'FEMALE':
        return '여아';
      default:
        return '알 수 없음';
    }
  };
  
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    navigate(RouteDef.MyPageEditUserProfile.path, {
      state: { userData } // 유저 정보 수정페이지로 이동할 때 유저 데이터 넘기기
    });
  };

  const handleEditChildrenProfile = () => {
    navigate('/mypage/manageChildProfile', {
      state: { childProfiles }
    });
  };

  const handleViewChildProfile = (child: ChildProfileProps) => {
    navigate(RouteDef.MyPageDetailChildProfile.path.replace(':childId', String(child.childProfileId)), {
      state: { child }
    });
  };

  const handleLogout = async () => {
    try {
      await axiosWithToken.post('/kkumteul/api/auth/logout');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('childProfileId');
      alert("로그아웃 되었습니다.");
      navigate('/login');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      alert('로그아웃에 실패했습니다.');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axiosWithToken.delete(`/kkumteul/api/users`); // TODO: userId dummy
      alert("정말 탈퇴하실 건가요?") // TODO: 모달 고려
      sessionStorage.removeItem('childProfileId');
      sessionStorage.removeItem('accessToken');
      navigate('/')
    } catch (error) {
      console.error('Failed to delete account:', error);
    }
  };

  return (
    <Container color="#fdf8d7">
      <Header textcolor="#000000" color="#fee208" nextBtnImageUrl="/assets/home.svg" title="마이페이지" nextPage="/" />
      <MyPageContainer>
        {userData && (
        <ProfileCard>
          <ProfileContent>
            <ProfileImage src={userData?.profileImageBase64 || "/assets/dog.svg"} alt="Profile" />
            <ProfileInfo>
              <h3>{userData?.name}</h3>
              <p>{userData?.nickName}</p>
            </ProfileInfo>
            <UserEditButton onClick={handleEditProfile}>편집</UserEditButton>
          </ProfileContent>
        </ProfileCard>
        )}

        <ChildProfileCard>
          <ProfileHeader>
            <ProfileTitle>우리집 꿈틀이들</ProfileTitle>
            <ChildEditButton onClick={handleEditChildrenProfile}>편집</ChildEditButton>
          </ProfileHeader>
          <Divider />

          {childProfiles.map((child) => (
            <ChildProfile key={child.childProfileId}>
              <ProfileImage src={child.childProfileImage || "/assets/childprofile.png"} alt={child.childName} />
              <ChildInfo>
                <h4>{child.childName}</h4>
                <p>{child.childBirthDate.split("T")[0]}</p>
                <ChildInfoText>{child.age}</ChildInfoText>
                <ChildInfoText>{formatGender(child.childGender)}</ChildInfoText>
              </ChildInfo>
              <ArrowButton onClick={() => handleViewChildProfile(child)}>{'>'}</ArrowButton>
              </ChildProfile>
          ))}

        </ChildProfileCard>

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
  margin: 40px 0 10px 0;
`;

const ChildProfileCard = styled.div`
  width: 90%;
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  margin: 20px 0 40px 0;
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
  width: 54px;
  height: 54px;
  border-radius: 50%;
  margin-right: 16px;
  border: 3px solid #fee208;
`;

const ChildInfoText = styled.span`
  color: #888888;
  font-size: 12px;
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
  background-color: #e9e9e9;
  border: none;
  border-radius: 18px;
  padding: 7px 12px;
  font-size: 13px;
  position: absolute;
  top: 2px;
  right: 0;
  &:hover {
    background-color: #77a5fe;
    color: #ffffff;
  }
`;

const ChildEditButton = styled.button`
  background-color: #e9e9e9;
  border: none;
  border-radius: 18px;
  padding: 7px 12px;
  font-size: 13px;
  &:hover {
    background-color: #77a5fe;
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
  color: #a6a6a6;
  cursor: pointer;
  text-decoration: underline;
`;

const LogoutButton = styled(Button)`
  width: 90%;
  background-color: #fee208;
`;