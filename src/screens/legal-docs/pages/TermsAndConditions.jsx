import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Loading from 'shared/components/Loading';
import { getPageLoading, getTermsAndConditions } from '../reducer';

const PageContainer = styled.div``;

const TermsAndConditions = () => {
  const isLoading = useSelector(getPageLoading);
  const termsAndConditionsText = useSelector(getTermsAndConditions);

  return isLoading ? (
    <Loading />
  ) : (
    <PageContainer className="terms-and-conditions">
      <h1>TERMS AND CONDITIONS</h1>
      <p>{termsAndConditionsText}</p>
    </PageContainer>
  );
};

export default TermsAndConditions;
