import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loading from 'shared/components/Loading';
import { getReferralsInit } from 'screens/referrals/actionCreators';
import { getReferrals, getPageLoading } from 'screens/referrals/reducer';
import BackButton from 'shared/components/BackButton';
import ReferralsList from 'screens/referrals/components/ReferralsList';

const ReferralsPage = () => {
  const dispatch = useDispatch();

  const referrals = useSelector(getReferrals);
  const isLoading = useSelector(getPageLoading);

  useEffect(() => {
    dispatch(getReferralsInit());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="px-4 py-8 pb-12 md:px-12">
      <BackButton className="ml-0 mb-10" />
      <div className="md:mt-6 md:mb-24">
        <h1 className="font-shapiro95_super_wide text-2xl md:text-3xl text-cc-black text-center uppercase mb-6">
          Referral History
        </h1>
        <ReferralsList referrals={referrals} className="max-w-screen-md mx-auto" />
      </div>
    </div>
  );
};

export default ReferralsPage;
