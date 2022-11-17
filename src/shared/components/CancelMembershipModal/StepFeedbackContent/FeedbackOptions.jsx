import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { formatPrice } from 'screens/products/utils';
import { MIN_PRODUCT_CREDITS, UNLIMITED_VALUE } from 'screens/products/constants';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import InputCheckboxField from 'shared/components/InputCheckboxField';
import InputTextareaField from 'shared/components/InputTextareaField';
import ROUTES from 'shared/constants/routes';

export const MANDATORY_DETAILS_REASONS = ['no-time', 'did-not-enjoy', 'other'];

const FeedbackOptions = ({
  onChangeReason,
  reason,
  details,
  setDetails,
  activeSubscription,
  error,
  closeModal,
  products,
  setShowPauseModal,
  className,
}) => {
  const history = useHistory();

  const canDowngrade =
    activeSubscription?.product?.credits > MIN_PRODUCT_CREDITS ||
    activeSubscription?.product?.credits === UNLIMITED_VALUE;

  const purchaseSeasonPassString = (product) =>
    `purchase ${product.credits} session credits for ${formatPrice(
      product.price
    )} (do not expire). Note: Purchasing a Season Pass will automatically cancel your membership at the end of the current billing period.`;

  const downgradeOrPurchaseSeasonPassString = `Did you know you have the ability to ${
    canDowngrade ? 'downgrade or' : ''
  } purchase a package of non-expiring credits?`;

  const downgradeOrPauseOrPurchaseSeasonPassString = `Did you know you have the ability to skip billing cycles, ${
    canDowngrade ? 'downgrade your membership,' : ''
  } or purchase a package of non-expiring credits?`;

  const handleBuySeasonPass = () => {
    closeModal();
    history.push({
      pathname: ROUTES.MEMBERSHIPS,
      state: { comesFromCancelModal: true },
    });
  };

  const seasonPassProducts = products.filter((product) => product?.seasonPass);

  const buySeasonPassOptions = (
    <>
      {seasonPassProducts.map((product) => (
        <div key={product.id} className="flex items-center mt-2">
          <PrimaryButton w="5rem" px="0px" py="0px" fontSize="11px" onClick={handleBuySeasonPass}>
            SELECT
          </PrimaryButton>
          <p className="ml-2 first-letter:capitalize">{purchaseSeasonPassString(product)}</p>
        </div>
      ))}
    </>
  );

  const downgradeOption = canDowngrade && (
    <div className="flex items-center mt-2">
      <PrimaryButton w="5rem" px="0px" py="0px" fontSize="11px" to={ROUTES.MEMBERSHIPS}>
        SELECT
      </PrimaryButton>
      <p className="ml-2">Downgrade membership</p>
    </div>
  );

  const onPauseClick = () => {
    closeModal();
    setShowPauseModal(true);
  };

  return (
    <div className={className}>
      <div className="flex flex-col">
        <InputCheckboxField
          name="too-expensive"
          variant="cc-ball"
          onChange={onChangeReason}
          value={reason === 'too-expensive'}
          className="mb-2"
          formik={false}
        >
          Crosscourt is too expensive
        </InputCheckboxField>
        {reason === 'too-expensive' && (
          <div className="ml-10 text-xs">
            <p>{downgradeOrPurchaseSeasonPassString}</p>
            {downgradeOption}
            {buySeasonPassOptions}
            <InputTextareaField
              placeholder="Tell us more... (optional)"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={6}
              className="my-2"
              formik={false}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <InputCheckboxField
          name="recurring-subscription"
          variant="cc-ball"
          onChange={onChangeReason}
          value={reason === 'recurring-subscription'}
          className="mb-2"
          formik={false}
        >
          I don't want a recurring subscription
        </InputCheckboxField>
        {reason === 'recurring-subscription' && (
          <div className="ml-10 text-xs">
            <p>
              Did you know you have the ability to purchase a package of non-expiring session
              credits?
            </p>
            {buySeasonPassOptions}
            <InputTextareaField
              placeholder="Tell us more... (optional)"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={6}
              className="my-2"
              formik={false}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <InputCheckboxField
          name="moving"
          variant="cc-ball"
          onChange={onChangeReason}
          value={reason === 'moving'}
          className="mb-2"
          formik={false}
        >
          Moved / Moving
        </InputCheckboxField>
        {reason === 'moving' && (
          <div className="ml-10 text-xs">
            <p>
              Please send a utility bill with your new address on it to{' '}
              <a href="mailto:ccteam@cross-court.com">ccteam@cross-court.com</a>.
            </p>
            <InputTextareaField
              placeholder="Tell us more... (optional)"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={6}
              className="my-2"
              formik={false}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <InputCheckboxField
          name="live-far"
          variant="cc-ball"
          onChange={onChangeReason}
          value={reason === 'live-far'}
          className="mb-2"
          formik={false}
        >
          Live too far away
        </InputCheckboxField>
        {reason === 'live-far' && (
          <div className="ml-10 text-xs">
            <p>{downgradeOrPauseOrPurchaseSeasonPassString}</p>
            {downgradeOption}
            <div className="flex items-center mt-2">
              <PrimaryButton w="5rem" px="0px" py="0px" fontSize="11px" onClick={onPauseClick}>
                SELECT
              </PrimaryButton>
              <p className="ml-2">Pause my membership for 1 or 2 months</p>
            </div>
            {buySeasonPassOptions}
            <InputTextareaField
              placeholder="Tell us more... (optional)"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={6}
              className="my-2"
              formik={false}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <InputCheckboxField
          name="injury"
          variant="cc-ball"
          onChange={onChangeReason}
          value={reason === 'injury'}
          className="mb-2"
          formik={false}
        >
          Injury
        </InputCheckboxField>
        {reason === 'injury' && (
          <div className="ml-10 text-xs">
            <p>
              If your injury isn't severe, you may be better off pausing your membership to avoid
              getting billed for another month.
            </p>
            <div className="flex items-center mt-2">
              <PrimaryButton w="5rem" px="0px" py="0px" fontSize="11px" onClick={onPauseClick}>
                SELECT
              </PrimaryButton>
              <p className="ml-2">Pause my membership for 1 or 2 months</p>
            </div>
            <InputTextareaField
              placeholder="Tell us more... (optional)"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={6}
              className="my-2"
              formik={false}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <InputCheckboxField
          name="no-time"
          variant="cc-ball"
          onChange={onChangeReason}
          value={reason === 'no-time'}
          className="mb-2"
          formik={false}
        >
          Don't have time
        </InputCheckboxField>
        {reason === 'no-time' && (
          <div className="ml-10 text-xs">
            <p>{downgradeOrPauseOrPurchaseSeasonPassString}</p>
            {downgradeOption}
            {buySeasonPassOptions}
            <InputTextareaField
              placeholder="What times on which days work better for your schedule?"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={6}
              hint="Please include at least 20 characters"
              error={error === 'no-time'}
              className="my-2"
              formik={false}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <InputCheckboxField
          name="did-not-know-is-subscription"
          variant="cc-ball"
          onChange={onChangeReason}
          value={reason === 'did-not-know-is-subscription'}
          className="mb-2"
          formik={false}
        >
          Didn't know I signed up for a membership
        </InputCheckboxField>
        {reason === 'did-not-know-is-subscription' && (
          <div className="ml-10 mb-4 text-xs">
            <p>
              Sorry if we didn't make it clear! Please email us at{' '}
              <a href="mailto:ccteam@cross-court.com">ccteam@cross-court.com</a> with any concerns!
              Would you prefer our "Season Pass" option below?
            </p>
            {buySeasonPassOptions}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <InputCheckboxField
          name="did-not-enjoy"
          variant="cc-ball"
          onChange={onChangeReason}
          value={reason === 'did-not-enjoy'}
          className="mb-2"
          formik={false}
        >
          Didn't enjoy the experience
        </InputCheckboxField>
        {reason === 'did-not-enjoy' && (
          <InputTextareaField
            placeholder="What did you not like about Crosscourt?"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={6}
            hint="Please include at least 20 characters"
            error={error === 'did-not-enjoy'}
            className="my-2 ml-10 text-xs"
            formik={false}
          />
        )}
      </div>
      <div className="flex flex-col">
        <InputCheckboxField
          name="other"
          variant="cc-ball"
          onChange={onChangeReason}
          value={reason === 'other'}
          className="mb-2"
          formik={false}
        >
          Other
        </InputCheckboxField>
        {reason === 'other' && (
          <InputTextareaField
            placeholder="What is your main reason for cancelling?"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={6}
            hint="Please include at least 20 characters"
            error={error === 'other'}
            className="my-2 ml-10 text-xs"
            formik={false}
          />
        )}
      </div>
    </div>
  );
};

export default FeedbackOptions;

FeedbackOptions.defaultProps = {
  activeSubscription: null,
  reason: null,
  details: null,
  error: null,
  className: '',
};

FeedbackOptions.propTypes = {
  onChangeReason: PropTypes.func.isRequired,
  reason: PropTypes.string,
  details: PropTypes.string,
  setDetails: PropTypes.func.isRequired,
  activeSubscription: PropTypes.shape(),
  error: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setShowPauseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};
