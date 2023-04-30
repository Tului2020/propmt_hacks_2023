import styled from '@emotion/styled';
import { CircularProgress, Grid } from '@mui/material';
import ChatBox from './ChatBox';
import ChatHistory from './ChatHistory';
import { useEffect, useState } from 'react';
import { History, Role } from '../../helpers/types';
import { UserInfo, isBot } from '../../helpers/variables';
import Navigationbar from '../../navigationbar';

interface Props {
  className?: string;
  userInfo: UserInfo;
  logoutUser: () => void;
}

const Chat = ({ className, userInfo, logoutUser }: Props) => {
  const [chatHistory, setChatHistory] = useState<History[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userInfo.name) {
      if (!chatHistory.length) {
        setChatHistory([{ role: 'assistant', content: `Hi ${userInfo.name.split('_')[0]}, how can I help you today?`, name: 'assistant' }]);
      }
    } else {
      setChatHistory([]);
    }

  }, [userInfo]);

  const addToChatHistory = (role: Role, newMessage: string, name: string) => {
    setLoading(!isBot(role));

    setChatHistory((_chatHistory) => (
      _chatHistory
        .concat({ role, content: newMessage, name })
        .slice(Math.max(chatHistory.length, 0))
    ));
  };

  return (
    <>
      <Navigationbar userInfo={userInfo} logoutUser={logoutUser} />
      <Grid container className={className}>
        <Grid item sm={12} style={{ height: 400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ChatHistory
            chatHistory={chatHistory}
          />
          {loading && <CircularProgress />}
        </Grid>
        <Grid item sm={12} style={{ marginTop: '40px' }}>
          <ChatBox
            chatHistory={chatHistory}
            addUserInput={(newMessage: string) => addToChatHistory('user', newMessage, userInfo.name)}
            addAssistantResponse={(newMessage: string) => addToChatHistory('assistant', newMessage, 'assistant')}
            username={userInfo.name}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default styled(Chat)`
  display: flex;

  .loader {
    display: flex;
    justify-content: center;
  }
`;