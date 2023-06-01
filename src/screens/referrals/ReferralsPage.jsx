import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loading from 'shared/components/Loading';
import { getReferralsInit } from 'screens/referrals/actionCreators';
import { getReferrals, getPageLoading } from 'screens/referrals/reducer';
import ReferralsList from 'screens/referrals/components/ReferralsList';
import PageLayout from 'shared/components/layout/PageLayout';

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
    <PageLayout>
      <div className="md:mt-6 md:mb-24">
        <h1 className="font-shapiro95_super_wide text-2xl md:text-3xl text-center uppercase mb-6">
          Referral History
        </h1>
        <ReferralsList referrals={referrals} className="max-w-screen-md mx-auto" />
      </div>
    </PageLayout>
  );
};

export default ReferralsPage;
