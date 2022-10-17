import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import { removeSessionGuest } from 'screens/sessions/actionCreators';

const SessionGuests = ({ session, setShowAddGuestModal }) => {
  const sessionGuests = session?.userSession?.sessionGuests ?? [];

  const dispatch = useDispatch();

  const addGuestsAllowed =
    (session?.isOpenClub || session?.skillSession) &&
    session?.guestsAllowed > 0 &&
    session?.guestsAllowed > sessionGuests.length &&
    session?.guestsAllowedPerUser > sessionGuests.length;

  const handleRemoveGuest = (sessionGuestId) => {
    dispatch(removeSessionGuest(session?.userSession?.id, sessionGuestId));
  };

  return (
    <>
      {sessionGuests.length > 0 && (
        <div className="mb-4">
          {sessionGuests.map((guest) => (
            <div className="flex" key={guest.id}>
              <p className="uppercase font-shapiro96_inclined_wide mr-3">
                {guest.firstName} {guest.lastName} Added
              </p>
              <button type="button" onClick={() => handleRemoveGuest(guest.id)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          ))}
        </div>
      )}
      {addGuestsAllowed && (
        <PrimaryButton className="mb-4" onClick={() => setShowAddGuestModal(true)} inverted>
          + USE FREE GUEST PASS
        </PrimaryButton>
      )}
    </>
  );
};

SessionGuests.propTypes = {
  setShowAddGuestModal: PropTypes.func.isRequired,
  session: PropTypes.shape().isRequired,
};

export default SessionGuests;
