import styled from '@emotion/styled';

interface Props {
  className?: string;
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
