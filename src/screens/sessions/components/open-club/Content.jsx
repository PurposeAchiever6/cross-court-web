import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, useParams } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';

import SessionInfo from 'screens/sessions/components/SessionInfo';

import sklz from 'shared/images/sklz/sklz.jpg';
import goTeam from 'shared/images/sklz/go-team.jpg';
import clap from 'shared/images/sklz/clap.jpg';
import learn from 'shared/images/sklz/learn.jpg';
import sweat from 'shared/images/sklz/sweat.jpg';

export const SKLZ_IMAGES = [sklz, goTeam, clap, learn, sweat];

const OpenClub = ({ sessionInfo }) => {
  const { id, date } = useParams();

  if (!id) {
    return <Redirect to={ROUTES.HOME} />;
  }

  if (!sessionInfo.isOpenClub) {
    return <Redirect to={`/session/${id}/${date}`} />;
  }

  return (
    <div className="md:w-1/2 text-center md:text-left flex flex-col justify-between py-12 px-4 md:p-8 font-shapiro95_super_wide text-white">
      <SessionInfo date={date} sessionInfo={sessionInfo} />
    </div>
  );
};

OpenClub.propTypes = {
  sessionInfo: PropTypes.shape({
    past: PropTypes.bool,
    spotsLeft: PropTypes.number,
    isOpenClub: PropTypes.bool,
  }),
  userProfile: PropTypes.shape({}),
};

export default OpenClub;
