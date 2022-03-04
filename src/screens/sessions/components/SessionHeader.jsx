import React from 'react';
import BackButton from 'shared/components/BackButton';

const SessionHeader = ({ children }) => (
  <div className="md:flex py-4 md:py-8 font-shapiro95_super_wide">
    <BackButton className="ml-8 mt-4 md:mt-0" />
    <h2 className="md:ml-8 text-center uppercase font-normal py-8 md:py-0 text-2xl">{children}</h2>
  </div>
);

export default SessionHeader;
