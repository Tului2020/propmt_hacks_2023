import styled from '@emotion/styled';
import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import { sendMessage } from '../api_calls';

interface Props {
  className?: string;
}

const Chat = ({ className }: Props) => {
  const [userInput, setUserInput] = useState('');

  return (
    <Grid container className={className}>
      <Grid item className='chat-child'>
        <textarea
          className='diary-entry'
          rows={5}
          cols={40}
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
        />
      </Grid>
      <Grid item className='chat-child'>
        <Button
          onClick={() => sendMessage(userInput)}
        >
          Send
        </Button>
      </Grid>
    </Grid>
  );
};

export default styled(Chat)`
  border: 1px solid red;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .chat-child {
    padding: 5px;
  }
`;
