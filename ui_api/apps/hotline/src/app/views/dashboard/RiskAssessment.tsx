import styled from '@emotion/styled';
import { RiskAssessmentResponse } from '../../helpers/types';
import { useEffect, useState } from 'react';

interface Props {
  className?: string;
  riskAssessment: RiskAssessmentResponse;
}

const RiskAssessment = (props: Props) => {
  const { className, riskAssessment } = props;
  const [level, setLevel] = useState<'red' | 'yellow' | 'none'>('none');

  useEffect(() => {
    if (riskAssessment.includes('<|high|>')) {
      setLevel('red');
    } else if (riskAssessment.includes('<|medium|>')) {
      setLevel('yellow');
    } else {
      setLevel('none');
    }
  }, [riskAssessment]);

  return (
    <div className={className} style={{ border: `3px solid ${level}` }}>
      <h1>Risk Assessment</h1>
      {riskAssessment}
    </div>
  );
};

export default styled(RiskAssessment)`
  padding: 30px;
`;
