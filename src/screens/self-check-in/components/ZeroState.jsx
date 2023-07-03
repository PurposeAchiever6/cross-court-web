import React from 'react';
import EnclosedXSvg from 'shared/components/svg/EnclosedXSvg';

const ZeroState = () => (
  <div className="text-center text-white">
    <EnclosedXSvg className="mx-auto text-cc-black mb-2" />
    <h4 className="font-shapiro95_super_wide mb-1 text-2xl">Please book a session to check in.</h4>
    <p className="text-lg">
      If you are more than 2 hours early for your session, you will have to wait to check in.
    </p>
  </div>
);

export default ZeroState;
