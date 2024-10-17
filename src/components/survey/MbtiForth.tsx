import styled from "styled-components";
import {Button} from '../../styles/globalStyles';

interface Props {
  onNextStep: () => void;
  updateAnswer: (questionId: number, scoreId: number) => void;
  selectedAnswers: { [key: number]: number | number[] };
}

const MbtiForth = ({onNextStep, updateAnswer, selectedAnswers}:Props) => {

  const questions = [
    {id:13, question:'반장 같은 나서는 역할을 하고 싶어하나요?', code: 'E'},
    {id:14, question:'호기심 때문에 행동하는 경우가 많나요?', code: 'N'},
    {id:15, question:'친구가 울면 달래주기 보다는 왜 우는지 물어보는 편인가요?', code: 'T'},
    {id:16, question:'계획을 바꾸는 것을 싫어하나요?', code: 'J'},
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

export default MbtiForth;


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