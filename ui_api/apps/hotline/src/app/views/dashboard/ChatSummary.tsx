import styled from '@emotion/styled';
import { ChatSummaryResponse } from '../../helpers/types';
import { CircularProgress } from '@mui/material';
interface Props {
  className?: string;
  chatSummaryInfo: ChatSummaryResponse;
  loading: boolean;
}

const ChatSummary = (props: Props) => {
  const { className, chatSummaryInfo, loading } = props;

  return (
    <div className={className}>
      <h1>Chat Summary</h1>
      {loading ?
        <CircularProgress /> :
        chatSummaryInfo
          .split('\n')
          .filter((i) => !!i)
          .map((text, idx) => (
            <div key={idx}>
              {text}
            </div>
          ))
      }
    </div>
  );
};

export default styled(ChatSummary)`
  padding: 20px;
`;
