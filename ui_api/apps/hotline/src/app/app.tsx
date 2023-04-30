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
  const [username, setUsername] = useState(getLocallyAuthed().name);

  return (
    <div className={className}>
      <Routes>
        <Route path='/chat' element={<Chat username={username} />} />
        <Route path='/dashboard' element={<Dashboard name={username} />} />
        <Route path='*' element={<Navigate to='/chat' />} />
      </Routes>
      <Login
        username={username}
        setUsername={setUsername}
      />
    </div>
  );
};

export default styled(App)`
  height: 95vh;
`;
