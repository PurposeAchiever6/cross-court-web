import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { titleize } from 'shared/utils/helpers';
import { sessionGuestsAllowed, sessionGuestsAllowedForUser } from 'screens/sessions/utils';
import { getShowAddGuestModal } from 'screens/sessions/reducer';
import {
  initialLoadInit,
  removeSessionGuest,
  showAddGuestModal as showAddGuestModalAction,
  closeAddGuestModal as closeAddGuestModalAction,
} from 'screens/sessions/actionCreators';
import Button from 'shared/components/Button';
import AddGuestModal from 'screens/sessions/components/modals/AddGuestModal';
import CheckSvg from 'shared/components/svg/CheckSvg';

const SessionGuests = ({ session, className }) => {
  const dispatch = useDispatch();

  const showAddGuestModal = useSelector(getShowAddGuestModal);
  const guestsAllowedForSession = sessionGuestsAllowed(session);
  const { guestsAllowedForUser, reason } = sessionGuestsAllowedForUser(session);

  const { userSession } = session;
  const { id: userSessionId, date } = userSession || {};

  const sessionGuests = userSession?.sessionGuests ?? [];
  const hasGuests = sessionGuests.length > 0;

  const setShowAddGuestModal = (show) => {
    show ? dispatch(showAddGuestModalAction()) : dispatch(closeAddGuestModalAction());
  };

  const removeGuest = (sessionGuestId) => {
    dispatch(
      removeSessionGuest(
        { userSessionId, sessionGuestId },
        { callAction: initialLoadInit(session.id, date) }
      )
    );
  };

  if (!guestsAllowedForSession) {
    return;
  }

  return (
    <>
      <div className={className}>
        {hasGuests && (
          <div className="mb-3">
            {sessionGuests.map(({ id, firstName, lastName }) => (
              <div key={id} className="flex justify-between items-center mb-1">
                <div className="flex items-center text-sm mr-3">
                  <CheckSvg className="w-4 text-success mr-2" />
                  {titleize(`${firstName} ${lastName}`)}
                </div>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  onClick={() => removeGuest(id)}
                  className="cursor-pointer w-4 shrink-0 hover:opacity-70"
                />
              </div>
            ))}
          </div>
        )}
        <Button
          disabled={!guestsAllowedForUser}
          onClick={() => setShowAddGuestModal(true)}
          className="w-full"
        >
          Use Free Guest Pass
        </Button>
        {!guestsAllowedForUser && (
          <div className="bg-cc-blue-700 text-center text-2xs px-3 py-2 mt-1">{reason}</div>
        )}
      </div>
      <AddGuestModal
        isOpen={showAddGuestModal}
        session={session}
        closeHandler={() => setShowAddGuestModal(false)}
      />
    </>
  );
};

SessionGuests.defaultProps = {
  className: '',
};

SessionGuests.propTypes = {
  className: PropTypes.string,
  session: PropTypes.shape().isRequired,
};

export default SessionGuests;
