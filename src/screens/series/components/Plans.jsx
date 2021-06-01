import React from 'react';
import PropTypes from 'prop-types';

import Ball from 'shared/images/white-circular-logo.png';
import ProductPlan from './ProductPlan';

const FREE_SESSION = 'Free Session';
const ONE_TIME = 'one_time';
const RECURRING = 'recurring';

const Plans = ({
  selectProductHandler,
  cancelMembership,
  availableProducts,
  activeSubscription,
}) => {
  const userHasActiveSubscription = !!activeSubscription;
  const products = availableProducts.filter((product) => product.name !== FREE_SESSION);
  const oneTimeProducts = products.filter((product) => product.productType === ONE_TIME);
  const membershipProducts = products.filter((product) => product.productType === RECURRING);

  return (
    <div className="lg:flex p-4 md:p-12 text-white">
      <div className="lg:w-1/4 lg:pr-8">
        <h2 className="dharma_gothic_cheavy text-8xl mb-4">DROP IN</h2>
        <div className="flex flex-wrap mb-12 lg:mb-0">
          {oneTimeProducts.map((product) => (
            <div key={product.id} className="w-full lg:pr-4 xl:pr-7">
              <ProductPlan
                product={product}
                submitBtnSecondary
                handleSubmit={selectProductHandler}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="lg:w-3/4 lg:pl-8">
        <div className="flex mb-4">
          <h2 className="dharma_gothic_cheavy text-8xl">MEMBERSHIP</h2>
          <img className="w-5 h-5 ml-1 mt-2" src={Ball} alt="Icon" />
        </div>
        <div className="flex flex-wrap justify-between lg:-mx-4 xl:-mx-7">
          {membershipProducts.map((product) => {
            const isActiveSubscription = product.id === activeSubscription?.product.id;

            const submitText = isActiveSubscription
              ? 'Cancel'
              : userHasActiveSubscription
              ? 'Select'
              : 'Join';

            return (
              <div key={product.id} className="w-full lg:w-1/3 lg:px-4 xl:px-7 mb-8">
                <ProductPlan
                  product={product}
                  submitText={submitText}
                  submitBtnSecondary={isActiveSubscription}
                  handleSubmit={isActiveSubscription ? cancelMembership : selectProductHandler}
                />
              </div>
            );
          })}
        </div>
        <div className="flex text-white justify-center lg:justify-end items-center shapiro95_super_wide lg:pr-4">
          <img className="logo" width="25px" height="25px" src={Ball} alt="Icon" />
          <span className="ml-3">Cancel Anytime</span>
        </div>
      </div>
    </div>
  );
};

Plans.defaultProps = {
  activeSubscription: null,
};

Plans.propTypes = {
  selectProductHandler: PropTypes.func.isRequired,
  availableProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeSubscription: PropTypes.object,
  cancelMembership: PropTypes.func.isRequired,
};

export default Plans;
