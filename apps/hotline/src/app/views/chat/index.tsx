import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import ChatBox from './ChatBox';
import ChatHistory from './ChatHistory';
import { useState } from 'react';
import { History } from '../../helpers/types';
import { getLocallyAuthed } from '../../helpers/variables';

interface Props {
  className?: string;
}

const Chat = ({ className }: Props) => {
  const [chatHistory, setChatHistory] = useState<History[]>([{ role: 'assistant', content: 'Hi, how can I help you today?' }]);

  const addToChatHistory = (role: string, newMessage: string) => {
    setChatHistory((_chatHistory) => (
      _chatHistory
        .concat({ role, content: newMessage })
        .slice(Math.max(chatHistory.length, 0))
    ))
  }

  return (
    <Grid container className={className}>
      <Grid item sm={12}>
        <ChatHistory
          chatHistory={chatHistory}
        />
      </Grid>
      <Grid item sm={12}>
        <ChatBox
          chatHistory={chatHistory}
          addToChatHistory={(newMessage: string) => addToChatHistory(getLocallyAuthed(), newMessage)}
        />
      </Grid>
    </Grid>
  );
}

export default styled(Chat)`
  height: 100%;
  display: flex;
`;