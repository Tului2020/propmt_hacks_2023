import styled from '@emotion/styled';
import { UserInfo } from '../../helpers/variables';

interface Props {
  className?: string;
  userInfo: UserInfo;
}

const UserProfile = (props: Props) => {
  const { className, userInfo } = props;

  return (
    <div className={className}>
      <h1>User Profile</h1>
      <span>Name: {userInfo.name.replace(/_+/g, ' ')}</span>
      <span>Phone: {userInfo.phone}</span>
    </div>
  );
};

export default styled(UserProfile)`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
