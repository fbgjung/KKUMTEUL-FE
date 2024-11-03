import { useState, useEffect } from 'react';
import { AdminContainer, Button, Input, TextArea } from '../../../styles/globalStyles';
import Header from '../../../components/layout/Header';
import { useNavigate, useParams } from 'react-router-dom';
import axiosWithToken from "../../../axiosWithToken.ts";
import styled from 'styled-components';

const Label = styled.label`
    color: #6EA7D0;
    font-weight: bold;
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledInput = styled(Input)`
    width: 100%;
    padding-left: 15px;
    margin-top: 5px;
`;

const StyledTextArea = styled(TextArea)`
    width: 100%;
    margin-top: 5px;
`;

const StyledButton = styled(Button)`
    margin-top: 20px;
    width: 100%;
`;

const Index = () => {
  const navigate = useNavigate();
  const { event_id } = useParams(); // URL에서 id 가져오기

  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // 페이지가 로딩될 때 이벤트 데이터 불러오기
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axiosWithToken.get(`/kkumteul/api/admin/events/${event_id}`);
        const { eventName, eventDescription, startDate, expiredDate } = response.data.response;

        setEventName(eventName);
        setEventDescription(eventDescription);
        setStartDate(startDate.split('T')[0]); // 날짜만 추출
        setEndDate(expiredDate.split('T')[0]);  // 날짜만 추출
      } catch (error) {
        console.error("Error fetching event data:", error);
        alert("Failed to load event data.");
      }
    };

    fetchEventData();
  }, [event_id]);

  const handleUpdate = async () => {
    const eventData = {
      eventName: eventName,
      eventDescription: eventDescription,
      startDate: `${startDate}T00:00:00`,
      expiredDate: `${endDate}T23:59:59`,
    };

    try {
      const response = await axiosWithToken.put(`/kkumteul/api/admin/events/${event_id}`, eventData);
      console.log("Event Updated Successfully:", response.data);
      alert("Event updated successfully!");
      navigate('/event/manage');
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axiosWithToken.delete(`/kkumteul/api/admin/events/${event_id}`);
      console.log("Event Deleted Successfully:", response.data);
      alert("Event deleted successfully!");
      navigate('/event/manage');
    } catch (error) {
      console.error("Error delete event:", error);
      alert("Failed to delete event. Please try again.");
    }
  };

  return (
    <AdminContainer color="#f3f3f3">
      <Header
        title="이벤트 수정 / 삭제"
        textcolor="#000000"
        color="#6EA7D0"
        nextBtnImageUrl="/assets/home.svg"
        nextPage="/" fontSize={'auto'}
      />
      <div>
        <FormContainer>
          <h2>이벤트 수정</h2>
          <div>
            <Label>Event Name:</Label>
            <StyledInput
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
              color="#6EA7D0"
              inputcolor="#E6E6E6"
            />
          </div>
          <div>
            <Label>Description:</Label>
            <StyledTextArea
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              required
              color="#6EA7D0"
              inputcolor="#E6E6E6"
            />
          </div>
          <div>
            <Label>Start Date:</Label>
            <StyledInput
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              color="#6EA7D0"
              inputcolor="#E6E6E6"
            />
          </div>
          <div>
            <Label>End Date:</Label>
            <StyledInput
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              color="#6EA7D0"
              inputcolor="#E6E6E6"
            />
          </div>
          <StyledButton color="#FFFFFF" backcolor="#6EA7D0" onClick={handleUpdate}>Update Event</StyledButton>
          <StyledButton color="#FFFFFF" backcolor="#6EA7D0" onClick={handleDelete}>Delete Event</StyledButton>
        </FormContainer>
      </div>
    </AdminContainer>
  );
};

export default Index;
