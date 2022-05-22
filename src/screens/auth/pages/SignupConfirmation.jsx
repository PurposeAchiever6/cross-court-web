import React, { useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useQuery from 'shared/hooks/useQuery';

import ROUTES from 'shared/constants/routes';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import CheckIcon from 'shared/images/check-icon.png';
import WarningIcon from 'shared/images/warning-triangle.png';
import StorageUtils from 'shared/utils/storage';
import { autoLogin, logoutInit } from 'screens/auth/actionCreators';
import { getUserProfile } from 'screens/my-account/reducer';

const SignupConfirmationPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const query = useQuery();

  const currentUser = useSelector(getUserProfile);

  const success = query.get('success') === 'true';
  const error = query.get('error');
  const client = query.get('client');
  const accessToken = query.get('access-token');
  const uid = query.get('uid');

  useEffect(() => {
    if (success) {
      dispatch(autoLogin({ client, accessToken, uid }));
    }
  }, [dispatch, success, accessToken, client, uid]);

  const onClickAction = () => {
    if (success) {
      currentUser.hasReceivedFreeSession
        ? history.push(ROUTES.LOCATIONS)
        : history.push({
            pathname: ROUTES.MEMBERSHIPS,
            state: { showDropInsProducts: true, showNoFreeSessionInformation: true },
          });
    } else {
      dispatch(logoutInit({ redirectTo: ROUTES.LOGIN }));
    }
  };

  const { id: savedSessionId, date: savedSessionDate } = StorageUtils.getSavedSession();

  if (success && savedSessionId && savedSessionDate) {
    return <Redirect to={`/session/${savedSessionId}/${savedSessionDate}`} />;
  }

  return (
    <div className="w-full max-w-sm mx-auto text-center px-4 py-16">
      <h1 className="font-shapiro95_super_wide text-3xl uppercase mb-14">Account confirmation</h1>
      <img
        src={success ? CheckIcon : WarningIcon}
        alt="status-icon"
        className="inline-block w-24 mb-12"
      />
      <p className="mb-12">{success ? 'Your e-mail was successfully verified!' : error}</p>
      <PrimaryButton onClick={onClickAction}>{success ? 'Continue' : 'Log In'}</PrimaryButton>
    </div>
  );
};

export default SignupConfirmationPage;
