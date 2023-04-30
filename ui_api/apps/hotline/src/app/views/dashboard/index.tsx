import styled from '@emotion/styled';
import Navigationbar from '../../navigationbar';
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { getDashboardInfo } from '../../api_calls';

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
        Dashboard
      </Grid>
    </>
  );
};

export default styled(Dashboard)`

`;
