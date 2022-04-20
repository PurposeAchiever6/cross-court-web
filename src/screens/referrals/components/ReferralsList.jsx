import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { getUserProfile } from 'screens/my-account/reducer';
import Table from 'shared/components/Table';
import { formatDateTime } from 'shared/utils/date';

const ReferralsList = ({ referrals, className }) => {
  const currentUser = useSelector(getUserProfile);

  const columns = useMemo(
    () => [
      {
        Header: 'User',
        accessor: 'referredUserName',
        className: 'w-1/2',
      },
      {
        Header: 'Used At',
        accessor: (row) => formatDateTime(row.createdAt),
        className: 'w-1/2',
      },
    ],
    []
  );

  return (
    <div className={className}>
      <div className="text-center mb-6">
        {referrals.length === 0 && (
          <p className="mb-6 md:pt-4">
            It looks like you haven't shared your referral code to any of your friends.
            <strong className="block">What are you waiting for?</strong>
          </p>
        )}
        <p className="mb-6">
          Your referral code is <strong>{currentUser.referralCode}</strong>.
        </p>
        <p>
          Share that code with a friend so he gets a first month discount on his first membership
          purchase, and you will get referral credits to spend at Crosscourt!
        </p>
      </div>
      {referrals.length > 0 && (
        <div>
          <h3 className="font-shapiro95_super_wide text-lg text-center mb-5">
            Friends who have used your referral code
          </h3>
          <Table columns={columns} data={referrals} />
        </div>
      )}
    </div>
  );
};

ReferralsList.defaultProps = {
  className: '',
};

ReferralsList.propTypes = {
  referrals: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  className: PropTypes.string,
};

export default ReferralsList;
