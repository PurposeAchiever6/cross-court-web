import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import ROUTES from 'shared/constants/routes';
import { getUserProfile } from 'screens/my-account/reducer';
import { getSessionWaitlist } from 'screens/sessions/reducer';
import { formatSessionTime, longSessionDate } from 'shared/utils/date';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const JoinWaitlistContainer = styled.div`
  .title {
    font-size: 16px;
    line-height: 24px;
    @media (min-width: 992px) {
      font-size: 30px;
      line-height: 33px;
    }
  }

  .subtitle {
    font-size: 47px;
    line-height: 40px;
    padding-left: 5px;
    @media (min-width: 992px) {
      font-size: 89px;
      line-height: 89px;
      padding-left: 8px;
    }
  }

  .black-btn {
    .content {
      border-color: black;
      color: black;
      transition: 500ms background-color ease, 500ms color ease;
      :hover {
        background-color: black;
        color: white;
      }
    }
  }
`;

const JoinWaitlist = () => {
  const history = useHistory();

  const sessionWaitlist = useSelector(getSessionWaitlist);
  const userProfile = useSelector(getUserProfile);

  if (!sessionWaitlist.session) {
    return <Redirect to={ROUTES.LOCATIONS} />;
  }

  const { waitlist } = sessionWaitlist.session;
  const waitlistPlacement = waitlist.map((e) => e.userId).indexOf(userProfile.id);

  return (
    <JoinWaitlistContainer>
      <div className="min-h-screen px-4 py-20 flex flex-col items-center md:justify-center">
        <h1 className="text-cc-black font-shapiro95_super_wide mb-12">
          <span className="title block">YOU'VE BEEN ADDED TO THE</span>
          <span className="subtitle text-transparent text-stroke-width-2 text-stroke-cc-black block">
            WAITLIST
          </span>
        </h1>
        <div className="font-shapiro95_super_wide mb-12">
          <div className="text-xs md:text-base mb-2">PLACEMENT</div>
          <div className="flex items-center font-shapiro95_super_wide">
            <div className="flex bg-cc-purple rounded-full w-14 h-14 md:w-16 md:h-16 items-center justify-center mr-4">
              <p className="text-white text-xl md:text-2xl">{waitlistPlacement + 1}</p>
            </div>
            <p className="font-shapiro95_super_wide text-lg md:text-2xl uppercase">
              {userProfile.firstName} {userProfile.lastName}
            </p>
          </div>
        </div>

        <div className="mb-14 text-sm md:text-xl">
          <p>
            <span className="font-bold">DATE: </span>
            {longSessionDate(sessionWaitlist.session.startTime)}
          </p>
          <p>
            <span className="font-bold">TIME: </span>
            {formatSessionTime(sessionWaitlist.session.time)}
          </p>
          <p>
            <span className="font-bold">WHERE:</span> Crosscourt{' '}
            {sessionWaitlist.session.location.name}
          </p>
        </div>

        <p className="text-center text-xs mb-10 max-w-2xl md:text-base md:mx-40">
          <span className="text-cc-purple font-shapiro96_inclined_wide text-xl mr-2">
            IMPORTANT:
          </span>
          Please do not show up to Crosscourt unless you receive a message saying you have been
          added to the session roster from the waitlist. Our system will automatically add you to
          the session if someone in front of you cancels. Please look out for an SMS message
          confirming your addition to the session. Thank you.
        </p>

        <PrimaryButton
          bg="transparent"
          className="black-btn border-2 border-cc-black"
          onClick={() => history.goBack()}
        >
          DONE
        </PrimaryButton>
      </div>
    </JoinWaitlistContainer>
  );
};

export default JoinWaitlist;
