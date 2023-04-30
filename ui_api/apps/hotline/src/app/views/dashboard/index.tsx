import styled from '@emotion/styled';
import Navigationbar from '../../navigationbar';
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { getDashboardInfo } from '../../api_calls';
import ChatSummary from './ChatSummary';
import RiskAssessment from './RiskAssessment';
import EmotionClassification from './EmotionClassification';

interface Props {
  className?: string;
  name: string;
}

const Dashboard = (props: Props) => {
  const { className, name } = props;

  useEffect(() => {
    getDashboardInfo(name)
      .then(console.log)
      .catch(console.error);
  });

  return (
    <>
      <Navigationbar />
      <Grid container className={className}>
        <Grid item sm={6}>
          <ChatSummary />
        </Grid>
        <Grid item sm={6}>
          <RiskAssessment />
        </Grid>
        <Grid item sm={12}>
          <EmotionClassification />
        </Grid >
      </Grid >
    </>
  );
};

export default styled(Dashboard)`
  height: 100%;
  border: 1px solid red;

  div {
    border: 1px solid blue;
  }
`;
