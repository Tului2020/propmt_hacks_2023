import styled from '@emotion/styled';
import Navigationbar from '../../navigationbar';
import { Grid } from '@mui/material';

interface Props {
  className?: string;
}

const Dashboard = (props: Props) => {
  const { className } = props;

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
