import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loading from 'shared/components/Loading';
import { isNil } from 'ramda';
import { getSelectedProduct } from 'screens/series/reducer';
import { initialLoadInit } from './actionCreators';
import { getPageLoading, getAvailableCards } from './reducer';
import PaymentMethods from './components/PaymentMethods';

const PaymentsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PaymentsPage = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getPageLoading);
  const availableCards = useSelector(getAvailableCards);
  const selectedProduct = useSelector(getSelectedProduct);

  useEffect(() => {
    dispatch(initialLoadInit());
  }, [dispatch]);

  if (isNil(selectedProduct)) {
    return <Redirect to="/series" />;
  }

  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <PaymentsPageContainer>
      <PaymentMethods availableCards={availableCards} />
    </PaymentsPageContainer>
  );
};

export default PaymentsPage;
