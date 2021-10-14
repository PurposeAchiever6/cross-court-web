import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <p className="font-dharma_gothic_cheavy_italic text-white text-10xl">
        {dateState.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}
      </p>
    </div>
  );
};

export default Clock;
