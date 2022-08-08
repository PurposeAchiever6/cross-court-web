import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import { voteSessionInit, removeVoteSessionInit } from 'screens/sessions/actionCreators';
import Tooltip from 'shared/components/Tooltip';

const SessionVote = ({ sessionId, sessionDate, votes, voted, className }) => {
  const dispatch = useDispatch();

  const onClickHandle = () => {
    if (voted) {
      dispatch(removeVoteSessionInit(sessionId, sessionDate));
    } else {
      dispatch(voteSessionInit(sessionId, sessionDate));
    }
  };

  return (
    <div className={className}>
      <div className="flex items-center">
        {!voted && (
          <Tooltip
            variant="purple"
            tooltip='Each week, if a "Coming Soon" session gets 15 or more upvotes, it will become availabe for booking'
            className="mr-2 mt-1"
          >
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="text-2xl text-cc-purple cursor-pointer"
            />
          </Tooltip>
        )}
        <div>
          <div
            onClick={onClickHandle}
            className={`rounded-full border border-cc-purple flex flex-col justify-center items-center w-10 h-10 mx-auto cursor-pointer relative transition-all duration-200 ${
              voted ? 'text-white bg-cc-purple' : 'text-cc-purple bg-white'
            }`}
          >
            <FontAwesomeIcon
              icon={faAngleUp}
              className={`transition-transform delay-300 duration-200 text-lg absolute mx-auto ${
                voted ? 'transform rotate-180 bottom-0' : 'top-0'
              }`}
            />
            <span className={voted ? '-mt-1' : 'mt-2'}>{votes}</span>
          </div>
          {voted && <div className="mt-1 text-2xs uppercase lg:hidden">Votes</div>}
        </div>
      </div>
    </div>
  );
};

SessionVote.defaultProps = {
  className: '',
};

SessionVote.propTypes = {
  votes: PropTypes.number.isRequired,
  voted: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export default SessionVote;
