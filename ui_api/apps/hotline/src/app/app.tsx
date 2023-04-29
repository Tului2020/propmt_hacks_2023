import { useState } from 'react';
import { getLocallyAuthed } from './helpers/variables';
import Login from './views/Login';
import Chat from './views/chat';
import './app.css'

const App = () => {
  const [username, setUsername] = useState(getLocallyAuthed() || '');

  return (
    <>
      <div style={{ height: '95vh' }}>
        <Chat
          username={username}
        />
      </div>
      <Login
        username={username}
        setUsername={setUsername}
      />
    </>
  );
}

export default App;
