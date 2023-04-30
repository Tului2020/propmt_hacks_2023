import styled from '@emotion/styled';
import Navigationbar from '../../navigationbar';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { getDashboardInfo } from '../../api_calls';
import ChatSummary from './ChatSummary';
import RiskAssessment from './RiskAssessment';
import EmotionClassification from './EmotionClassification';
import { ChatSummaryResponse, EmotionClassificationResponse, RiskAssessmentResponse } from '../../helpers/types';

interface Props {
  className?: string;
  name: string;
}

const Dashboard = (props: Props) => {
  const { className, name } = props;
  const [chatSummaryInfo, setChatSummaryInfo] = useState<ChatSummaryResponse>('');
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessmentResponse>('');
  const [emotionClassification, setEmotionClassification] = useState<EmotionClassificationResponse[]>([]);

  useEffect(() => {
    getDashboardInfo(name)
      .then(([_cS, _rA, _eC]) => {
        setChatSummaryInfo(_cS);
        setRiskAssessment(_rA);
        setEmotionClassification(_eC);
      })
      .catch(console.error);
  });

  return (
    <>
      <Navigationbar />
      <Grid container className={className}>
        <Grid item sm={6}>
          <ChatSummary chatSummaryInfo={chatSummaryInfo} />
        </Grid>
        <Grid item sm={6}>
          <RiskAssessment riskAssessment={riskAssessment} />
        </Grid>
        <Grid item sm={12}>
          <EmotionClassification emotionClassification={emotionClassification} />
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
