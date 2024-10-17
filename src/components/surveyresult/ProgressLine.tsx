import { useState } from 'react';
import styled from 'styled-components';

interface ProgressLineProps {
  percentage: string;
  isReverse: boolean;
}

const ProgressLine = ({ percentage, isReverse }: ProgressLineProps) => {
  const [width, setWidth] = useState<string>(percentage);

  return (
    <Container>
      <ProgressVisualFull style={{ backgroundColor: isReverse ? "#6EA7D0" : "#E8E8E8" }}>
      <ProgressVisualPart
            style={{ width, backgroundColor: isReverse ? "#E8E8E8" : "#6EA7D0" }}
          />
      </ProgressVisualFull>
    </Container>
  );
};

export default ProgressLine;


const Container = styled.div`
  margin: 20px 0 20px 0;
  border-radius: 6px;
  width: 380px;
`;

const ProgressVisualFull = styled.div`
  display: flex;
  height: 16px;
  width: 100%;
  border-radius: 100px;
  overflow: hidden;
`;

const ProgressVisualPart = styled.div`
  transition: width 2s;
`;