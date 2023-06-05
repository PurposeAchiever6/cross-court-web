import React from 'react';
import PropTypes from 'prop-types';

import SectionLayout from 'shared/components/layout/SectionLayout';
import SessionGuests from 'screens/sessions/components/SessionGuests';
import spaceLinesBgImg from 'shared/images/backgrounds/space-lines.jpeg';

const InviteAFriend = ({ session }) => (
  <SectionLayout
    backgroundImage={spaceLinesBgImg}
    className="bg-no-repeat bg-cover bg-center h-full py-10 lg:py-16 flex justify-center items-center"
  >
    <div className="bg-black text-white max-w-screen-sm mx-auto px-4 py-8 lg:px-10 lg:py-10 lg:transform lg:-translate-y-1/3">
      <h1 className="font-shapiro95_super_wide text-center text-cc-purple uppercase border-b border-cc-purple pb-4 mb-8">
        <span className="block text-xl">Invite A</span>
        <span className="block text-5xl">Friend</span>
      </h1>
      <div className="font-shapiro95_super_wide text-2xl mb-3">
        Use a free guest pass to invite a friend to your session.
      </div>
      <p className="text-sm mb-8">
        They'll receive a text message with a code to show to the Session Experience Manager upon
        arrival.
      </p>
      <SessionGuests session={session} />
    </div>
  </SectionLayout>
);

InviteAFriend.propTypes = {
  session: PropTypes.shape().isRequired,
};

export default InviteAFriend;
