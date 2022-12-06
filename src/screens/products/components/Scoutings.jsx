import React from 'react';
import PropTypes from 'prop-types';

import ProductPlan from 'screens/products/components/ProductPlan';

const Scoutings = ({ selectProductHandler, availableProducts }) => {
  const products = availableProducts.filter((product) => product.scouting);

  return (
    <div className="text-white w-full">
      <h1 className="dharma_gothic_cheavy text-8xl text-center uppercase mb-8">
        Player Evaluation
      </h1>
      <div className="flex flex-wrap justify-center lg:-mx-4 mb-2 lg:mb-14">
        {products.map((product) => (
          <div key={product.id} className="w-full lg:w-1/4 lg:px-4 mb-8 lg:mb-0">
            <ProductPlan product={product} handleSubmit={selectProductHandler} />
          </div>
        ))}
      </div>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-shapiro96_inclined_wide uppercase sm:text-center mb-4 sm:mb-2">
          Can Be Applied To Any Session
        </h2>
        <p className="sm:text-center sm:text-lg">
          Once a <span className="uppercase text-cc-purple">player evaluation</span> is purchased,
          you will see a <span className="uppercase text-cc-purple">use evaluation credit</span>{' '}
          option during the session booking flow on the{' '}
          <span className="uppercase text-cc-purple">confirm reservation</span> page.
        </p>
      </div>
    </div>
  );
};

Scoutings.propTypes = {
  selectProductHandler: PropTypes.func.isRequired,
  availableProducts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Scoutings;
