import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import currency from 'currency.js';
import { purchaseFormattedDate } from 'shared/utils/date';
import Loading from 'shared/components/Loading';
import BackButton from 'shared/components/BackButton';
import { initialLoadInit } from './actionCreators';
import { getPageLoading, getPurchaseHistory } from './reducer';

const PurchaseHistoryPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
  height: 81.9vh;
  .buttons-container {
    align-self: flex-start;
    margin: 2rem 0px;
  }
  h2 {
    margin-bottom: 2rem;
  }
  .purchases-container {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #bbbecd;

    .purchase-item {
      box-sizing: border-box;
      display: flex;
      width: 100%;
      justify-content: space-around;
      padding: 1rem;
      border-bottom: 1px solid #bbbecd;

      .plan-name {
        font-weight: bold;
      }
      .sessions-qty {
        font-weight: bold;
      }
      .price {
        font-weight: bold;
      }
    }
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
    <PurchaseHistoryPageContainer>
      <div className="buttons-container">
        <BackButton />
      </div>
      <h2>Purchase History</h2>
      <div className="purchases-container">
        {purchaseHistory.map(purchase => (
          <div className="purchase-item" key={purchase.id}>
            <span className="plan-name">The Rookie</span>
            <span className="sessions-qty">3 Sessions</span>
            <span className="date">{purchaseFormattedDate(purchase.date)}</span>
            <span className="price">{`$ ${currency(purchase.price, {
              symbol: '$',
              precision: 2,
            })}`}</span>
          </div>
        ))}
      </div>
    </PurchaseHistoryPageContainer>
  );
};

export default PurchaseHistoryPage;
