import React from 'react';
import SelfCheckInLayout from 'shared/components/layout/SelfCheckInLayout';
import EnclosedCheckSvg from 'shared/components/svg/EnclosedCheckSvg';

const SelfCheckInSuccessPage = () => (
  <SelfCheckInLayout>
    <div className="mx-4 min-h-screen h-full flex flex-col items-center justify-center text-center">
      <EnclosedCheckSvg className="text-cc-black mb-2" />
      <h2 className="font-shapiro95_super_wide text-5xl mb-1">You're in.</h2>
      <p className="text-lg opacity-60">Trust the progress.</p>
    </div>
  </SelfCheckInLayout>
);

export default SelfCheckInSuccessPage;
