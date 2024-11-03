import { useEffect, useState } from 'react';
import axiosWithToken from "../../../axiosWithToken.ts";
import { AdminContainer, Button } from '../../../styles/globalStyles';
import Header from '../../../components/layout/Header';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const EventListContainer = styled.div`
  padding: 20px;
`;

const EventItem = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
`;

const EventTitle = styled.h3`
  color: #6EA7D0;
`;

const EventDescription = styled.p`
  color: #333;
`;

const EventDate = styled.p`
  font-size: 14px;
  color: #888;
`;

const StyledButton = styled(Button)`
    margin-top: 20px;
    width: 100%;
`;

type Event = {
  eventId: number;                 // 고유 식별자
  eventName: string;          // 이벤트 이름
  eventDescription: string;   // 이벤트 설명
  startDate: string;          // 이벤트 시작 날짜 (ISO 8601 형식의 문자열)
  expiredDate: string;        // 이벤트 종료 날짜 (ISO 8601 형식의 문자열)
};

const EventList = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosWithToken.get('/kkumteul/api/admin/events');
        setEvents(response.data.response.content);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleDetail = (id:number) => {
    navigate(`/event/update/${id}`)
  };

  const handleCreatePage = () => {
    navigate('/event/create');
  };

  return (
    <AdminContainer color="#f3f3f3">
      <Header
        title="이벤트 목록"
        textcolor="#000000"
        color="#6EA7D0"
        nextBtnImageUrl="/assets/home.svg"
        nextPage="/" fontSize={'auto'}
      />
      <EventListContainer>
        <h2>이벤트 목록</h2>
        {events.length > 0 ? (
          events.map((event, index) => (
            <EventItem key={event.eventId || index} onClick={() => handleDetail(event.eventId)}>
              <EventTitle>{event.eventName}</EventTitle>
              <EventDescription>{event.eventDescription}</EventDescription>
              <EventDate>Start Date: {new Date(event.startDate).toLocaleDateString()}</EventDate>
              <EventDate>End Date: {new Date(event.expiredDate).toLocaleDateString()}</EventDate>
            </EventItem>
          ))
        ) : (
          <p>이벤트가 없습니다.</p>
        )}
        <StyledButton color="#FFFFFF" backcolor="#6EA7D0" onClick={handleCreatePage}>이벤트 생성하기</StyledButton>
      </EventListContainer>
    </AdminContainer>
  );
};

export default EventList;
