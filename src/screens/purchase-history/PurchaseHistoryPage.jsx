import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import Loading from 'shared/components/Loading';
import BackButton from 'shared/components/BackButton';

import { initialLoadInit } from './actionCreators';
import { getPageLoading, getPurchaseHistory } from './reducer';
import PurchaseHistoryTable from './components/PurchaseHistoryTable';

const PurchaseHistoryPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .buttons-container {
    align-self: flex-start;
    margin: 2rem 0px;
  }
  h2 {
    margin-bottom: 2rem;
  }

  @media (max-width: 991px) {
  }
`;

const PurchaseHistoryPage = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getPageLoading);
  const purchaseHistory = useSelector(getPurchaseHistory);

  useEffect(() => {
    dispatch(initialLoadInit());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <PurchaseHistoryPageContainer className="purchase-history">
      <div className="buttons-container">
        <BackButton />
      </div>
      <h2>PURCHASE HISTORY</h2>
      <PurchaseHistoryTable purchaseHistory={purchaseHistory} />
    </PurchaseHistoryPageContainer>
  );
};

export default PurchaseHistoryPage;
