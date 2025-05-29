import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Tags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3004/tags').then((response) => {
      setTags(response.data);
    });
  }, []);

  return (
    <React.Fragment>
      {tags.map((tag) => (
        <div key={tag.id} data-testid='tag'>
          {tag.name}
        </div>
      ))}
    </React.Fragment>
  );
};

export default Tags;
