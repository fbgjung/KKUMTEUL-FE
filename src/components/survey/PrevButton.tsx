import styled from 'styled-components';

interface PrevButtonProps {
  onClick: () => void;
  progressStep: number;
  totalProgressStep: number;
}

const PrevButton = ({ onClick, progressStep, totalProgressStep }: PrevButtonProps) => {
  return (
    <Container>
      <Button onClick={onClick}>
        <Image />
        <ProgressStep>
          <ProgressStepText>{progressStep}</ProgressStepText> / <TotalProgressStepText>{totalProgressStep}</TotalProgressStepText>
        </ProgressStep>
      </Button>
    </Container>
  );
};

export default PrevButton;



const Container = styled.div`
  display: flex;
  width: 520px;
`;

const Button = styled.button`
  display: flex;
  padding: 0;
  margin: 20px 0 0 0;
  background-color: #fdf8d7;
`;

const Image = styled.svg`
  width: 30px;
  height: 30px;
  background: no-repeat center/contain url("/assets/prev_button.svg");
`;

const ProgressStep = styled.p`
  background-color: #fdf8d7;
  border-radius: 50px;
  padding: 5px;
  margin: 3px 0;
  font-size: 12px;
`;

const ProgressStepText = styled.span`
  font-weight: bold;
  color: #FFC317;
`;

const TotalProgressStepText = styled.span`
  font-weight: bold;
`;