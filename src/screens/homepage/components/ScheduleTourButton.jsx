import React, { useState, useEffect } from 'react';
import Button from 'shared/components/Button';

const ScheduleTourButton = () => {
  const scheduleTourLink = import.meta.env.VITE_SCHEDULE_TOUR_LINK;

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const setScroll = () => {
      const startScroll = window.screen.height * 0.75;
      const endScroll =
        document.body.scrollHeight -
        window.innerHeight -
        document.getElementById('page-footer').clientHeight -
        50;

      setShowButton(window.scrollY > startScroll && window.scrollY < endScroll);
    };

    document.addEventListener('scroll', setScroll);

    return () => {
      document.removeEventListener('scroll', setScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-1/2 translate-y- md:right-5 translate-x-1/2 md:translate-x-0 transition-transform ${
        showButton ? 'duration-500' : 'translate-y-20'
      }`}
    >
      <Button to={scheduleTourLink} isExternal target="_blank">
        Schedule a tour
      </Button>
    </div>
  );
};

export default ScheduleTourButton;
