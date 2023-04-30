import { useState } from 'react';
import { getLocallyAuthed } from './helpers/variables';
import Login from './views/Login';
import Chat from './views/chat';
import './app.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './views/dashboard';
import styled from '@emotion/styled';

interface Props {
  className?: string;
}

const App = ({ className }: Props) => {
  const [userInfo, setUserInfo] = useState(getLocallyAuthed());
  const handleLogout = () => setUserInfo({ name: '', phone: '' });

  return (
    <div className={className}>
      <Routes>
        <Route path='/chat' element={<Chat userInfo={userInfo} logoutUser={handleLogout} />} />
        <Route path='/dashboard' element={<Dashboard userInfo={userInfo} logoutUser={handleLogout} />} />
        <Route path='*' element={<Navigate to='/chat' />} />
      </Routes>
      <Login
        username={userInfo.name}
        setUserInfo={setUserInfo}
      />
    </div>
  );
};

export default styled(App)`
  height: 95vh;
`;
