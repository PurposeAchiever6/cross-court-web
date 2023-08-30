import React from 'react';
import PropTypes from 'prop-types';

import ProductPlan from './ProductPlan';

const Trials = ({ onSubmit, availableProducts, activeSubscription, getSubmitText }) => (
  <>
    {availableProducts.map((product) => {
      const isActiveSubscription = product.id === activeSubscription?.product.id;

      return (
        <div key={product.id} className="w-full mb-6 lg:mb-0">
          <ProductPlan
            product={product}
            submitText={getSubmitText(isActiveSubscription, activeSubscription, product)}
            submitBtnSecondary={isActiveSubscription}
            handleSubmit={(product) => onSubmit(isActiveSubscription, product)}
          />
        </div>
      );
    })}
  </>
);

Trials.defaultProps = {
  activeSubscription: null,
};

Trials.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  availableProducts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  activeSubscription: PropTypes.shape(),
  getSubmitText: PropTypes.func.isRequired,
};

export default Trials;
