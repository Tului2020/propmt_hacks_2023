import styled from '@emotion/styled';

interface Props {
  className?: string;
}

const EmotionClassification = (props: Props) => {
  const { className } = props;

  return (
    <div className={className}>
      EmotionClassification
    </div>
  );
};

export default styled(EmotionClassification)`

`;
