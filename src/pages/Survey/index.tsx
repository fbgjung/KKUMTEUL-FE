import {Container} from '../../styles/globalStyles';
import { useState } from 'react';
import Header from '../../components/layout/Header';
import MbtiFirst from '../../components/survey/MbtiFirst';
import MbtiSecond from '../../components/survey/MbtiSecond.tsx';
import MbtiThird from '../../components/survey/MbtiThird.tsx';
import MbtiForth from '../../components/survey/MbtiForth.tsx';
import MbtiFifth from '../../components/survey/MbtiFifth';
import Interest from '../../components/survey/Interest';
import ProgressLine from '../../components/survey/ProgressLine.tsx';
import PrevButton from '../../components/survey/PrevButton.tsx';

const Index = () => {

  const [step, setStep] = useState<number>(1);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number | number[] }>({});
  const progressPercentage = `${((step - 1) / 5) * 100}%`;

  const handlePrevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleNextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 6));
  }

  const handleUpdateMbtiAnswer = (questionId: number, answer: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleUpdateInterestAnswer = (questionId: number, interests: number[]) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: interests, 
    }));
  };
  
  console.log(selectedAnswers);

  return(
    <Container color="#ffffff">
      <Header textcolor="#000000" color="#f3f3f3" nextBtnImageUrl="/assets/home.svg" title="우리 아이 진단" nextPage='/'/>
      {step > 0 && <PrevButton onClick={handlePrevStep} progressStep={step} totalProgressStep={6}/>}
      <ProgressLine percentage={ progressPercentage } />
      {step === 1 && <MbtiFirst onNextStep={handleNextStep} updateAnswer={handleUpdateMbtiAnswer} selectedAnswers={selectedAnswers}/>}
      {step === 2 && <MbtiSecond onNextStep={handleNextStep} updateAnswer={handleUpdateMbtiAnswer} selectedAnswers={selectedAnswers}/>}
      {step === 3 && <MbtiThird onNextStep={handleNextStep} updateAnswer={handleUpdateMbtiAnswer} selectedAnswers={selectedAnswers}/>}
      {step === 4 && <MbtiForth onNextStep={handleNextStep} updateAnswer={handleUpdateMbtiAnswer} selectedAnswers={selectedAnswers}/>}
      {step === 5 && <MbtiFifth onNextStep={handleNextStep} updateAnswer={handleUpdateMbtiAnswer} selectedAnswers={selectedAnswers}/>}
      {step === 6 && <Interest updateAnswer={handleUpdateInterestAnswer}/>}
    </Container>
  )
}

export default Index;