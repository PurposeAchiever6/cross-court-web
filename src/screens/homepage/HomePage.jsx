import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import FreeSessionBannerAnimated from 'shared/components/FreeSessionBannerAnimated';
import PWABanner from 'shared/components/PWABanner';
import DesktopLanding from './components/DesktopLanding';

import Modal from 'shared/components/Modal';
import SurveyModal from 'screens/survey/SurveyModal.jsx';

import {
  getUserProfile,
  getPreviousSessions,
} from 'screens/my-account/reducer';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { initialLoadInit } from 'screens/my-account/actionCreators';

import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const PageContainer = styled.div``;
let shouldShowSurveyModal = false;

const HomePage = () => {
  // Handle post-login redirects:
  const history = useHistory();

  const dispatch = useDispatch();
  const userInfo = useSelector(getUserProfile);
  const previousSessions = useSelector(getPreviousSessions);
  previousSessions.sort((a, b) => b.id - a.id);
  const isAuthenticated = useSelector(getIsAuthenticated);

  const [showConfirmModal, setShowConfirmModal] = useState(true);
  const showConfirmModalHandler = () => setShowConfirmModal(true);
  const hideConfirmModalHandler = () => setShowConfirmModal(false);

  const redirectUrl = window.sessionStorage.getItem('redirect');
  const shouldShowSurveyModal = (
    isAuthenticated &&
    userInfo &&
    userInfo.id &&
    previousSessions &&
    previousSessions.length &&
    previousSessions[0].surveyAnswers.length === 0 &&
    previousSessions[0].inCancellationTime === false &&
    previousSessions[0].inConfirmationTime === false
  );
  const maybeGoBackToSessionToBook = () => {
    if (redirectUrl) {
      window.sessionStorage.removeItem('redirect');
      history.push(redirectUrl);
    }
  };

  useEffect(() => {
    dispatch(initialLoadInit());
    console.log('DEBUG previousSessions', previousSessions, );

    if (shouldShowSurveyModal) {
      window.sessionStorage.setItem('surveyLock', 'true');
    } else {
      maybeGoBackToSessionToBook();
    }
  }, [dispatch, shouldShowSurveyModal]);

  return (
    <PageContainer>
      <PWABanner />
      <section class="covid-19">Click <a href="/documents/COVID_guidelinesv2.pdf" target="_blank">here</a> to see the changes we&apos;re making in response to COVID-19.</section>
      {!shouldShowSurveyModal && <FreeSessionBannerAnimated />}
      {shouldShowSurveyModal ? (
        <Modal shouldClose closeHandler={() => {}} isOpen={showConfirmModal}>
          <SurveyModal closeHandler={() => {}} isOpen={showConfirmModal} />
        </Modal>
        ) : ''
      }
      <DesktopLanding />
    </PageContainer>
  );
}

export default HomePage;
