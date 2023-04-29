import styled from '@emotion/styled';

interface Props {
  className?: string;
}

const Chat = (props: Props) => {
  const { className } = props;

  return (
    <div className={className}>
      Chat
    </div>
  );
};

export default styled(Chat)`

`;
