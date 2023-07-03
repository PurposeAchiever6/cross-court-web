import React from 'react';
import SelfCheckInLayout from 'shared/components/layout/SelfCheckInLayout';
import EnclosedXSvg from 'shared/components/svg/EnclosedXSvg';

const SelfCheckInErrorPage = () => (
  <SelfCheckInLayout>
    <div className="mx-4 min-h-screen h-full flex flex-col items-center justify-center text-center">
      <EnclosedXSvg className="text-cc-black mb-2" />
      <h2 className="font-shapiro95_super_wide text-5xl mb-1">Oops.</h2>
      <p className="text-lg">Check-in didn't work.</p>
      <p className="text-lg">Please scan the code again.</p>
    </div>
  </SelfCheckInLayout>
);

export default SelfCheckInErrorPage;
