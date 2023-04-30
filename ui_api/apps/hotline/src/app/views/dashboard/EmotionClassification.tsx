import styled from '@emotion/styled';
import { EmotionClassificationResponse } from '../../helpers/types';

interface Props {
  className?: string;
  emotionClassification: EmotionClassificationResponse[];
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
