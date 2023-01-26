import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import { deleteCard } from 'screens/payment-methods/actionCreators';
import { getUserProfile } from 'screens/my-account/reducer';
import { getDeleteCardLoading } from 'screens/payment-methods/reducer';
import CrossCourtLogo from 'shared/images/logos/cc-white.png';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import CCIcon from 'shared/components/CCIcon';
import Badge from 'shared/components/Badge';
import Spinner from 'shared/components/Spinner';
import Tooltip from 'shared/components/Tooltip';

const PaymentMethods = ({
  title,
  subtitle,
  submitBtnText,
  showDefault,
  showActiveSubscription,
  selectedPaymentMethod,
  availablePaymentMethods,
  onSelectCard,
  onSubmitBtn,
  loading,
  className,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const userInfo = useSelector(getUserProfile);
  const deleteCardLoading = useSelector(getDeleteCardLoading);
  const { defaultPaymentMethod } = userInfo;

  const [cardIdToDelete, setCardIdToDelete] = useState(null);

  const selectCardHandler = (paymentMethod) => {
    onSelectCard(paymentMethod);
  };

  const deleteCardHandler = (paymentMethod) => {
    setCardIdToDelete(paymentMethod.id);
    dispatch(deleteCard(paymentMethod.id));
  };

  const addNewCardHandler = () => {
    history.push({
      pathname: ROUTES.PAYMENT_METHODS_ADD,
      state: {
        redirectTo: location.pathname,
      },
    });
  };

  return (
    <div className={className}>
      <div className="text-center mb-8">
        <h2 className="font-shapiro95_super_wide text-lg uppercase">{title}</h2>
        {subtitle && <h3 className="mt-1">{subtitle}</h3>}
      </div>
      <div className="border-4 border-cc-purple mb-10">
        {availablePaymentMethods.length === 0 ? (
          <div className="min-h-60 flex items-center justify-center p-10">
            There are no payment methods added yet.
          </div>
        ) : (
          availablePaymentMethods.map((paymentMethod) => {
            const isCardSelected = selectedPaymentMethod?.id === paymentMethod.id;
            const isDefault = showDefault && defaultPaymentMethod?.id === paymentMethod.id;
            const withActiveSubscription =
              showActiveSubscription && paymentMethod.withActiveSubscription;

            return (
              <div
                key={paymentMethod.id}
                className={`border-b-2 last:border-0 p-4 ${
                  loading ? 'pointer-events-none opacity-40' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-x-4 sm:gap-x-10">
                  <button
                    className={`border-2 rounded-full min-w-10 h-10 selector ${
                      isCardSelected ? 'animate-spin-slow bg-cc-ball-logo bg-contain' : ''
                    }`}
                    type="button"
                    onClick={() => selectCardHandler(paymentMethod)}
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
                        onClick={() => deleteCardHandler(paymentMethod)}
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
        <PrimaryButton onClick={addNewCardHandler} inverted>
          Add New Card
        </PrimaryButton>
        <PrimaryButton disabled={!selectedPaymentMethod} onClick={onSubmitBtn}>
          {submitBtnText}
        </PrimaryButton>
      </div>
    </div>
  );
};

PaymentMethods.defaultProps = {
  subtitle: null,
  showDefault: true,
  showActiveSubscription: true,
  loading: false,
  className: '',
};

PaymentMethods.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  showDefault: PropTypes.bool,
  showActiveSubscription: PropTypes.bool,
  availablePaymentMethods: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  submitBtnText: PropTypes.string.isRequired,
  onSelectCard: PropTypes.func.isRequired,
  onSubmitBtn: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  className: PropTypes.string,
};

export default PaymentMethods;
