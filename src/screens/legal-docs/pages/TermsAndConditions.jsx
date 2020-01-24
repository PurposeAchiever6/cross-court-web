import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Loading from 'shared/components/Loading';
import { getPageLoading, getTermsAndConditions } from '../reducer';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  h2 {
    margin-top: 5rem;
  }
`;

const SemHandbookPage = () => {
  const isLoading = useSelector(getPageLoading);
  const termsAndConditionsText = useSelector(getTermsAndConditions);

  return isLoading ? (
    <Loading />
  ) : (
    <PageContainer>
      <h2>Terms And Conditions</h2>
      <p>{termsAndConditionsText}</p>
    </PageContainer>
  );
};

export default SemHandbookPage;
