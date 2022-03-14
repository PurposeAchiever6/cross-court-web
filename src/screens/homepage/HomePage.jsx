import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';

import { openContactForm, openContactFormForUser } from 'shared/utils/contactForm';

import { getUserProfile, getPageLoading } from 'screens/my-account/reducer';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getQuestionsInit, saveAnswer } from 'screens/survey/actionCreators';
import { getQuestions } from 'screens/survey/reducer';
import SurveyModal from 'screens/survey/components/SurveyModal';

import Landing from './components/Landing';

const HomePage = () => {
  const { search } = useLocation();
  const { openForm, openSurvey } = queryString.parse(search);

  const dispatch = useDispatch();
  const userInfo = useSelector(getUserProfile);
  const loading = useSelector(getPageLoading);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const questions = useSelector(getQuestions);
  const answerQuestion = (questionId, answer) => dispatch(saveAnswer(questionId, answer));

  const [showSurveyModal, setShowSurveyModal] = useState(
    openSurvey === 'true' ||
      (isAuthenticated && userInfo?.lastCheckedInUserSession?.surveyAnswers.length === 0)
  );

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        if (openForm === 'true') {
          isAuthenticated ? openContactFormForUser(userInfo) : openContactForm();
        }
      }, 3000);
    }
  }, [search, userInfo, isAuthenticated, loading, openForm]);

  useEffect(() => {
    if (showSurveyModal) {
      dispatch(getQuestionsInit());
    }
  }, [showSurveyModal, dispatch]);

  return (
    <>
      <Landing />
      <SurveyModal
        showSurveyModal={showSurveyModal}
        setShowSurveyModal={setShowSurveyModal}
        questions={questions}
        answerQuestion={answerQuestion}
      />
    </>
  );
};

export default HomePage;
