import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import currency from 'currency.js';
import { purchaseFormattedDate } from 'shared/utils/date';
import Loading from 'shared/components/Loading';
import BackButton from 'shared/components/BackButton';
import device from 'shared/styles/mediaQueries';
import colors from 'shared/styles/constants';
import { initialLoadInit } from '../../actionCreators';
import { getPageLoading, getPurchaseHistory } from '../../reducer';

const PurchaseHistoryPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 81.9vh;

  .header {
    width: 100%
    display: flex;
    margin-bottom: 1rem;

    * {
      flex: 1;
    }

    h2 {
      flex: 3;
    }
  }

  .buttons-container {
    align-self: flex-start;
    margin-top: auto;
    margin-bottom: auto;
  }

  .back-btn {
    margin-top: 0;
  }

  .purchases-container {
    justify-content: center;
    align-items: center;
    width: 100%;

    .purchase-item {
      box-sizing: border-box;
      display: flex;
      width: 100%;
      justify-content: space-around;
      padding: 1rem;
      border-bottom: 1px solid ${colors.grey};

      .purchase-info {
        flex: 3;
        display: flex;
        flex-direction: column;
      }
      .plan-name {
        font-weight: bold;
        font-size: 1.3rem;
        margin-bottom: 0.5rem;
      }
      .sessions-qty {
        font-weight: 500;
      }
      .price {
        font-weight: bold;
        align-self: center;
      }
      .date {
        margin-left: 1rem;
      }
    }
  }

  @media ${device.desktop} {
    display: none;
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
      <div className="header">
        <div className="buttons-container">
          <BackButton className="back-btn" showText={false} />
        </div>
        <h2>Purchase History</h2>
      </div>
      <div className="purchases-container">
        {purchaseHistory.map(({ id, name, credits, date, price }) => (
          <div className="purchase-item" key={id}>
            <div className="purchase-info">
              <span className="plan-name">{name}</span>
              <div>
                <span className="sessions-qty">
                  {`${credits} Session${credits > 1 ? 's' : ''}`}
                </span>
                <span className="date">{purchaseFormattedDate(date)}</span>
              </div>
            </div>
            <span className="price">{`$ ${currency(price, {
              symbol: '$',
              precision: 0,
            })}`}</span>
          </div>
        ))}
      </div>
    </PurchaseHistoryPageContainer>
  );
};

export default PurchaseHistoryPage;
