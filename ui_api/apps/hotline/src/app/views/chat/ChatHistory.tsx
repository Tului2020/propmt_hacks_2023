import styled from '@emotion/styled';
import ReactTextTransition from 'react-text-transition';
import { History } from '../../helpers/types';
import { isBot } from '../../helpers/variables';

interface Props {
  className?: string;
  chatHistory: History[];
}

const ChatHistory = (props: Props) => {
  const { className, chatHistory } = props;

  return (
    <div className={className}>
      <section className='inline'>
        {chatHistory.map(({ content, role }, idx) => (
          <ReactTextTransition
            key={idx}
            className='chat-item'
          >
            <h1 style={{ color: isBot(role) ? 'rgb(167, 211, 146)' : 'rgb(245, 245, 245)' }}>
              {content}
            </h1>
          </ReactTextTransition>
        ))}
      </section>
    </div>
  );
};

export default styled(ChatHistory)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Helvetica;

  .inline {
    width: 700px;
    padding: 0px 10px;
  }

  .chat-item {
    margin: 60px 4px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;
