import styled from '@emotion/styled';
import Chart from 'react-apexcharts';

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

  const chartOptions: any = {
    chart: {
      height: 350,
      type: 'radar',
    },
    xaxis: {
      categories: Object.keys(spiderInfo)
    },
    yaxis: {
      tickAmount: 4,
      labels: {
        formatter: (val: any) => val.toFixed(2)
      }
    }
  };

  const chartSeries: any = [
    {
      name: 'Session Metrics',
      data: Object.values(spiderInfo),
    },
  ];


  return (
    <div className={className}>
      <h1>Emotion Classification</h1>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type='radar'
        width={'100%'}
        height={'100%'}
      />
    </div>
  );
};

export default styled(EmotionClassification)`
  // padding: 30px;
`;
