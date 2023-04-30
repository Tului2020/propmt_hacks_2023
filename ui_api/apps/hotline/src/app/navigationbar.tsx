import styled from '@emotion/styled';
import { Avatar, Button, Grid, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AiFillPhone } from 'react-icons/ai';
import { LOCAL_STORE, UserInfo } from './helpers/variables';
import { useState } from 'react';

interface Props {
  className?: string;
  userInfo: UserInfo;
  logoutUser: () => void;
}
const pages = ['chat', 'dashboard'];

const NavigationBar = (props: Props) => {
  const navigate = useNavigate();
  const { className, userInfo, logoutUser } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORE);
    logoutUser();
    handleClose();
  };

  return (
    <Grid container className={className}>
      <div style={{ display: 'flex' }}>
        {pages.map((name) => (
          <Button
            key={name}
            onClick={() => navigate('/' + name)}
            style={{ color: '#F7E1C5' }}
          >
            {name}
          </Button>
        ))}
      </div>
      <div className='top-right'>
        <Button
          variant='contained'
          style={{ borderRadius: 10 }}
          color='warning'
        >
          <AiFillPhone size={25} />
          <span style={{ marginLeft: 3 }}>Reach Counselor</span>
        </Button>
        <div className='avatar' onClick={handleClick}>
          <Avatar alt={userInfo.name}>
            {
              userInfo
                .name
                ?.split(' ')
                .map((name) => name[0]?.toUpperCase())
                .join('') || 'A'
            }
          </Avatar>
        </div>
        <Menu
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={handleClose}
          MenuListProps={{ 'aria-labelledby': 'basic-button' }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </Grid >
  );
};

export default styled(NavigationBar)`
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid;

  div {
    padding: 5px;
  }

  .top-right {
    display: flex;
  }

  .top-right > * {
    margin-right: 15px;
  }

  .avatar: hover {
    cursor: pointer;
  }
`;
