import React, { useEffect } from 'react';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ROUTES from 'shared/constants/routes';

const SurveyPage = () => {
    const history = useHistory();
    const isAuthenticated = useSelector(getIsAuthenticated);
  
    useEffect(() => {
      history.push(isAuthenticated ? ROUTES.HOME : ROUTES.LOGIN);
    }, [isAuthenticated]);

    return (
      <>
      </>
    );
  }
  
  export default SurveyPage;
  