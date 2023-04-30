import styled from '@emotion/styled';
import { RiskAssessmentResponse } from '../../helpers/types';

interface Props {
  className?: string;
  riskAssessment: RiskAssessmentResponse;
}

const RiskAssessment = (props: Props) => {
  const { className, riskAssessment } = props;

  return (
    <div className={className}>
      <h1>Risk Assessment</h1>
      {riskAssessment
        .split('\n')
        .filter((i) => !!i)
        .map((text, idx) => (
          <div key={idx}>
            {text}
          </div>
        ))
      }
    </div>
  );
};

export default styled(RiskAssessment)`
  padding: 30px;
`;
