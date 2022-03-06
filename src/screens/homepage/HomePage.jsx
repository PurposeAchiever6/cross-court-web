import React, { useEffect, useCallback } from 'react';

import Landing from './components/Landing';

import Modal from 'shared/components/Modal';
import SurveyModal from 'screens/survey/SurveyModal';

import { getUserProfile, getPreviousSessions, getPageLoading } from 'screens/my-account/reducer';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { initialLoadInit } from 'screens/my-account/actionCreators';

import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import { openContactForm, openContactFormForUser } from 'shared/utils/contactForm';

const HomePage = () => {
  const history = useHistory();
  const { search } = useLocation();

  const dispatch = useDispatch();
  const userInfo = useSelector(getUserProfile);
  const loading = useSelector(getPageLoading);
  const previousSessions = useSelector(getPreviousSessions);
  previousSessions.sort((a, b) => b.id - a.id);
  const isAuthenticated = useSelector(getIsAuthenticated);

  const redirectUrl = window.localStorage.getItem('redirect');
  const shouldShowSurveyModal =
    isAuthenticated && userInfo?.lastCheckedInUserSession?.surveyAnswers.length === 0;

  const maybeGoBackToSessionToBook = useCallback(() => {
    if (isAuthenticated && redirectUrl) {
      window.localStorage.removeItem('redirect');
      history.push(redirectUrl);
    }
  }, [history, isAuthenticated, redirectUrl]);

  useEffect(() => {
    dispatch(initialLoadInit());

    if (shouldShowSurveyModal) {
      window.localStorage.setItem('surveyLock', 'true');
    } else {
      window.localStorage.removeItem('surveyLock', 'true');
      maybeGoBackToSessionToBook();
    }
  }, [dispatch, shouldShowSurveyModal, maybeGoBackToSessionToBook]);

  useEffect(() => {
    if (!loading) {
      const { openForm } = queryString.parse(search);
      setTimeout(() => {
        if (openForm === 'true') {
          isAuthenticated ? openContactFormForUser(userInfo) : openContactForm();
        }
      }, 3000);
    }
  }, [search, userInfo, isAuthenticated, loading]);

  return (
    <>
      <Landing />
      <Modal
        isOpen={shouldShowSurveyModal}
        showCloseButton={false}
        closeOnOverlayClick={false}
        dark
      >
        <SurveyModal />
      </Modal>
    </>
  );
};

export default HomePage;
