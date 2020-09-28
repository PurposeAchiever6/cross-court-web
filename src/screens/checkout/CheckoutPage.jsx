import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { isNil } from 'ramda';

import ROUTES from 'shared/constants/routes';
import { getSelectedProduct } from 'screens/series/reducer';
import { getSelectedCard, getClaimFreeSession } from 'screens/payments/reducer';
import BackButton from 'shared/components/BackButton';
import device from 'shared/styles/mediaQueries';
import { createPurchase, /*createFreeSessionInit*/ } from './actionCreators';
import ProductDetails from './components/PurchaseDetails';

const CheckoutPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .button-container {
    width: 100%;
  }

  @media (max-width: 991px) {
    h1 {
      font-size: 1.5rem;
      margin-top: 2rem;
    }
  }
`;

const CheckoutPage = () => {
  const dispatch = useDispatch();

  const createPurchaseHandler = () => dispatch(createPurchase());
  //const createFreeSessionHandler = () => dispatch(createFreeSessionInit());
  const productDetails = useSelector(getSelectedProduct);
  const paymentDetails = useSelector(getSelectedCard);
  const isFreeSession = useSelector(getClaimFreeSession);

  if (isNil(productDetails) || isNil(paymentDetails)) {
    return <Redirect to={ROUTES.LOCATIONS} />;
  }

  return (
    <CheckoutPageContainer className="checkout">
      <div className="button-container">
        <BackButton />
      </div>
      <h1>PURCHASE DETAILS</h1>
      <ProductDetails
        productDetails={productDetails}
        paymentDetails={paymentDetails}
        createPurchaseHandler={createPurchaseHandler}
        //createFreeSessionHandler={createFreeSessionHandler}
        isFreeSession={isFreeSession}
      />
    </CheckoutPageContainer>
  );
};

export default CheckoutPage;
