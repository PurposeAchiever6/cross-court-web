import React from 'react';
import PropTypes from 'prop-types';

import { RECURRING, FREE_SESSION } from 'screens/products/constants';
import Ball from 'shared/images/white-circular-logo.png';
import ProductPlan from './ProductPlan';

const Memberships = ({ onSubmit, availableProducts, activeSubscription, getSubmitText }) => {
  const products = availableProducts.filter((product) => product.name !== FREE_SESSION);
  const membershipProducts = products.filter((product) => product.productType === RECURRING);

  return (
    <div className="lg:flex text-white w-full lg:w-3/4">
      <div>
        <div className="md:h-44 md:ml-4 mb-10">
          <div className="flex mb-2">
            <h2 className="dharma_gothic_cheavy text-8xl">MEMBERSHIP</h2>
            <img className="w-5 h-5 ml-1 mt-2" src={Ball} alt="Icon" />
          </div>
          <p className="md:w-5/6">
            Heavily discounted subscription feature that automatically refills your sessions monthly
            and gives you access to exclusive CC perks.
          </p>
        </div>
        <div className="flex flex-wrap">
          {membershipProducts.map((product) => {
            const isActiveSubscription = product.id === activeSubscription?.product.id;

            return (
              <div key={product.id} className="w-full lg:w-1/3 md:px-4 mb-8">
                <ProductPlan
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
