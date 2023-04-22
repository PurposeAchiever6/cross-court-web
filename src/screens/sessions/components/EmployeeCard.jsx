import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { titleize } from 'shared/utils/helpers';
import Avatar from 'shared/components/Avatar';
import Button from 'shared/components/Button';
import UserBioModal from 'screens/sessions/components/modals/UserBioModal';

const EmployeeCard = ({ user, className }) => {
  const [showUserBioModal, setShowUserBioModal] = useState(false);

  const { fullName, bio, imageUrl } = user;

  return (
    <>
      <div className={className}>
        <div className="bg-cc-blue-100 p-4 relative">
          <span className="font-shapiro95_super_wide text-xs md:text-sm">
            {titleize(fullName) || 'Not Assigned'}
          </span>
          <Avatar img={imageUrl} size="md" className="absolute-center-y right-4" />
        </div>
        {bio && (
          <div className="bg-cc-blue-300 p-4 pt-8">
            <Button
              variant="outline-white"
              onClick={() => setShowUserBioModal(true)}
              className="w-full"
            >
              View Bio
            </Button>
          </div>
        )}
      </div>
      <UserBioModal
        isOpen={showUserBioModal}
        closeHandler={() => setShowUserBioModal(false)}
        user={user}
      />
    </>
  );
};

EmployeeCard.defaultProps = {
  className: '',
};

EmployeeCard.propTypes = {
  user: PropTypes.shape().isRequired,
  className: PropTypes.string,
};

export default EmployeeCard;
