import styled from '@emotion/styled';
import { CircularProgress, Grid } from '@mui/material';
import ChatBox from './ChatBox';
import ChatHistory from './ChatHistory';
import { useState } from 'react';
import { History, Role } from '../../helpers/types';
import { isBot } from '../../helpers/variables';

interface Props {
  className?: string;
  username: string;
}

const Chat = ({ className, username }: Props) => {
  const [chatHistory, setChatHistory] = useState<History[]>([{ role: 'assistant', content: 'Hi, how can I help you today?', name: 'assistant' }]);
  const [loading, setLoading] = useState(false);

  const addToChatHistory = (role: Role, newMessage: string, name: string) => {
    setLoading(!isBot(role));

    setChatHistory((_chatHistory) => (
      _chatHistory
        .concat({ role, content: newMessage, name })
        .slice(Math.max(chatHistory.length, 0))
    ));
  };

  return (
    <Grid container className={className}>
      <Grid item sm={12}>
        <ChatHistory
          chatHistory={chatHistory}
        />
      </Grid>
      <Grid item sm={12} style={{ height: 30 }} className='loader'>
        {loading && <CircularProgress />}
      </Grid>
      <Grid item sm={12}>
        <ChatBox
          chatHistory={chatHistory}
          addUserInput={(newMessage: string) => addToChatHistory('user', newMessage, username)}
          addAssistantResponse={(newMessage: string) => addToChatHistory('assistant', newMessage, 'assistant')}
          username={username}
        />
      </Grid>
    </Grid>
  );
};

export default styled(Chat)`
  height: 100%;
  display: flex;

  .loader {
    display: flex;
    justify-content: center;
  }
`;