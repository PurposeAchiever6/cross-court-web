import React, { useEffect } from 'react';

import DesktopLanding from './components/DesktopLanding';

import Modal from 'shared/components/Modal';
import SurveyModal from 'screens/survey/SurveyModal';

import { getUserProfile, getPreviousSessions } from 'screens/my-account/reducer';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { initialLoadInit } from 'screens/my-account/actionCreators';

import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const HomePage = () => {
  // Handle post-login redirects:
  const history = useHistory();

  const dispatch = useDispatch();
  const userInfo = useSelector(getUserProfile);
  const previousSessions = useSelector(getPreviousSessions);
  previousSessions.sort((a, b) => b.id - a.id);
  const isAuthenticated = useSelector(getIsAuthenticated);

  const redirectUrl = window.localStorage.getItem('redirect');
  const shouldShowSurveyModal =
    isAuthenticated &&
    userInfo &&
    userInfo.id &&
    previousSessions &&
    previousSessions.length &&
    previousSessions[0].surveyAnswers.length === 0 &&
    previousSessions[0].inCancellationTime === false &&
    previousSessions[0].inConfirmationTime === false;
  const maybeGoBackToSessionToBook = () => {
    if (
      isAuthenticated &&
      redirectUrl
    ) {
      window.localStorage.removeItem('redirect');
      history.push(redirectUrl);
    }
  };

  useEffect(() => {
    dispatch(initialLoadInit());

    if (shouldShowSurveyModal) {
      window.localStorage.setItem('surveyLock', 'true');
    } else {
      //TODO: might need something like this if stuck in survey lock mode
      //window.localStorage.removeItem('surveyLock', 'true');
      maybeGoBackToSessionToBook();
    }
  }, [dispatch, shouldShowSurveyModal]);

  return (
    <div>
      <section className="covid-19">
        Click{' '}
        <a href="/documents/COVID_guidelinesv2.pdf" target="_blank">
          here
        </a>{' '}
        to see the changes we&apos;re making in response to COVID-19.
      </section>
      {shouldShowSurveyModal ? (
        <Modal isOpen={shouldShowSurveyModal}>
          <SurveyModal isOpen={shouldShowSurveyModal} />
        </Modal>
      ) : (
        ''
      )}
      <DesktopLanding />
    </div>
  );
};

export default HomePage;
