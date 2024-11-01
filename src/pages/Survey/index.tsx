// /pages/survey/Index.tsx

import { Container } from '../../styles/globalStyles';
import { useState } from 'react';
import Header from '../../components/layout/Header';
import MbtiFirst from '../../components/survey/MbtiFirst';
import MbtiSecond from '../../components/survey/MbtiSecond';
import MbtiThird from '../../components/survey/MbtiThird';
import MbtiForth from '../../components/survey/MbtiForth';
import MbtiFifth from '../../components/survey/MbtiFifth';
import Interest from '../../components/survey/Interest';
import ProgressLine from '../../components/survey/ProgressLine';
import PrevButton from '../../components/survey/PrevButton';
import { useNavigate } from 'react-router-dom';
import axiosWithToken from "../../axiosWithToken.ts";

const Index = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [selectedAnswers, setSelectedAnswers] = useState<{ answers: { id: number; mbtiEffect: string; score: number }[] }>({
    answers: [],
  });
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<number[]>([]);
  const progressPercentage = `${((step - 1) / 6) * 100}%`;

  const handlePrevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));
  const handleNextStep = () => setStep((prevStep) => Math.min(prevStep + 1, 6));

  const handleUpdateMbtiAnswer = (questionId: number, answer: { id: number; mbtiEffect: string; score: number }) => {
    setSelectedAnswers((prev) => {
      const existingAnswerIndex = prev.answers.findIndex(a => a.id === questionId);
      if (existingAnswerIndex > -1) {
        const updatedAnswers = [...prev.answers];
        updatedAnswers[existingAnswerIndex] = answer;
        return { answers: updatedAnswers };
      }
      return { answers: [...prev.answers, answer] };
    });
  };

  const handleUpdateInterestAnswer = (favoriteId: string, interests: number[]) => {
    if (favoriteId === 'favoriteGenres') {
      setSelectedGenres(interests);
    } else if (favoriteId === 'favoriteTopics') {
      setSelectedKeywords(interests);
    }
  };

  const handleSubmit = async () => {
    const childProfileId = parseInt(sessionStorage.getItem('childProfileId') || '0');

    try {
      const surveyData = {
        childProfileId: childProfileId,
        answers: selectedAnswers.answers,
        favoriteGenres: selectedGenres,
        favoriteTopics: selectedKeywords,
      };

      const response = await axiosWithToken.post('/kkumteul/api/survey', surveyData);
      if (response.status === 200) {
        navigate('/survey/result', { state: response.data });
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
    }
  };

  return (
      <Container color="#fdf8d7">
        <Header textcolor="#000000" color="#fee208" nextBtnImageUrl="/assets/home.svg" title="우리 아이 진단" nextPage='/' />
        {step > 1 && <PrevButton onClick={handlePrevStep} progressStep={step} totalProgressStep={6} />}
        <ProgressLine percentage={progressPercentage} />
        {step === 1 && <MbtiFirst onNextStep={handleNextStep} updateAnswer={handleUpdateMbtiAnswer} selectedAnswers={selectedAnswers} />}
        {step === 2 && <MbtiSecond onNextStep={handleNextStep} updateAnswer={handleUpdateMbtiAnswer} selectedAnswers={selectedAnswers} />}
        {step === 3 && <MbtiThird onNextStep={handleNextStep} updateAnswer={handleUpdateMbtiAnswer} selectedAnswers={selectedAnswers} />}
        {step === 4 && <MbtiForth onNextStep={handleNextStep} updateAnswer={handleUpdateMbtiAnswer} selectedAnswers={selectedAnswers} />}
        {step === 5 && <MbtiFifth onNextStep={handleNextStep} updateAnswer={handleUpdateMbtiAnswer} selectedAnswers={selectedAnswers} />}
        {step === 6 && (
            <Interest updateAnswer={handleUpdateInterestAnswer} handleSubmit={handleSubmit} />
        )}
      </Container>
  );
};

export default Index;
