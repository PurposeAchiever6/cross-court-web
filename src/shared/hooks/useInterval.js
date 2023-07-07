import { useEffect, useRef } from 'react';

const useInterval = (callback, delay, dependencyArray) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();

    // first run
    tick();

    if (delay) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, ...dependencyArray]);
};

export default useInterval;
