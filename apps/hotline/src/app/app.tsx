import { useState } from 'react';
import { getLocallyAuthed } from './helpers/variables';
import Login from './views/Login';

const App = () => {
  const [username, setUsername] = useState(getLocallyAuthed() || '');

  return (
    <>
      <div>
        Helooo
      </div>
      <Login
        username={username}
        setUsername={setUsername}
      />
    </>
  );
}

export default App;
