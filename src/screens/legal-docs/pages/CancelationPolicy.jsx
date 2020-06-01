import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Loading from 'shared/components/Loading';
import { getPageLoading, getCancelationPolicy } from '../reducer';

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

const CancelationPolicy = () => {
  const isLoading = useSelector(getPageLoading);
  const cancelationPolicyText = useSelector(getCancelationPolicy);

  return isLoading ? (
    <Loading />
  ) : (
    <PageContainer>
      <h2>Cancelation Policy</h2>
      <p>{cancelationPolicyText}</p>
    </PageContainer>
  );
};

export default CancelationPolicy;
