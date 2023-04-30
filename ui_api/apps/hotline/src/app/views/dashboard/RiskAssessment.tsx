import styled from '@emotion/styled';
import { RiskAssessmentResponse } from '../../helpers/types';

interface Props {
  className?: string;
  riskAssessment: RiskAssessmentResponse;
}

const RiskAssessment = (props: Props) => {
  const { className } = props;

  return (
    <div className={className}>
      <h1>RiskAssessment</h1>
    </div>
  );
};

export default styled(RiskAssessment)`
  padding: 30px;
`;
