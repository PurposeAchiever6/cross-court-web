import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from 'screens/auth/components/LoginForm';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoginPage = ({ actions, isLoading, error }) => {
  return (
    <PageContainer>
      <LoginForm loginHandler={actions.loginInit} isLoading={isLoading} error={error} />
    </PageContainer>
  );
};

LoginPage.propTypes = {
  actions: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

export default LoginPage;
