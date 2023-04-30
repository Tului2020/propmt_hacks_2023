import styled from '@emotion/styled';
import { ChatSummaryResponse } from '../../helpers/types';
interface Props {
  className?: string;
  chatSummaryInfo: ChatSummaryResponse;
}

const ChatSummary = (props: Props) => {
  const { className } = props;

  return (
    <div className={className}>
      ChatSummary
    </div>
  );
};

export default styled(ChatSummary)`

`;
