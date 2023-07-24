import { useEffect } from 'react';

const useOnClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const el = ref?.current;

      if (!el || el.contains(event.target)) {
        return;
      }

      callback();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

export default useOnClickOutside;
