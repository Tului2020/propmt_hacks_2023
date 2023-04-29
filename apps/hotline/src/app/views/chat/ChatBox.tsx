import styled from '@emotion/styled';
import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import { sendMessage } from '../../api_calls';
import { History } from '../../helpers/types';

interface Props {
  className?: string;
  addToChatHistory: (userInput: string) => void;
  chatHistory: History[];
}

const ChatBox = ({ className, chatHistory, addToChatHistory }: Props) => {
  const [userInput, setUserInput] = useState('');

  const handleNewUserInput = () => {
    sendMessage(userInput);
    addToChatHistory(userInput);
    setUserInput('');
  }

  return (
    <Grid container className={className}>
      <Grid item className='chat-child'>
        <textarea
          className='diary-entry'
          rows={5}
          cols={40}
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.shiftKey) {
              e.preventDefault();
              handleNewUserInput()
            }
          }}
        />
      </Grid>
      <Grid item className='chat-child'>
        <Button
          onClick={handleNewUserInput}
        >
          Send
        </Button>
      </Grid>
    </Grid>
  );
};

export default styled(ChatBox)`
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

