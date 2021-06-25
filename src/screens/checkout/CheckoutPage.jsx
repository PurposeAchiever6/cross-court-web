import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { isNil } from 'ramda';

import ROUTES from 'shared/constants/routes';
import { getSelectedProduct } from 'screens/products/reducer';
import { getSelectedCard } from 'screens/payments/reducer';
import BackButton from 'shared/components/BackButton';
import { createPurchase, createSubscription, updateSubscription } from './actionCreators';
import ProductDetails from './components/PurchaseDetails';
import { getUserProfile } from 'screens/my-account/reducer';

const RECURRING = 'recurring';

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
  const productDetails = useSelector(getSelectedProduct);
  const paymentDetails = useSelector(getSelectedCard);
  const userProfile = useSelector(getUserProfile);

  if (isNil(productDetails) || isNil(paymentDetails)) {
    return <Redirect to={ROUTES.LOCATIONS} />;
  }

  const isSubscription = productDetails.productType === RECURRING;
  const userHasActiveSubscription = !!userProfile.activeSubscription;
  let action;

  if (isSubscription && userHasActiveSubscription) {
    action = updateSubscription();
  } else if (isSubscription && !userHasActiveSubscription) {
    action = createSubscription();
  } else {
    action = createPurchase();
  }

  const createPurchaseHandler = () => dispatch(action);

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
      />
    </CheckoutPageContainer>
  );
};

export default CheckoutPage;
