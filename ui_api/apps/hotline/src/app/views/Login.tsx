import styled from '@emotion/styled';
import { Button, Dialog, DialogContent, DialogTitle, TextField, Grid } from '@mui/material';
import { useState } from 'react';
import { setLocallyAuthed } from '../helpers/variables';

interface Props {
  className?: string;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

const Login = (props: Props) => {
  const { className, setUsername, username } = props;
  const [_username, _setUsername] = useState('');

  return (
    <Dialog
      className={className}
      open={!username}
    >
      <DialogTitle>
        Please enter your name to continue
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item className='content' >
            <TextField
              onChange={(e) => _setUsername(e.target.value)}
              size='small'
            />
          </Grid>
          <Grid item className='content'>
            <Button
              onClick={() => {
                setUsername(_username);
                setLocallyAuthed(_username);
              }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default styled(Login)`
  .content {
    padding: 5px;
  }

`;
