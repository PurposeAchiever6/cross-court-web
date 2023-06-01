import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import { accountMissingInformation } from 'shared/utils/user';
import { getUserProfile } from 'screens/my-account/reducer';
import Link from 'shared/components/Link';

const AccountMissingInformationLink = ({ className }) => {
  const currentUser = useSelector(getUserProfile);

  if (!accountMissingInformation(currentUser)) {
    return null;
  }

  return (
    <div className={className}>
      Or go to{' '}
      <Link variant="purple-dark" to={ROUTES.SETTINGS_BIO}>
        My Account
      </Link>{' '}
      to finish setting up your profile
    </div>
  );
};

AccountMissingInformationLink.defaultProps = {
  className: '',
};

AccountMissingInformationLink.propTypes = {
  className: PropTypes.string,
};

export default AccountMissingInformationLink;
