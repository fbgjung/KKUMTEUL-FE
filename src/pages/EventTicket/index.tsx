import { useEffect, useState } from "react";
import styled , {keyframes} from "styled-components";
import axiosWithToken from "../../axiosWithToken.ts";
import { useNavigate, useLocation } from "react-router-dom";
import { Container } from '../../styles/globalStyles';
import Header from '../../components/layout/Header';
import EventModal from '../../modal/EventModal';

const Index = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const eventData = location.state;
    const eventId = eventData.eventId;

    const [timeLeft, setTimeLeft] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
  
    useEffect(() => {
        const eventTime = new Date();
        eventTime.setHours(22, 0, 0, 0); // 오후 9시로 설정 (확인용) 오후 1시로 설정해야함
        const timer = setInterval(() => {
            const now = new Date();
            const diff = eventTime - now;
            if (diff <= 0) {
                setTimeLeft("이벤트 시작!");
                clearInterval(timer);
                return;
            }
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            setTimeLeft(`${minutes}분 ${seconds}초 남았어요`);
        }, 1000);
      
        return () => clearInterval(timer);
    }, []);

    const handleJoinEvent = async () => {
        try {
            const response = await axiosWithToken.post(`/kkumteul/api/events`);
            const message = response.data.response;

            if (message === "이미 이벤트에 참여한 유저입니다!!"){
                setModalMessage("이미 참여한 이벤트에요. 내일 또 만나요~")
                setIsModalOpen(true);
                return;
            } else if (message === "이벤트가 아직 시작되지 않았습니다!") {
                setModalMessage("조금만 기다려주세요!")
                setIsModalOpen(true);
                return;
            } else if (message === "남은 티켓이 없습니다!") {
                setModalMessage("이벤트 참여가 완료되었습니다! 내일 결과를 확인해주세요")
                setIsModalOpen(true);
            } else {
                setModalMessage("이벤트 참여 성공!")
                setIsModalOpen(true);
                navigate('/eventInfo', { state: { 
                    eventId,
                    response: response.data.response 
                }  });
            }

            
        } catch (error) {
            console.error("이벤트 참여 실패:", error);
            alert("이벤트 참여에 실패했습니다.");
        }
    };

    return (
        <Container color="#ffebef">
            <Header
                textcolor="#000000"
                color="#ffebef"
                nextBtnImageUrl="/assets/home.svg"
                title="쿠키 이벤트"
                nextPage='/'
            />
            <EventTicketContainer>
                <Countdown>{timeLeft}</Countdown>
                <TicketContainer>
                    <Image src="/assets/donut.png" alt="Event Image" />
                    <EventTitle>꿈틀이의 성향을 응모하고 쿠키를 획득하세요!</EventTitle>
                    <EventText>응모 결과는 다음날 오후 1시에 확인해 주세요.</EventText>
                    <TicketButton onClick={handleJoinEvent}>
                        응모할래요!
                    </TicketButton>
                </TicketContainer>
            </EventTicketContainer>
            <EventModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                message={modalMessage}
            />
        </Container>
    );
};

export default Index;

const EventTicketContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ffebef;
    width: 100%;
    height: 100vh;
`;

const Countdown = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: #ec8396;
    margin-bottom: 80px;
    font-family: RecipekoreaFont, sans-serif, Arial;
`;

const TicketContainer = styled.div`
    background-color: #ffebef;
    border: 3px dashed #ec8396;
    border-radius: 15px;
    padding: 50px;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    position: relative;
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const Image = styled.img`
    width: 100px;
    height: auto;
    position: absolute;
    top: -50px;
    left: 40%;
    transform: translateX(-50%);
    border-radius: 50%;
    animation: ${bounce} 1s infinite;
`;

const EventTitle = styled.h2`
    margin: 10px 0;
    font-family: Ownglyph_meetme-Rg, sans-serif, Arial;
`;

const EventText = styled.p`
    font-size: 12px;
    margin: 0;
    color: #808080;
`;

const TicketButton = styled.button`
    background-color: #ec8396;
    color: #fff;
    font-size: 28px;
    border: none;
    border-radius: 12px;
    padding: 10px 20px;
    cursor: pointer;
    margin-top: 20px;
    transition: transform 0.3s ease;
    font-family: Ownglyph_meetme-Rg, sans-serif, Arial;
    
    &:hover {
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.9);
    }

    &:focus {
        outline: none;
    }
`;
