import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ProgressLineProps {
    percentage: string;
    isReverse: boolean;
}

const ProgressLine = ({ percentage, isReverse }: ProgressLineProps) => {
    const [width, setWidth] = useState<string>(percentage + "%");

    useEffect(() => {
        setWidth(percentage + "%");
    }, [percentage]);

    return (
        <Container>
            <ProgressVisualFull style={{ backgroundColor: isReverse ? "#fee208" : "#ffffff" }}>
                <ProgressVisualPart
                    style={{ width, backgroundColor: isReverse ? "#ffffff" : "#fee208" }}
                />
            </ProgressVisualFull>
        </Container>
    );
};

export default ProgressLine;

const Container = styled.div`
  width: 100%;
  height: 12px;
  display: flex;
  align-items: center;
`;

const ProgressVisualFull = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  overflow: hidden;
`;

const ProgressVisualPart = styled.div`
  height: 100%;
  border-radius: 6px 0 0 6px;
  transition: width 0.3s ease;
`;
