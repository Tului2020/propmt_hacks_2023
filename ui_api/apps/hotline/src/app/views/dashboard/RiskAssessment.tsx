import styled from '@emotion/styled';

interface Props {
  className?: string;
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
