import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface ProgressLineProps {
  percentage: string;
}

const ProgressLine = ({ percentage = "0%" }: ProgressLineProps) => {
  const [width, setWidth] = useState<string>(percentage);

  useEffect(() => {
    requestAnimationFrame(() => {
      setWidth(percentage);
    });
  }, [percentage]);

  return (
    <Container>
      <ProgressVisualFull style={{ backgroundColor: "#E8E8E8" }}>
          <ProgressVisualPart
            style={{ width, backgroundColor: "#FFC317" }}
          />
      </ProgressVisualFull>
    </Container>
  );
};

export default ProgressLine;


const Container = styled.div`
  margin: 20px 0 20px 0;
  border-radius: 6px;
  width: 500px;
`;

const ProgressVisualFull = styled.div`
  display: flex;
  height: 6px;
  width: 100%;
  border-radius: 100px;
`;

const ProgressVisualPart = styled.div`
  transition: width 2s;
  border-radius: 100px;
`;