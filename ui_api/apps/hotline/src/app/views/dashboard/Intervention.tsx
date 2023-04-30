import styled from '@emotion/styled';
import { Alert, AlertColor, CircularProgress } from '@mui/material';

interface Props {
  className?: string;
  interventionCount: number;
  loading: boolean;
}

const countToSeverity = (interventionCount: number): AlertColor => {
  if (interventionCount < 1) return 'success';
  if (interventionCount < 2) return 'info';
  if (interventionCount < 3) return 'warning';
  return 'error';
};

const Intervention = (props: Props) => {
  const { interventionCount, loading } = props;

  return (
    <Alert severity={countToSeverity(interventionCount)}>
      {loading ? <CircularProgress /> : `Intervention Level: ${interventionCount}`}
    </Alert>
  );
};

export default styled(Intervention)`

`;
