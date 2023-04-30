import styled from '@emotion/styled';
import { getLocallyAuthed } from '../../helpers/variables';

interface Props {
  className?: string;
}

const UserProfile = (props: Props) => {
  const { className } = props;
  const userInfo = getLocallyAuthed();

  return (
    <div className={className}>
      <h1>User Profile</h1>
      <span>Name: {userInfo.name}</span>
      <span>Phone: {userInfo.phone}</span>
    </div>
  );
};

export default styled(UserProfile)`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
