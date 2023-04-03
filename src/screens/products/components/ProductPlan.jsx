import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { getUserProfile } from 'screens/my-account/reducer';
import { ONE_TIME, RECURRING, UNLIMITED_VALUE } from 'screens/products/constants';
import { productDiscount, creditsString, formatPrice } from 'screens/products/utils';
import Button from 'shared/components/Button';
import { pluralize } from 'shared/utils/helpers';
import Accordion from 'shared/components/Accordion';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import useWindowSize from 'shared/hooks/useWindowSize';
import { size as breakpoints } from 'shared/styles/mediaQueries';

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
    credits,
    skillSessionCredits,
    priceForUser,
    productType,
    name,
    maxRolloverCredits,
    freePausesPerYear,
    scouting,
    description,
    highlights,
    waitlistPriority,
    freeJerseyRental,
    freeTowelRental,
    highlighted,
  } = product;

  const isDropIn = product.productType === ONE_TIME && !seasonPass && !scouting;
  const isUnlimited = credits === UNLIMITED_VALUE;
  const sessionsCreditsString = creditsString(credits);
  const skillSessionCreditsString = creditsString(skillSessionCredits);

  const price = formatPrice(priceForUser);

  const isRecurring = productType === RECURRING;
  const { discountPercentage, discountReason } = productDiscount(product, currentUser);

  const { width: windowSize } = useWindowSize();
  const isDesktop = windowSize >= breakpoints.desktop;

  let freeRental = [];
  freeJerseyRental && (freeRental = [...freeRental, 'Jersey']);
  freeTowelRental && (freeRental = [...freeRental, 'Towel']);

  return (
    <div
      className={`relative ${
        highlighted ? 'bg-cc-blue-300' : 'bg-cc-blue-900'
      } text-white text-center transform lg:hover:scale-105 transition-transform duration-300 pt-10 ${className}`}
    >
      <div className="inline-block mb-5 lg:h-14">
        <h2 className="text-2xl font-shapiro95_super_wide uppercase">{name}</h2>
        <span className="uppercase text-sm">{isDropIn && 'One-Time Session'}</span>
      </div>
      <div>
        <div className="mb-3 lg:mb-5 flex flex-col">
          <span className="font-dharma_gothic_cheavy text-10xl">{price}</span>
          <span className="uppercase text-sm">{isRecurring ? '/ Month' : '1 Credit'}</span>
        </div>
        {discountPercentage > 0 && (
          <div className="shapiro95_super_wide bg-cc-purple text-cc-black text-xs my-4 p-2">
            {`${discountPercentage}% discount for ${discountReason}`}
          </div>
        )}
        {seasonPass && showFeatures && (
          <div className="text-xs font-shapiro96_inclined_wide text-left uppercase my-4 p-2">
            <div className="mb-4">Does not expire</div>
            <div className="mb-4">Excludes membership perks such as:</div>
            <div className=" text-cc-purple">
              <div className="mb-1">Open Club</div>
              <div className="mb-1">Highlights</div>
              <div className="mb-1">Free jersey rental</div>
              <div>SKLZ</div>
            </div>
          </div>
        )}
        <Button
          variant={submitBtnSecondary ? 'outline-purple' : 'purple'}
          onClick={() => handleSubmit(product)}
          className="min-w-[9rem] mb-6"
        >
          {submitText}
        </Button>
        <p className="text-xs h-24 md:h-30 md:text-left px-4">{description}</p>
        {isRecurring && showFeatures && (
          <Accordion
            title={isDesktop ? undefined : 'VIEW DETAILS'}
            titleContainerClassName="font-shapiro95_super_wide my-2 text-left"
            collapsable={!isDesktop}
            className={`px-2 py-4 lg:py-1 lg:h-64 ${
              highlighted ? '!bg-cc-blue-100' : '!bg-cc-blue-700'
            } border-t-2 border-black md:border-0`}
            icon={isDesktop ? undefined : faChevronDown}
            iconRotationDegrees={isDesktop ? undefined : 180}
          >
            <ul className="text-xs text-left marker:text-cc-purple marker:text-sm list-outside list-disc ml-6">
              <li>
                {sessionsCreditsString} Credits (refill monthly). Can be used for SESSIONS or SKLZ
              </li>
              {highlights && <li className="mt-2">Highlights</li>}
              {freeRental.length > 0 && (
                <li className="mt-2">Free {`${freeRental.join(' & ')}`} Rental</li>
              )}
              {!isUnlimited && (
                <li className="mt-2">
                  {maxRolloverCredits} Rollover {pluralize('Credit', maxRolloverCredits)}
                </li>
              )}
              {waitlistPriority && <li className="mt-2">{waitlistPriority} Waitlist Priority</li>}
              {skillSessionCredits > 0 && (
                <li className="mt-2">
                  {skillSessionCreditsString} SKLZ {pluralize('Session', skillSessionCredits)} Per
                  Month
                </li>
              )}
              {freePausesPerYear > 0 && (
                <li className="mt-2">
                  {freePausesPerYear} {pluralize('Month', freePausesPerYear)} Free Membership Freeze
                </li>
              )}
              <li className="mt-2">PLUS Memberships Perks below</li>
            </ul>
          </Accordion>
        )}
      </div>
      {label && (
        <div
          className={`lg:block text-xs absolute px-4 right-0 top-0 bg-cream ${
            highlighted ? 'bg-opacity-100 text-black' : 'bg-opacity-25 text-white'
          } shapiro95_super_wide py-1 uppercase`}
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
