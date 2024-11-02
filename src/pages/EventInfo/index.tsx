import { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import axiosWithToken from '../../axiosWithToken.ts';
import { Container } from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import EventJoinCompleteModal from '../../modal/EventJoinCompleteModal';

const Index = () => {
    const location = useLocation();
    const ticket = location.state.response; // 티켓 정보
    const eventId = location.state.eventId; // 이벤트 아이디 정보

    const [name, setName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleJoinButtonClick = async () => {
        const joinEventRequestDto = {
            eventId: eventId,
            ticket: ticket,
            name: name,
            phoneNumber: phoneNumber
        }
        try {
            const response = await axiosWithToken.post("/kkumteul/api/events/register", joinEventRequestDto, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error("이벤트 참여 요청 실패:", error);
        }
    }

    return (
        <Container>
            <Header
                textcolor="#000000"
                color="#ffebef"
                nextBtnImageUrl="/assets/home.svg"
                title="쿠키 이벤트"
                nextPage='/'
            />
            <EventInfoContainer>
                <Image src='/assets/cookie.png'></Image>
                <Label>이름</Label>
                <InputName 
                    type="text" 
                    placeholder="이름을 입력하세요" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <Label>전화번호</Label>
                <InputPhoneNumber 
                    type="text" 
                    placeholder="ex) 01012345678" 
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                />
                <Text>이름과 전화번호는 중복 참여 확인 용도로만 사용됩니다.</Text>
                <Text>입력 후 이벤트 완료 버튼을 클릭해야 이벤트 참여가 완료됩니다.</Text>
                <Text>10분 이내에 입력을 완료해주세요!</Text>
                <JoinButton onClick={handleJoinButtonClick}>이벤트 참여 완료</JoinButton>
            </EventInfoContainer>
            <EventJoinCompleteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />


        </Container>
        
    );
};

export default Index;

const EventInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ffebef;
    width: 100%;
    height: 100vh;
    padding: 20px;
`;

const Image = styled.img`
    width: 100px;
    height: 100px;
    margin-bottom: 30px;
`

const Label = styled.label`
    font-size: 16px;
    color: #ec8396;
    margin-bottom: 5px;
    display: block;
    width: 80%;
    font-weight: bold;
`;


const InputName = styled.input`
    width: 80%;
    padding: 15px;
    border: 2px solid #ec8396;
    border-radius: 18px;
    font-size: 16px;
    margin-bottom: 10px;

    &:focus {
        outline: none;
        border-color: #d47c8a;
        box-shadow: 0 0 5px rgba(224, 125, 145, 0.5);
    }
`;

const InputPhoneNumber = styled.input`
    width: 80%;
    padding: 15px;
    margin: 0 0 10px 0;
    border: 2px solid #ec8396;
    border-radius: 18px;
    font-size: 16px;

    &:focus {
        outline: none;
        border-color: #d47c8a;
        box-shadow: 0 0 5px rgba(224, 125, 145, 0.5);
    }
`;

const Text = styled.p`
  font-size: 12px;
  color: #767676;
  margin: 0;
  width: 78%;;
`

const JoinButton = styled.button`
    background-color: #ec8396;
    color: #fff;
    font-size: 20px;
    border: none;
    border-radius: 12px;
    padding: 10px 20px;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    font-family: Ownglyph_meetme-Rg, sans-serif, Arial;
    
    &:hover {
        background-color: #d47c8a;
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
    }

    &:focus {
        outline: none;
    }
`;