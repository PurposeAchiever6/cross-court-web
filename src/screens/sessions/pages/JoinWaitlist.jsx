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
      font-size: 40px;
      line-height: 33px;
    }
  }

  .subtitle {
    font-size: 47px;
    line-height: 40px;
    @media (min-width: 992px) {
      font-size: 120px;
      line-height: 110px;
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

  const waitlist = sessionWaitlist.session.waitlist.filter((e) => !e.reached);
  const waitlistPlacement = waitlist.map((e) => e.userId).indexOf(userProfile.id);

  return (
    <JoinWaitlistContainer>
      <div className="min-h-screen px-4 py-20 flex flex-col items-center justify-center">
        <p className="title text-cc-black font-shapiro95_super_wide">YOU'VE BEEN ADDED TO THE</p>
        <p className="subtitle text-transparent text-stroke-width-2 text-stroke-cc-black font-shapiro95_super_wide mb-10 md:mb-16">
          WAITLIST
        </p>
        <div className="flex items-center font-shapiro95_super_wide mb-10 md:mb-16">
          <div className="flex flex-col items-center justify-center">
            <p className="text-xs md:text-base mb-2">PLACEMENT</p>
            <div className="flex bg-cc-purple rounded-full w-14 h-14 md:w-20 md:h-20 items-center justify-center">
              <p className="text-white text-xl md:text-3xl">{waitlistPlacement + 1}</p>
            </div>
          </div>
          <p className="title uppercase mt-7">
            {userProfile.firstName} {userProfile.lastName}
          </p>
        </div>

        <div className="mb-10 md:mb-16 text-sm md:text-2xl">
          <p>DATE: {longSessionDate(sessionWaitlist.session.startTime)}</p>
          <p>TIME: {formatSessionTime(sessionWaitlist.session.time)}</p>
          <p>WHERE: Crosscourt {sessionWaitlist.session.location.name}</p>
        </div>

        <p className="text-center text-xs mb-5 max-w-2xl md:text-base md:mx-40">
          We will automatically add you to the session roster if someone in front of you cancels.
          Please look out for an SMS message confirming your addition to the session.
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
