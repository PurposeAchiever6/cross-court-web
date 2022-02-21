import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import { isUserInFirstFreeSessionFlow } from 'shared/utils/user';
import { getUserProfile } from 'screens/my-account/reducer';
import CCIcon from 'shared/components/CCIcon';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import Spinner from 'shared/components/Spinner';

import { deleteCard, setSelectedCard, updateCard } from '../actionCreators';
import { getDeleteCardLoading } from '../reducer';

const PaymentMethods = ({ availablePaymentMethods, isPaymentFlow }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const userInfo = useSelector(getUserProfile);
  const deleteCardLoading = useSelector(getDeleteCardLoading);
  const defaultPaymentMethod = userInfo.defaultPaymentMethod;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [cardIdToDelete, setCardIdToDelete] = useState(null);
  const updatePaymentMethod = (paymentMethodId, attrs) =>
    dispatch(updateCard(paymentMethodId, attrs));

  const handleSelectPaymentMethod = useCallback(
    (paymentMethod) => {
      dispatch(setSelectedCard(paymentMethod));
      setSelectedPaymentMethod(paymentMethod.id);
    },
    [dispatch]
  );

  const deleteCardHandler = (paymentMethodId) => {
    setCardIdToDelete(paymentMethodId);
    dispatch(deleteCard(paymentMethodId));
  };
  const selectedCardHandler = (paymentMethod) => {
    handleSelectPaymentMethod(paymentMethod);
  };

  const redirectUrl = window.localStorage.getItem('redirect');

  const shouldReturnFSFDetailsPage = () =>
    isUserInFirstFreeSessionFlow(userInfo) && availablePaymentMethods.length && redirectUrl;

  const nextHandler = () => {
    if (shouldReturnFSFDetailsPage()) {
      window.localStorage.removeItem('redirect');
      history.push(redirectUrl);
    } else {
      history.push('/checkout');
    }
  };

  useEffect(() => {
    if (defaultPaymentMethod) {
      handleSelectPaymentMethod(defaultPaymentMethod);
    }
  }, [handleSelectPaymentMethod, defaultPaymentMethod]);

  const redirectTo =
    location.pathname === ROUTES.EDIT_PAYMENT_METHODS
      ? ROUTES.EDIT_PAYMENT_METHODS
      : ROUTES.PAYMENT_METHODS;
  const handleAddNewCard = () => {
    history.push({
      pathname: ROUTES.ADD_PAYMENT_METHOD,
      state: {
        redirectTo,
      },
    });
  };

  const handleMakeDefault = (paymentMethodId) => {
    updatePaymentMethod(paymentMethodId, { default: true });
  };

  return (
    <div className="w-11/12 md:w-2/5">
      <div className="flex flex-col mb-8 items-center justify-center">
        <h2 className="font-shapiro95_super_wide text-lg">{`${
          isPaymentFlow ? 'CHOOSE A PAYMENT METHOD' : 'PAYMENT METHODS'
        }`}</h2>
        <h3>{`${isPaymentFlow ? '' : 'Select your default payment method'}`}</h3>
      </div>
      <div className="border-4 border-cc-purple flex flex-col justify-start">
        {availablePaymentMethods.length === 0 ? (
          <div className="min-h-60 flex items-center justify-center text-center">
            There are no payment methods added yet.
          </div>
        ) : (
          availablePaymentMethods.map((paymentMethod) => {
            const isCardSelected = selectedPaymentMethod === paymentMethod.id;
            const isDefault = defaultPaymentMethod?.id === paymentMethod.id;
            return (
              <div
                className="py-4 flex items-center justify-around border-b-2 last:border-0"
                key={paymentMethod.id}
              >
                <button
                  className={`border-2 rounded-full w-10 h-10 selector ${
                    isCardSelected ? 'animate-spin-slow bg-cc-ball-logo bg-contain' : ''
                  }`}
                  type="button"
                  onClick={() =>
                    isPaymentFlow
                      ? selectedCardHandler(paymentMethod)
                      : handleMakeDefault(paymentMethod.id)
                  }
                />
                <div className="flex items-center justify-center w-10 md:w-20">
                  <CCIcon ccType={paymentMethod.brand} />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="font-shapiro95_super_wide text-lg md:text-xl">{`***${paymentMethod.last4}`}</span>
                  <span className="font-shapiro95_super_wide text-xs my-1">
                    Expires {`${paymentMethod.expMonth}/${paymentMethod.expYear}`}
                  </span>
                  <span className="text-cc-purple text-xs">{`${isDefault ? 'Default' : ''}`}</span>
                </div>
                <div className="flex items-center justify-center">
                  {deleteCardLoading && cardIdToDelete === paymentMethod.id ? (
                    <Spinner />
                  ) : (
                    <button type="button" onClick={() => deleteCardHandler(paymentMethod.id)}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="mt-10 flex items-center justify-between">
        <PrimaryButton onClick={handleAddNewCard} inverted>
          ADD NEW CARD
        </PrimaryButton>
        <PrimaryButton
          disabled={!selectedPaymentMethod}
          onClick={isPaymentFlow ? nextHandler : () => history.goBack()}
        >
          {`${isPaymentFlow ? 'NEXT' : 'DONE'}`}
        </PrimaryButton>
      </div>
    </div>
  );
};

PaymentMethods.propTypes = {
  availablePaymentMethods: PropTypes.arrayOf(PropTypes.object).isRequired,
  isPaymentFlow: PropTypes.bool.isRequired,
};

export default PaymentMethods;
