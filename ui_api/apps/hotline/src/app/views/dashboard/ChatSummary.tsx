import styled from '@emotion/styled';
import { ChatSummaryResponse } from '../../helpers/types';
interface Props {
  className?: string;
  chatSummaryInfo: ChatSummaryResponse;
}

const ChatSummary = (props: Props) => {
  const { className, chatSummaryInfo } = props;

  return (
    <div className={className}>
      <h1>Chat Summary</h1>
      {chatSummaryInfo
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
  padding: 30px;
`;
