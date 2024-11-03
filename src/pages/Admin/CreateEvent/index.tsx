import { useState } from 'react';
import { AdminContainer, Button, Input, TextArea } from '../../../styles/globalStyles';
import Header from '../../../components/layout/Header';
import { useNavigate } from 'react-router-dom';
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

    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = async () => {

      const eventData = {
        eventName: eventName,
        eventDescription: eventDescription,
        startDate: `${startDate}T00:00:00`,
        expiredDate: `${endDate}T23:59:59`,
      };

      try {
        const response = await axiosWithToken.post('/kkumteul/api/admin/events', eventData);
        console.log("Event Created Successfully:", response.data);
        alert("Event created successfully!");
        navigate('/event/manage');
      } catch (error) {
        console.error("Error creating event:", error);
        alert("Failed to create event. Please try again.");
      }
    };

    return (
      <AdminContainer color="#f3f3f3">
        <Header
          title="이벤트 등록"
          textcolor="#000000"
          color="#6EA7D0"
          nextBtnImageUrl="/assets/home.svg"
          nextPage="/" fontSize={'auto'}
        />
        <div>
          <FormContainer>
          <h2>이벤트 등록</h2>
            <div>
              <Label>Event Name:</Label>
              <StyledInput
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
                color="#6EA7D0"
                inputcolor="#E6E6E6"/>
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
                inputcolor="#E6E6E6"/>
            </div>
            <StyledButton color="#FFFFFF" backcolor="#6EA7D0" onClick={handleSubmit}>Create Event</StyledButton>
          </FormContainer>
        </div>
      </AdminContainer>
    );
};

export default Index;