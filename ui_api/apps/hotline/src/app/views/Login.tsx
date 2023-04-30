import styled from '@emotion/styled';
import { Button, Dialog, DialogContent, DialogTitle, TextField, Grid } from '@mui/material';
import { useState } from 'react';
import { UserInfo, setLocallyAuthed } from '../helpers/variables';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

interface Props {
  className?: string;
  username: string;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const Login = (props: Props) => {
  const { className, setUserInfo, username } = props;
  const [_username, _setUsername] = useState('');
  const [_phone, _setPhone] = useState<any>('');
  const loginButtonDisabled = !_username;

  const handleLogin = () => {
    if (!loginButtonDisabled) {
      setUserInfo({ name: _username.replace(/ /g, '_'), phone: _phone });
      setLocallyAuthed(_username.replace(/ /g, '_'), _phone);
    }
  };

  return (
    <Dialog
      className={className}
      open={!username}
    >
      <DialogTitle>
        Please enter your name to continue
      </DialogTitle>
      <DialogContent
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleLogin();
        }}
      >
        <Grid container>
          <Grid item className='content'>
            <TextField
              onChange={(e) => _setUsername(e.target.value)}
              size='small'
              label='Name'
              style={{ marginBottom: '10px' }}
            />
            <PhoneInput
              placeholder='Enter phone number'
              value={_phone}
              onChange={_setPhone}
              international={false}
              defaultCountry='US'
            />
          </Grid>
          <Grid item className='content'>
            <Button
              onClick={handleLogin}
              disabled={loginButtonDisabled}
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
