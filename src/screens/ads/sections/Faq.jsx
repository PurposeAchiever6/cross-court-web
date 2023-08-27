import React from 'react';
import PropTypes from 'prop-types';

import SectionLayout from 'shared/components/layout/SectionLayout';
import FaqList from 'screens/faq/components/FaqList';
import LocationPinSvg from 'shared/components/svg/LocationPinSvg';

const Faq = ({ className }) => {
  const ccAddress = import.meta.env.VITE_CC_ADDRESS;

  return (
    <SectionLayout className={className}>
      <div className="text-center mb-8">
        <LocationPinSvg className="inline-block text-cc-purple w-6 mb-2" />
        <span className="block font-shapiro95_super_wide text-lg mb-1">Location</span>
        <span className="block text-cc-purple">{ccAddress}</span>
      </div>
      <FaqList className="max-w-screen-md mx-auto" showInBatches={3} />
    </SectionLayout>
  );
};

Faq.defaultProps = {
  className: '',
};

Faq.propTypes = {
  className: PropTypes.string,
};

export default Faq;
