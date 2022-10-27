import React from 'react';
import PropTypes from 'prop-types';

import { ONE_TIME } from 'screens/products/constants';
import ProductPlan from 'screens/products/components/season-pass/ProductPlan';

const FREE_SESSION = 'Free Session';

const SeasonPass = ({ selectProductHandler, availableProducts }) => {
  const products = availableProducts.filter((product) => product.name !== FREE_SESSION);
  const seasonPassProducts = products.filter(
    (product) => product.productType === ONE_TIME && product.seasonPass
  );

  return (
    <div className="text-white mb-4 md:mb-0">
      <h2 className="dharma_gothic_cheavy text-8xl md:h-44 md:mb-10 md:ml-2">SEASON PASS</h2>
      <div className="flex flex-wrap">
        {seasonPassProducts.map((product) => (
          <div key={product.id} className="md:px-4">
            <ProductPlan submitBtnSecondary product={product} handleSubmit={selectProductHandler} />
          </div>
        ))}
      </div>
    </div>
  );
};

SeasonPass.propTypes = {
  selectProductHandler: PropTypes.func.isRequired,
  availableProducts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default SeasonPass;
