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
      RiskAssessment
    </div>
  );
};

export default styled(RiskAssessment)`

`;
