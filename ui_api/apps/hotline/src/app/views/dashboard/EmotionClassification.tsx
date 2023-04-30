import styled from '@emotion/styled';
// import { EmotionClassificationResponse } from '../../helpers/types';

interface Props {
  className?: string;
  emotionClassification: any;
}

const EmotionClassification = (props: Props) => {
  const { className, emotionClassification } = props;
  const nData = emotionClassification.length;

  const spiderInfo = emotionClassification
    .map((_eC: any) => _eC.reduce((acc: any, { label, score }: any) => ({ ...acc, [label]: score }), {}))
    .reduce((acc: any, iter: any) => {
      if (!acc.anger) {
        Object.keys(iter)
          .forEach((key) => acc[key] = 0 + iter[key] / nData);
      } else {
        Object.keys(iter)
          .forEach((key) => acc[key] = acc[key] + iter[key] / nData);
      }

      return { ...acc };
    }, {});


  return (
    <div className={className}>
      <h1>Emotion Classification</h1>
    </div>
  );
};

export default styled(EmotionClassification)`
  padding: 30px;
`;
