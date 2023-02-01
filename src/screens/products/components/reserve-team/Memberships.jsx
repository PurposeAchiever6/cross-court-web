import React from 'react';
import PropTypes from 'prop-types';

import { RECURRING, FREE_SESSION } from 'screens/products/constants';
import ReserveTeamProductPlan from './ProductPlan';

const Memberships = ({ onSubmit, availableProducts, activeSubscription, getSubmitText }) => {
  const products = availableProducts.filter((product) => product.name !== FREE_SESSION);
  const membershipProducts = products.filter((product) => product.productType === RECURRING);

  return (
    <div className="lg:flex text-white w-full lg:w-3/4">
      <div className="flex flex-wrap">
        {membershipProducts.map((product) => {
          const isActiveSubscription = product.id === activeSubscription?.product.id;

          return (
            <div key={product.id} className="w-full lg:w-1/3 md:px-4 mb-8">
              <ReserveTeamProductPlan
                product={product}
                submitText={getSubmitText(isActiveSubscription, activeSubscription)}
                submitBtnSecondary={isActiveSubscription}
                handleSubmit={(product) => onSubmit(isActiveSubscription, product)}
              />
            </div>
          );
        })}
      </div>
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
