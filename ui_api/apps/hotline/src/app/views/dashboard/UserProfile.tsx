import styled from '@emotion/styled';

interface Props {
  className?: string;
}

const UserProfile = (props: Props) => {
  const { className } = props;

  return (
    <div className={className}>
      <h1>User Profile</h1>
    </div>
  );
};

export default styled(UserProfile)`
  padding: 20px;
`;
