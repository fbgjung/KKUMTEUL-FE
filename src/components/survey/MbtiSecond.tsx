import styled from "styled-components";
import {Button} from '../../styles/globalStyles';

interface Props {
  onNextStep: () => void;
}

const MbtiSecond = ({onNextStep}:Props) => {

  const questions = [
    {id:0, question:'사람들에게 주목 받는 것을 좋아하나요?', code: 'E', num: 5},
    {id:1, question:'익숙한 놀이를 좋아하나요?', code: 'S', num: 6},
    {id:2, question:'협동하는 것보다는 승리하는 것을 더 중요하게 여기나요?', code: 'T', num: 7},
    {id:3, question:'어떤 일을 할 때 마지막 순간 한꺼번에 처리하는 것을 좋아하나요?', code: 'P', num: 8},
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

  return(
    <Container>
    {questions.map((q) => (
        <Question key={q.id}>
            <QuestionText>{q.question}</QuestionText>
            <ScoreContainer>
                {scores.map((score) => (
                    <Score key={score.id}>
                        <CircleWrapper>
                          <Circle $size={score.size} $color={score.color}></Circle>
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

export default MbtiSecond;


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

const Circle = styled.div<{$color:string, $size:string}>`
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  background-color: #ffffff;
  border-radius: 100%;
  border: 2px solid ${({ $color }) => $color};
`

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