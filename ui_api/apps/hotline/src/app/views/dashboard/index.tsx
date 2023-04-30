import styled from '@emotion/styled';
import Navigationbar from '../../navigationbar';
import { Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { getDashboardInfo } from '../../api_calls';
import ChatSummary from './ChatSummary';
import RiskAssessment from './RiskAssessment';
import EmotionClassification from './EmotionClassification';
import { ChatSummaryResponse, EmotionClassificationResponse, RiskAssessmentResponse } from '../../helpers/types';
import Intervention from './Intervention';

interface Props {
  className?: string;
  name: string;
}

const Dashboard = (props: Props) => {
  const { className, name } = props;
  const [chatSummaryInfo, setChatSummaryInfo] = useState<ChatSummaryResponse>('');
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessmentResponse>('');
  const [emotionClassification, setEmotionClassification] = useState<EmotionClassificationResponse[]>([]);
  const [interventionCount, setInterventionCount] = useState(0);

  useEffect(() => {
    getDashboardInfo(name)
      .then(([_cS, _rA, _eC, _iC]) => {
        setChatSummaryInfo(_cS);
        setRiskAssessment(_rA);
        setEmotionClassification(_eC);
        setInterventionCount(_iC);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Navigationbar />
      <Grid container className={className} spacing={3}>
        <Grid item sm={12} md={6}>
          <Paper>
            <EmotionClassification emotionClassification={emotionClassification} />
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper>
            <RiskAssessment riskAssessment={riskAssessment} />
            <Intervention interventionCount={interventionCount} />
          </Paper>
          <Paper >
            <ChatSummary chatSummaryInfo={chatSummaryInfo} />
          </Paper>
        </Grid>
        <Grid item sm={12}>
          <Paper>
          </Paper>
        </Grid >
      </Grid >
    </>
  );
};

export default styled(Dashboard)`
  height: 100%;
`;
