import React from 'react';
import PropTypes from 'prop-types';

import Product from 'screens/onboarding/components/Product';

const ProductsList = ({ selectProduct, selectedProduct, recurringProducts, dropInProducts }) => (
  <div>
    {recurringProducts.map((product) => (
      <Product
        key={product.id}
        product={product}
        selectProduct={selectProduct}
        selectedProduct={selectedProduct}
        className="mb-1"
      />
    ))}
    {dropInProducts.map((product) => (
      <Product
        key={product.id}
        product={product}
        selectProduct={selectProduct}
        selectedProduct={selectedProduct}
        className="mb-1"
      />
    ))}
  </div>
);

ProductsList.defaultProps = {
  selectedProduct: null,
};

ProductsList.propTypes = {
  selectProduct: PropTypes.func.isRequired,
  recurringProducts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dropInProducts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectedProduct: PropTypes.shape(),
};

export default ProductsList;
