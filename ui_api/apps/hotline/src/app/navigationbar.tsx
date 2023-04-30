import styled from '@emotion/styled';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AiFillPhone } from 'react-icons/ai';

interface Props {
  className?: string;
}
const pages = ['chat', 'dashboard'];

const NavigationBar = (props: Props) => {
  const navigate = useNavigate();
  const { className } = props;

  return (
    <Grid container className={className}>
      <div style={{ display: 'flex' }}>
        {pages.map((name) => (
          <Button
            key={name}
            onClick={() => navigate('/' + name)}
            style={{ color: '#F7E1C5' }}
          >
            {name}
          </Button>
        ))}
      </div>
      <div>
        <Button
          variant='contained'
          style={{ borderRadius: 10 }}
          color='warning'
        >
          <AiFillPhone size={25} />
          <span style={{ marginLeft: 3 }}>Reach Counselor</span>
        </Button>
      </div>
    </Grid>
  );
};

export default styled(NavigationBar)`
  width: 100%;
  height: 50px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid;

  div {
    padding: 5px;
  }
`;
