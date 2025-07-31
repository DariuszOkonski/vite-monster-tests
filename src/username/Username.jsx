import React, { useState } from 'react';

const Username = () => {
  const [username, setUsername] = useState('');

  return (
    <React.Fragment>
      <div>{username}</div>
      <button onClick={() => setUsername('bar')}>click</button>
      <input type='text' onChange={(e) => setUsername(e.target.value)} />
    </React.Fragment>
  );
};

export default Username;
