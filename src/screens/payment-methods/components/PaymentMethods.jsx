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
import CrossCourtLogo from 'shared/images/cc-logo.png';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import Badge from 'shared/components/Badge';
import Spinner from 'shared/components/Spinner';
import Tooltip from 'shared/components/Tooltip';

import { deleteCard, setSelectedCard, updateCard } from '../actionCreators';
import { getDeleteCardLoading } from '../reducer';

const PaymentMethods = ({ availablePaymentMethods, isPaymentFlow, className }) => {
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

  const redirectUrl = window.localStorage.getItem('redirect');

  const redirectTo =
    location.pathname === ROUTES.EDIT_PAYMENT_METHODS
      ? ROUTES.EDIT_PAYMENT_METHODS
      : ROUTES.PAYMENT_METHODS;

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
    <div className={className}>
      <div className="text-center mb-8">
        <h2 className="font-shapiro95_super_wide text-lg">
          {`${isPaymentFlow ? 'CHOOSE A PAYMENT METHOD' : 'PAYMENT METHODS'}`}
        </h2>
        {!isPaymentFlow && <h3>Select your default payment method</h3>}
      </div>
      <div className="border-4 border-cc-purple mb-10">
        {availablePaymentMethods.length === 0 ? (
          <div className="min-h-60 flex items-center justify-center p-10">
            There are no payment methods added yet.
          </div>
        ) : (
          availablePaymentMethods.map((paymentMethod) => {
            const isCardSelected = selectedPaymentMethod === paymentMethod.id;
            const isDefault = defaultPaymentMethod?.id === paymentMethod.id;
            const withActiveSubscription = paymentMethod.withActiveSubscription;
            return (
              <div key={paymentMethod.id} className="border-b-2 last:border-0 p-4">
                <div className="flex items-center justify-between gap-x-4 sm:gap-x-10">
                  <button
                    className={`border-2 rounded-full min-w-10 h-10 selector ${
                      isCardSelected ? 'animate-spin-slow bg-cc-ball-logo bg-contain' : ''
                    }`}
                    type="button"
                    onClick={() =>
                      isPaymentFlow
                        ? selectedCardHandler(paymentMethod)
                        : handleMakeDefault(paymentMethod.id)
                    }
                  />
                  <CCIcon ccType={paymentMethod.brand} />
                  <div className="text-center w-40 sm:w-48">
                    <div className="font-shapiro95_super_wide text-lg sm:text-xl mb-1">{`***${paymentMethod.last4}`}</div>
                    <div className="font-shapiro95_super_wide text-xs">
                      Expires {`${paymentMethod.expMonth}/${paymentMethod.expYear}`}
                    </div>
                    {withActiveSubscription && (
                      <Badge variant="black" className="inline-block text-2xs py-2 sm:py-1 mt-2">
                        Linked to
                        <span className="block sm:inline-block mt-1 sm:mt-0">
                          <img
                            src={CrossCourtLogo}
                            alt="crosscourt-logo"
                            className="inline-block w-3 h-3 mb-1 sm:mb-px mr-1 sm:ml-1"
                          />
                          Membership
                        </span>
                      </Badge>
                    )}
                    {isDefault && <div className="text-cc-purple text-xs mt-2">Default</div>}
                  </div>
                  {deleteCardLoading && cardIdToDelete === paymentMethod.id ? (
                    <Spinner />
                  ) : (
                    <Tooltip
                      variant="black"
                      tooltip={
                        "This card can't be deleted because it's associated with your current active membership"
                      }
                      enable={withActiveSubscription}
                    >
                      <button
                        type="button"
                        onClick={() => deleteCardHandler(paymentMethod.id)}
                        className={withActiveSubscription ? 'opacity-50 pointer-events-none' : ''}
                        disabled={withActiveSubscription}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </Tooltip>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="flex items-center justify-between">
        <PrimaryButton onClick={handleAddNewCard} inverted>
          ADD NEW CARD
        </PrimaryButton>
        <PrimaryButton
          disabled={!selectedPaymentMethod}
          onClick={isPaymentFlow ? nextHandler : () => history.push(ROUTES.MYACCOUNT)}
        >
          {`${isPaymentFlow ? 'NEXT' : 'DONE'}`}
        </PrimaryButton>
      </div>
    </div>
  );
};

PaymentMethods.defaultProps = {
  className: '',
};

PaymentMethods.propTypes = {
  availablePaymentMethods: PropTypes.arrayOf(PropTypes.object).isRequired,
  isPaymentFlow: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export default PaymentMethods;
