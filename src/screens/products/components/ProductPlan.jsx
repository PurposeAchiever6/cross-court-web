import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { getUserProfile } from 'screens/my-account/reducer';
import { RECURRING } from 'screens/products/constants';
import { formatPrice } from 'screens/products/utils';
import Button from 'shared/components/Button';
import LineDashedSvg from 'shared/components/svg/LineDashedSvg';
import { isForever } from 'screens/promo-codes/utils';
import { pluralize } from 'shared/utils/helpers';

const ProductPlan = ({
  product,
  submitText,
  submitBtnSecondary,
  handleSubmit,
  showFeatures,
  className,
}) => {
  const currentUser = useSelector(getUserProfile);

  const {
    label,
    seasonPass,
    priceForUser,
    productType,
    name,
    description,
    highlighted,
    promoCode,
    trial,
    credits,
    creditsExpirationDays,
  } = product;

  const price = formatPrice(priceForUser);

  const isRecurring = productType === RECURRING;

  const showPromoCode = !trial && promoCode && !currentUser.activeSubscription;

  const discountText = (() => {
    if (!promoCode) return;

    const discountPrice = formatPrice(promoCode.discountedPrice);

    if (isForever(promoCode)) {
      return `${discountPrice} forever`;
    }

    if (promoCode.durationInMonths === 1) {
      return `1st month for ${discountPrice}`;
    }

    return `First ${promoCode.durationInMonths} months for ${discountPrice}`;
  })();

  const creditsText = (() => {
    if (isRecurring) {
      return '/mo.';
    }

    if (trial) {
      return `${credits} for 1 Day Pass. Expires in ${creditsExpirationDays} days.`;
    }

    return `${credits} ${pluralize('Credit', Number(credits))}`;
  })();

  const planClassName = (() => {
    if (highlighted) {
      return 'bg-cc-blue-300 text-white';
    }

    if (trial) {
      return 'bg-white text-black';
    }

    return 'bg-cc-blue-900 text-white';
  })();

  const labelClassName = (() => {
    if (highlighted) {
      return 'bg-cream bg-opacity-100 text-black';
    }

    if (trial) {
      return 'bg-black text-white';
    }

    return 'bg-cream bg-opacity-25 text-white';
  })();

  return (
    <div
      className={`relative min-h-[34em] p-4 md:px-10 ${label ? 'pt-10' : ''} md:pt-16 ${
        showPromoCode ? 'md:pb-8' : 'md:pb-10'
      } ${planClassName} text-white text-center transform lg:hover:scale-105 transition-transform duration-300 ${className}`}
    >
      <h2 className="inline-block mb-5 lg:h-14 text-2xl font-shapiro95_super_wide uppercase">
        {name}
      </h2>
      <div>
        <div className="mb-3 lg:mb-5 flex flex-col">
          <span className="font-dharma_gothic_cheavy text-10xl">{price}</span>
          <span className="text-sm">{creditsText}</span>
        </div>
        {seasonPass && showFeatures && (
          <div className="text-xs font-shapiro96_inclined_wide text-left uppercase my-4 p-2">
            <div className="mb-4">Does not expire</div>
            <div className="mb-4">Excludes membership perks such as:</div>
            <div className=" text-cc-purple">
              <div className="mb-1">Office Hours</div>
              <div className="mb-1">Highlights</div>
              <div className="mb-1">Free jersey rental</div>
              <div>SKLZ</div>
            </div>
          </div>
        )}
        <Button
          variant={submitBtnSecondary ? 'outline-purple' : 'purple'}
          onClick={() => handleSubmit(product)}
          className="w-full mb-6"
        >
          {submitText}
        </Button>
        {description && <p className="text-xs h-24 md:h-30 text-left">{description}</p>}
        {showPromoCode && (
          <>
            <LineDashedSvg className="text-cc-purple mb-4" />
            <span className="block text-white text-sm">{discountText}</span>
            {promoCode.onlyForNewMembers && (
              <span className="block text-white/60 text-sm mt-2">New Members Only</span>
            )}
            {promoCode.userMaxCheckedInSessions === 0 && (
              <span className="block text-white/60 text-sm mt-2">
                Expires after your first session
              </span>
            )}
            <LineDashedSvg className="text-cc-purple mt-4" />
          </>
        )}
        {trial && (
          <>
            <LineDashedSvg className="text-cc-purple mb-4" />
            <span className="block mb-1">Get $45 off your first month</span>
            <span className="block opacity-60 text-sm">
              Buy membership within 7 days post-trial.
            </span>
            <LineDashedSvg className="text-cc-purple mt-4" />
          </>
        )}
      </div>
      {label && (
        <div
          className={`lg:block text-xs absolute px-4 inset-x-0 mx-auto top-0 w-max ${labelClassName} shapiro95_super_wide py-1 uppercase`}
        >
          {label}
        </div>
      )}
    </div>
  );
};

ProductPlan.defaultProps = {
  className: '',
  submitText: 'Buy',
  submitBtnSecondary: false,
  showFeatures: true,
};

ProductPlan.propTypes = {
  className: PropTypes.string,
  submitText: PropTypes.string,
  submitBtnSecondary: PropTypes.bool,
  product: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  showFeatures: PropTypes.bool,
};

export default ProductPlan;
