import React from 'react';
import PropTypes from 'prop-types';

import { RECURRING } from 'screens/products/constants';
import Ball from 'shared/images/white-circular-logo.png';
import ProductPlan from './ProductPlan';

const FREE_SESSION = 'Free Session';

const getSubmitText = (isActiveSubscription, activeSubscription) => {
  if (isActiveSubscription) {
    return activeSubscription.canceled ? 'Reactivate' : 'Cancel';
  } else {
    return activeSubscription ? 'Select' : 'Join';
  }
};

const Memberships = ({
  selectProductHandler,
  cancelMembership,
  reactivateMembership,
  availableProducts,
  activeSubscription,
}) => {
  const products = availableProducts.filter((product) => product.name !== FREE_SESSION);
  const membershipProducts = products.filter((product) => product.productType === RECURRING);

  const onSubmit = (isActiveSubscription, product) => {
    if (isActiveSubscription) {
      activeSubscription.canceled ? reactivateMembership() : cancelMembership();
    } else {
      selectProductHandler(product);
    }
  };

  return (
    <div className="lg:flex lg:justify-center p-4 md:p-12 text-white">
      <div className="lg:w-3/4">
        <div className="flex mb-4">
          <h2 className="dharma_gothic_cheavy text-8xl">MEMBERSHIP</h2>
          <img className="w-5 h-5 ml-1 mt-2" src={Ball} alt="Icon" />
        </div>
        <p>
          Heavily discounted subscription feature that automatically refills your sessions monthly
          and gives you access to exclusive CC perks.
        </p>
        <div className="flex flex-wrap justify-between mt-10 lg:mt-16">
          {membershipProducts.map((product) => {
            const isActiveSubscription = product.id === activeSubscription?.product.id;

            return (
              <div key={product.id} className="w-full lg:w-1/3 lg:px-4 xl:px-7 mb-8">
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
  selectProductHandler: PropTypes.func.isRequired,
  availableProducts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  activeSubscription: PropTypes.shape(),
  cancelMembership: PropTypes.func.isRequired,
  reactivateMembership: PropTypes.func.isRequired,
};

export default Memberships;
