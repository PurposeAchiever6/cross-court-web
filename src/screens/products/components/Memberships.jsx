import React from 'react';
import PropTypes from 'prop-types';

import { RECURRING, FREE_SESSION } from 'screens/products/constants';
import ProductPlan from './ProductPlan';

const Memberships = ({ onSubmit, availableProducts, activeSubscription, getSubmitText }) => {
  const products = availableProducts.filter((product) => product.name !== FREE_SESSION);
  const membershipProducts = products.filter((product) => product.productType === RECURRING);

  return (
    <div className="flex flex-wrap items-end lg:-mx-6">
      {membershipProducts.map((product) => {
        const isActiveSubscription = product.id === activeSubscription?.product.id;

        return (
          <div key={product.id} className="w-full lg:w-1/3 lg:px-6 shrink-0 mb-6 lg:mb-0">
            <ProductPlan
              product={product}
              submitText={getSubmitText(isActiveSubscription, activeSubscription, product)}
              submitBtnSecondary={isActiveSubscription}
              handleSubmit={(product) => onSubmit(isActiveSubscription, product)}
            />
          </div>
        );
      })}
    </div>
  );
};

Memberships.defaultProps = {
  activeSubscription: null,
};

Memberships.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  availableProducts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  activeSubscription: PropTypes.shape(),
  getSubmitText: PropTypes.func.isRequired,
};

export default Memberships;
