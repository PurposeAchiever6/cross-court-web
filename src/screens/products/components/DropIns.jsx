import React from 'react';
import PropTypes from 'prop-types';

import { ONE_TIME } from 'screens/products/constants';
import ProductPlan from './ProductPlan';

const FREE_SESSION = 'Free Session';

const DropIns = ({ selectProductHandler, availableProducts }) => {
  const products = availableProducts.filter((product) => product.name !== FREE_SESSION);
  const oneTimeProducts = products.filter((product) => product.productType === ONE_TIME);

  return (
    <div className="text-white w-full lg:w-1/4 mb-4 md:mb-0">
      <h2 className="dharma_gothic_cheavy text-8xl md:h-44 md:mb-10 md:ml-2">DROP IN</h2>
      {oneTimeProducts.map((product) => (
        <div key={product.id} className="w-full md:px-4">
          <ProductPlan product={product} submitBtnSecondary handleSubmit={selectProductHandler} />
        </div>
      ))}
    </div>
  );
};

DropIns.propTypes = {
  selectProductHandler: PropTypes.func.isRequired,
  availableProducts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default DropIns;
