import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import { removeSessionGuest } from 'screens/sessions/actionCreators';
import { sessionGuestsAllowedForUser } from 'screens/sessions/utils';

const SessionGuests = ({ className, session, setShowAddGuestModal }) => {
  const dispatch = useDispatch();

  const sessionGuests = session?.userSession?.sessionGuests ?? [];
  const guestsAllowed = sessionGuestsAllowedForUser(session);
  const hasGuests = sessionGuests.length > 0;

  const handleRemoveGuest = (sessionGuestId) => {
    dispatch(removeSessionGuest(session?.userSession?.id, sessionGuestId));
  };

  if (!guestsAllowed && !hasGuests) {
    return;
  }

  return (
    <div className={className}>
      <div>
        {hasGuests && <p className="mt-6 mb-2 text-md text-center">Guests:</p>}
        {sessionGuests.map((guest) => (
          <div className="flex mb-2 last:mb-0" key={guest.id}>
            <p className="uppercase font-shapiro96_inclined_wide mr-3">
              {guest.firstName} {guest.lastName} Added
            </p>
            <button type="button" onClick={() => handleRemoveGuest(guest.id)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        ))}
      </div>
      {guestsAllowed && (
        <PrimaryButton
          w="100%"
          className={hasGuests ? 'mt-3' : ''}
          onClick={() => setShowAddGuestModal(true)}
        >
          + USE FREE GUEST PASS
        </PrimaryButton>
      )}
    </div>
  );
};

SessionGuests.defaultProps = {
  className: '',
};

SessionGuests.propTypes = {
  className: PropTypes.string,
  setShowAddGuestModal: PropTypes.func.isRequired,
  session: PropTypes.shape().isRequired,
};

export default SessionGuests;
