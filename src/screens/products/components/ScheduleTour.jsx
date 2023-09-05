import React from 'react';

import Button from 'shared/components/Button';

const ScheduleTour = () => {
  const scheduleTourLink = import.meta.env.VITE_SCHEDULE_TOUR_LINK;

  return (
    <div className="text-white mt-2 mb-4 md:my-6">
      <div className="bg-cc-blue-700 md:flex md:gap-6 md:justify-center p-4 md:py-8 md:px-10">
        <span className="block font-shapiro95_super_wide text-xl mb-4 md:mb-0">SCHEDULE TOUR</span>
        <span className="block max-w-lg text-sm mb-4 md:mb-0">
          Take a tour of our club and have our team show you around and explain more about
          Crosscourt.
        </span>
        <Button to={scheduleTourLink} isExternal target="_blank">
          Schedule a tour
        </Button>
      </div>
    </div>
  );
};

export default ScheduleTour;
