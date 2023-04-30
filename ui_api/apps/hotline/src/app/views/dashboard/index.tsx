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
import UserProfile from './UserProfile';
import { UserInfo } from '../../helpers/variables';

interface Props {
  className?: string;
  userInfo: UserInfo;
  logoutUser: () => void;
}

const Dashboard = (props: Props) => {
  const { className, userInfo, logoutUser } = props;
  const [chatSummaryInfo, setChatSummaryInfo] = useState<ChatSummaryResponse>('');
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessmentResponse>('');
  const [emotionClassification, setEmotionClassification] = useState<EmotionClassificationResponse[]>([]);
  const [interventionCount, setInterventionCount] = useState(0);

  useEffect(() => {
    getDashboardInfo(userInfo.name)
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
      <Navigationbar userInfo={userInfo} logoutUser={logoutUser} />
      <Grid container className={className} spacing={3}>
        <Grid item sm={12} md={6} className='dashboard-left'>
          <Paper className='paper'>
            <UserProfile userInfo={userInfo} />
          </Paper>
          <Paper className='paper'>
            <Intervention interventionCount={interventionCount} />
          </Paper>
          <Paper className='paper'>
            <RiskAssessment riskAssessment={riskAssessment} />
          </Paper>
          <Paper className='paper'>
            <ChatSummary chatSummaryInfo={chatSummaryInfo} />
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className='paper'>
            <EmotionClassification emotionClassification={emotionClassification} />
          </Paper>
        </Grid>
      </Grid >
    </>
  );
};

export default styled(Dashboard)`
  height: 100%;

  .paper {
    background-color: #dadada;
    border-radius: 30px;
  }
  
  .dashboard-left > * {
    margin: 20px 0px;
  }
`;
