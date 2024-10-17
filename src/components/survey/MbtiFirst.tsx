import styled from "styled-components";
import {Button} from '../../styles/globalStyles';

interface Props {
  onNextStep: () => void;
  updateAnswer: (questionId: number, scoreId: number) => void;
  selectedAnswers: { [key: number]: number | number[] };
}

const MbtiFirst = ({onNextStep, updateAnswer, selectedAnswers}:Props) => {

  const questions = [
    {id:1, question:'활발한 편인가요?', code: 'E'},
    {id:2, question:'해보지 않은 새로운 놀이에 호기심을 보이나요?', code: 'N'},
    {id:3, question:'친구에게 친절하게 대하기 보다 공평하게 대하는 것을 중요하게 여기나요?' , code: 'T'},
    {id:4, question:'물건을 정해진 자리에 두는 편인가요?', code: 'J'},
  ]
  
  const scores = [
    {id: 0, name:'전혀 아니에요', score: 1, color:'#6EA7D0', size: '45px' },
    {id: 1, name:'', score: 2, color:'#6EA7D0', size: '40px' },
    {id: 2, name:'', score: 3, color:'#6EA7D0', size: '30px' },
    {id: 3, name:'', score: 4, color:'#d9d9d9', size: '20px' },
    {id: 4, name:'', score: 5, color:'#FFC317', size: '30px' },
    {id: 5, name:'', score: 6, color:'#FFC317', size: '40px' },
    {id: 6, name:'항상 그래요', score: 7, color:'#FFC317', size: '45px' },
  ]

  const onNextPage = () => {
    onNextStep();
  }

  const handleScoreClick = (questionId: number, scoreId: number) => {
    updateAnswer(questionId, scoreId);
    
  };

  return(
    <Container>
    {questions.map((q) => (
        <Question key={q.id}>
            <QuestionText>{q.question}</QuestionText>
            <ScoreContainer>
                {scores.map((score) => (
                <Score key={score.id} onClick={() => handleScoreClick(q.id, score.id)}>
                        <CircleWrapper>
                        <Circle $size={score.size} $color={score.color} isSelected={selectedAnswers[q.id] === score.id}></Circle>
                        {/* $color={score.color} */}
                        </CircleWrapper>
                        <ScoreText>{score.name}</ScoreText>
                    </Score>
                ))}
            </ScoreContainer>
        </Question>
      ))}
      <NextButton color="#FFFFFF" backcolor='#FFC317' onClick={onNextPage}>다음</NextButton>
    </Container>
  )
}

export default MbtiFirst;


const Container = styled.div`
  margin: 30px 0;
  width: calc(100% - 40px);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`

const Question = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`

const QuestionText = styled.p`
  margin-bottom: 10px;
  font-weight: bold;
`

const ScoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0 10px 0;
  gap: 14px;
`

const Score = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CircleWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const Circle = styled.div<{$color: string; $size: string; isSelected: boolean}>`
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  background-color: ${({ isSelected, $color }) => (isSelected ? $color : '#ffffff')};
  border-radius: 100%;
  border: 2px solid ${({ $color }) => $color};
`;


const ScoreText = styled.p`
  font-size: 10px;
  margin-top: 5px;
`

const NextButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  width: calc(100% - 40px);

`