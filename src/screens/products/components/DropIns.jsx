import React from 'react';
import PropTypes from 'prop-types';

import { ONE_TIME } from 'screens/products/constants';
import ProductPlan from './ProductPlan';

const FREE_SESSION = 'Free Session';

const DropIns = ({ selectProductHandler, availableProducts, activeSubscription }) => {
  const userHasActiveSubscription = !!activeSubscription;
  const products = availableProducts.filter((product) => product.name !== FREE_SESSION);
  const oneTimeProducts = products.filter((product) => product.productType === ONE_TIME);

  return (
    <div className="lg:flex lg:justify-center p-4 md:p-12 text-white">
      <div className="lg:w-1/4 lg:pr-8">
        <h2 className="dharma_gothic_cheavy text-8xl mb-4">DROP IN</h2>
        <div className="flex flex-wrap mb-12 lg:mb-0">
          {oneTimeProducts.map((product) => (
            <div key={product.id} className="w-full lg:pr-4 xl:pr-7">
              <ProductPlan
                product={product}
                submitBtnSecondary
                handleSubmit={selectProductHandler}
                userHasActiveSubscription={userHasActiveSubscription}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

DropIns.defaultProps = {
  activeSubscription: null,
};

DropIns.propTypes = {
  selectProductHandler: PropTypes.func.isRequired,
  availableProducts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  activeSubscription: PropTypes.shape(),
};

export default DropIns;
