import React, { useEffect } from 'react';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ROUTES from 'shared/constants/routes';

const SurveyPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector(getIsAuthenticated);

  useEffect(() => {
    history.push(isAuthenticated ? ROUTES.HOME : ROUTES.LOGIN);
  }, [dispatch, isAuthenticated]);

  return (
    <>
    </>
  );
}

export default SurveyPage;
  