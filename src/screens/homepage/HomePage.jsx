import React, { useEffect, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';

import ROUTES from 'shared/constants/routes';
import { openContactForm, openContactFormForUser } from 'shared/utils/contactForm';
import { getUserProfile, getPageLoading } from 'screens/my-account/reducer';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getQuestionsInit, saveAnswer } from 'screens/surveys/sessions/actionCreators';
import { getQuestions } from 'screens/surveys/sessions/reducer';
import SessionSurveyModal from 'screens/surveys/sessions/components/SessionSurveyModal';

import Landing from './components/Landing';

const HomePage = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { openForm, openSurvey } = queryString.parse(search);

  const userInfo = useSelector(getUserProfile);
  const loading = useSelector(getPageLoading);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const questions = useSelector(getQuestions);

  const openFormParam = openForm === 'true';
  const openSurveyParam = openSurvey === 'true';

  const [showSurveyModal, setShowSurveyModal] = useState(openSurveyParam);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        if (openFormParam) {
          isAuthenticated ? openContactFormForUser(userInfo) : openContactForm();
        }
      }, 1500);
    }
  }, [search, userInfo, isAuthenticated, loading, openFormParam]);

  useEffect(() => {
    if (isAuthenticated && userInfo?.lastCheckedInUserSession?.surveyAnswers.length === 0) {
      setShowSurveyModal(true);
    }
  }, [isAuthenticated, userInfo]);

  useEffect(() => {
    if (showSurveyModal) {
      dispatch(getQuestionsInit());
    }
  }, [dispatch, showSurveyModal]);

  const answerQuestion = (questionId, answer) => dispatch(saveAnswer(questionId, answer));

  if (!isAuthenticated && openSurveyParam) {
    return <Redirect to={ROUTES.LOGIN} />;
  }

  return (
    <>
      <Landing />
      <SessionSurveyModal
        showSurveyModal={showSurveyModal}
        setShowSurveyModal={setShowSurveyModal}
        questions={questions}
        answerQuestion={answerQuestion}
      />
    </>
  );
};

export default HomePage;
