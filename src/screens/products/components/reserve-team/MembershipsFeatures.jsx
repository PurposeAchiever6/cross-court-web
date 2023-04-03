import React from 'react';

const MembershipsFeatures = () => (
  <div>
    <div className="px-4 lg:px-20 mb-28">
      <h2 className="font-shapiro95_super_wide uppercase text-cc-purple text-2xl md:text-5xl mt-6 md:block flex justify-center">
        How it works
      </h2>
      <ol className="text-white list-decimal list-inside p-0 text-sm md:text-lg mt-6 p-4 md:p-0 text-justify">
        <li>We add you to the system as a reserve team member.</li>
        <li>You purchase a reserve team membership by going to the memberships page.</li>
        <li>
          If a session has less than 5 sign ups 10 hours before or less than 10 sign ups 5 hours
          before, you will receive a link to book that session.
        </li>
        <li>You will not be able to book sessions unless it meets this criteria.</li>
        <li>You will have access to open club as well.</li>
        <li>
          If you'd like to upgrade to a traditional membership, reach out to us and we'll update
          your account on our end.
        </li>
        <li>We do not guarantee there will be sessions available for booking.</li>
      </ol>
    </div>
  </div>
);

export default MembershipsFeatures;
