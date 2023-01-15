import React from 'react';
import PropTypes from 'prop-types';

import ProductPlan from 'screens/products/components/ProductPlan';
import { dropInProducts } from 'screens/products/utils';

const DropIns = ({ selectProductHandler, availableProducts }) => {
  const products = dropInProducts(availableProducts);

  return (
    <div className="text-white w-full lg:w-1/4 mb-6 lg:mb-0">
      <h2 className="dharma_gothic_cheavy text-8xl lg:h-44 lg:mb-10 lg:ml-2">DROP IN</h2>
      {products.map((product) => (
        <div key={product.id} className="w-full lg:px-4">
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
