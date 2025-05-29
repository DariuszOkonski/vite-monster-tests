import React, { useState } from 'react';

const Username = () => {
  const [username, setUsername] = useState('');

  return (
    <React.Fragment>
      <div data-testid='username'>{username}</div>
      <button onClick={() => setUsername('bar')} data-testid='button'>
        click
      </button>
      <input
        type='text'
        onChange={(e) => setUsername(e.target.value)}
        data-testid='usernameInput'
      />
    </React.Fragment>
  );
};

export default Username;
