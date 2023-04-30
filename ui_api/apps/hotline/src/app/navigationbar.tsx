import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

interface Props {
  className?: string;
}
const pages = ['chat', 'dashboard'];

const NavigationBar = (props: Props) => {
  const { className } = props;

  return (
    <Grid container className={className}>
      {pages.map((name) => (
        <div key={name}>
          <Link to={'/' + name}>
            {name}
          </Link>
        </div>
      ))}
    </Grid>
  );
};

export default styled(NavigationBar)`
  width: 100%;
  height: 30px;
  margin-bottom: 15px;

  div {
    padding: 5px;
  }
`;
