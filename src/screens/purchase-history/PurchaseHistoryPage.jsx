import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import currency from 'currency.js';
import { purchaseFormattedDate } from 'shared/utils/date';
import Loading from 'shared/components/Loading';
import BackButton from 'shared/components/BackButton';
import device from 'shared/styles/mediaQueries';
import { initialLoadInit } from './actionCreators';
import { getPageLoading, getPurchaseHistory } from './reducer';

const PurchaseHistoryPageContainer = styled.div`
  display: flex;
  flex-direction: column;
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
      &:last-child {
        border-bottom: 0;
      }
      .text-row {
        width: 35%;
        display: flex;
        justify-content: space-between;
        .plan-name {
          font-weight: bold;
        }
        .sessions-qty {
          font-weight: bold;
          width: 7rem;
          text-align: center;
        }
        .date {
          width: 6rem;
          text-align: center;
        }
        .price {
          font-weight: bold;
          width: 4rem;
        }
      }
    }
  }
  @media ${device.mobile} {
    .purchases-container {
      width: 80%;

      .purchase-item {
        justify-content: space-between;
        padding: 1rem 2rem;

        .text-row {
          display: flex;
          flex-direction: column;
          width: 50%;
          .price {
            text-align: right;
            width: auto;
          }
          .date {
            width: auto;
            text-align: right;
          }

          .sessions-qty {
            text-align: left;
          }
        }
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
            <div className="text-row">
              <span className="plan-name">{purchase.name}</span>
              <span className="sessions-qty">
                {purchase.credits > 1
                  ? `${purchase.credits} Sessions`
                  : `${purchase.credits} Session`}
              </span>
            </div>
            <div className="text-row">
              <span className="date">{purchaseFormattedDate(purchase.date)}</span>
              <span className="price">{`$ ${currency(purchase.price / 100, {
                symbol: '$',
                precision: 2,
              })}`}</span>
            </div>
          </div>
        ))}
      </div>
    </PurchaseHistoryPageContainer>
  );
};

export default PurchaseHistoryPage;
