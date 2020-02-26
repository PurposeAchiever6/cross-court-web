import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToPosition = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash !== '') {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const topPosition = element.offsetTop;
          const offset = 100;
          window.scroll(0, topPosition - offset);
        }
      }, 0);
    } else {
      window.scroll(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToPosition;
