import React from 'react';

import PropTypes from 'prop-types';

import PageLayout from 'shared/components/layout/PageLayout';
import SectionLayout from 'shared/components/layout/SectionLayout';
import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';
import roughDarkBgImg from 'shared/images/backgrounds/rough-dark.jpeg';
import CrossSvg from 'shared/components/svg/CrossSvg';

const HeaderPromoBanner = ({ onClose }) => {
  const promoCode = import.meta.env.VITE_FIRST_TIMER_PROMO_CODE;
  const percentageDiscount = import.meta.env.VITE_FIRST_TIMER_PROMO_CODE_PERCENTAGE_DISCOUNT;

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
            <CrossSvg color="white" className="w-3" />
          </div>
          <span className="font-shapiro95_super_wide uppercase text-sm sm:text-base sm:mt-1 mr-3">
            {percentageDiscount}% off
          </span>
          <span className="text-center text-2xs sm:text-xs sm:mt-1  pr-10 sm:pr-0">
            Use code {promoCode} for {percentageDiscount}% off your first month.
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
