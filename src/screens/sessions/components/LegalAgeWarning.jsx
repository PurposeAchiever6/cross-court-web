import React from 'react';
import WarningTriangle from 'shared/images/warning-triangle.png';

const LegalAgeWarning = () => (
  <div className="flex items-center whitespace-nowrap mt-4 md:mt-2">
    <img className="w-4 h-4" src={WarningTriangle} alt="warning-icon" />
    <p className="text-2xs sm:text-xs mt-1 ml-2">YOU MUST BE 18+</p>
  </div>
);

LegalAgeWarning.propTypes = {};

export default LegalAgeWarning;
