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

  const handleRemoveGuest = (sessionGuestId) => {
    dispatch(removeSessionGuest(session?.userSession?.id, sessionGuestId));
  };
  return (
    <div className={className}>
      <div className="mb-2">
        {sessionGuests.length > 0 && <p className="mt-6 mb-2 text-md text-center">Guests:</p>}
        {sessionGuests.map((guest) => (
          <div className="flex mb-2" key={guest.id}>
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
        <PrimaryButton w="100%" className="mb-4" onClick={() => setShowAddGuestModal(true)}>
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
