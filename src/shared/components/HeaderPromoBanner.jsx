import React from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { titleize } from 'shared/utils/helpers';
import { formatPrice } from 'screens/products/utils';
import { discountAmountText, discountTimeText } from 'screens/promo-codes/utils';
import { getFeaturedRecurringProductPromoCode } from 'screens/products/reducer';
import PageLayout from 'shared/components/layout/PageLayout';
import SectionLayout from 'shared/components/layout/SectionLayout';
import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';
import roughDarkBgImg from 'shared/images/backgrounds/rough-dark.jpeg';
import CrossSvg from 'shared/components/svg/CrossSvg';

const HeaderPromoBanner = ({ onClose }) => {
  const promoCode = useSelector(getFeaturedRecurringProductPromoCode);

  const discountProductText = `Special offer: ${formatPrice(
    promoCode.discountedPrice
  )} ${discountTimeText(promoCode)} with ${titleize(promoCode.product.name)}`;

  return (
    <PageLayout noPadding>
      <LazyBackgroundImage img={roughDarkBgImg} className="z-10">
        <SectionLayout
          as="div"
          className="animate-highlight-purple-twice relative bg-cc-purple-700 bg-opacity-60 flex flex-col sm:flex-row justify-center items-center h-16 sm:h-10"
        >
          <div
            onClick={onClose}
            className="absolute inset-y-0 right-0 bg-black bg-opacity-70 hover:bg-opacity-80 transition-all w-12 sm:w-10 flex justify-center items-center cursor-pointer"
          >
            <CrossSvg className="w-3" />
          </div>
          <span className="font-shapiro95_super_wide uppercase text-sm sm:text-base mr-3">
            {`${discountAmountText(promoCode)} off`}
          </span>
          <span className="text-center text-2xs sm:text-xs pr-10 sm:pr-0">
            {discountProductText}
          </span>
        </SectionLayout>
      </LazyBackgroundImage>
    </PageLayout>
  );
};

HeaderPromoBanner.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default HeaderPromoBanner;
