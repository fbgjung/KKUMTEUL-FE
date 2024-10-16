import {Container, Button} from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const Index = () => {
    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    const handleEditChildrenProfile = () => {
        navigate('/edit-children-profile');
    };

    const handleViewChildProfile = (childId: number) => {
        navigate(`/child-profile/${childId}`);
    };

    const handleLogout = () => {
        console.log('로그아웃');
    };

    const handleDeleteAccount = () => {
        navigate('/delete-account');
    };

    return (
        <Container color="#f3f3f3">
            <Header textcolor="#000000" color="#f3f3f3" nextBtnImageUrl="/assets/home.svg" title="마이페이지" nextPage="/"/>

            <ProfileCard>
                <ProfileContent>
                    <ProfileImage src="/assets/userProfileImg.svg" alt="Profile"/>
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
                <ChildProfile>
                    <ProfileImage src="/assets/childProfileImg1.svg" alt="Child1"/>
                    <ChildInfo>
                        <h4>금정</h4>
                        <p>2017년 03월 4일</p>
                        <AgeFont>8살</AgeFont>
                    </ChildInfo>
                    <ArrowButton onClick={() => handleViewChildProfile(1)}>{'>'}</ArrowButton>
                </ChildProfile>

                <ChildProfile>
                    <ProfileImage src="/assets/childProfileImg2.svg" alt="Child2"/>
                    <ChildInfo>
                        <h4>금정</h4>
                        <p>2024년 03월 4일</p>
                        <AgeFont>2살</AgeFont>
                    </ChildInfo>
                    <ArrowButton onClick={() => handleViewChildProfile(2)}>{'>'}</ArrowButton>
                </ChildProfile>
            </ProfileCard>

            <Button backcolor="#FFD700" color="#FFFFFF" onClick={handleLogout}>로그아웃</Button>
            <DeleteAccount onClick={handleDeleteAccount}>탈퇴하기</DeleteAccount>
        </Container>
    );
};

export default Index;

// 스타일링
const ProfileCard = styled.div`
    width: 600px;
    background-color: white;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 20px;
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
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 16px;
`;

const AgeFont = styled.p`
    color: #888888;
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
`;

const ChildEditButton = styled.button`
    background-color: #e6e6e6;
    border: none;
    border-radius: 12px;
    padding: 8px 12px;
    font-size: 14px;
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
    padding: 12px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
    color: #007bff;
    cursor: pointer;
    text-decoration: underline;
`;