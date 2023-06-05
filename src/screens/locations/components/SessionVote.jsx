import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { voteSessionInit, removeVoteSessionInit } from 'screens/sessions/actionCreators';
import UpvoteSvg from 'shared/components/svg/UpvoteSvg';
import Button from 'shared/components/Button';

const SessionVote = ({ session, className }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(getIsAuthenticated);

  const { id, votes, voted, startTime, past } = session;

  const onClickHandle = () => {
    if (!isAuthenticated) {
      return history.push(ROUTES.SIGNUP);
    }

    if (voted) {
      dispatch(removeVoteSessionInit(id, startTime));
    } else {
      dispatch(voteSessionInit(id, startTime));
    }
  };

  return (
    <div className={className}>
      <div className="bg-cc-blue-900 flex justify-between items-center p-4">
        <div>
          <span className="block text-cc-purple text-sm mb-1">
            {voted
              ? 'Thanks for your vote'
              : 'This session becomes available once it hits 15 upvotes.'}
          </span>
          <span className="block text-white text-opacity-60 text-sm">{votes} upvotes</span>
        </div>
        <Button
          onClick={onClickHandle}
          variant={voted ? 'outline-purple' : 'purple'}
          disabled={past}
        >
          <UpvoteSvg
            className={`w-6 transition-transform duration-300 ${
              voted ? 'transform rotate-180' : ''
            }`}
          />
        </Button>
      </div>
    </div>
  );
};

SessionVote.defaultProps = {
  className: '',
};

SessionVote.propTypes = {
  session: PropTypes.shape().isRequired,
  className: PropTypes.string,
};

export default SessionVote;
