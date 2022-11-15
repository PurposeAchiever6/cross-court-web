import React from 'react';
import PropTypes from 'prop-types';

import ProductPlan from 'screens/products/components/ProductPlan';

const SeasonPass = ({ selectProductHandler, availableProducts }) => {
  const products = availableProducts.filter((product) => product.seasonPass);

  return (
    <div className="text-white w-full">
      <h1 className="dharma_gothic_cheavy text-8xl text-center uppercase mb-8">Season Pass</h1>
      <div className="flex flex-wrap justify-center lg:-mx-4">
        {products.map((product) => (
          <div key={product.id} className="w-full lg:w-1/4 lg:px-4 mb-8 lg:mb-0">
            <ProductPlan product={product} handleSubmit={selectProductHandler} />
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
