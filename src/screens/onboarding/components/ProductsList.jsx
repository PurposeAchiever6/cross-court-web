import React from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from 'screens/products/utils';
import SelectableBox from 'shared/components/SelectableBox';

const ProductsList = ({ selectProduct, selectedProduct, recurringProducts, dropInProducts }) => (
  <div>
    {recurringProducts.map((product) => (
      <SelectableBox
        key={product.id}
        selected={selectedProduct?.id === product.id}
        onClick={() => selectProduct(product)}
        className="mb-1"
      >
        <div className="sm:flex sm:items-center">
          <div className="mb-4 sm:mb-0 sm:mr-14">
            <h3 className="font-shapiro95_super_wide text-2xl mb-4">{product.name}</h3>
            <p className="text-sm">{product.description}</p>
          </div>
          <div className="flex items-center">
            <span className="font-shapiro95_super_wide sm:font-dharma_gothic_cheavy text-2xl sm:text-9xl mr-1 sm:mr-3">
              {formatPrice(product.price)}
            </span>
            <span>/mo.</span>
          </div>
        </div>
      </SelectableBox>
    ))}
    {dropInProducts.map((product) => (
      <SelectableBox
        key={product.id}
        variant="white"
        selected={selectedProduct?.id === product.id}
        onClick={() => selectProduct(product)}
        className="mb-1"
      >
        <div className="sm:flex sm:items-center">
          <div className="mb-4 sm:mb-0 sm:mr-14">
            <h3 className="font-shapiro95_super_wide text-2xl mb-4">{product.name}</h3>
            <p className="text-sm">{product.description}</p>
          </div>
          <div className="flex items-center">
            <span className="font-shapiro95_super_wide sm:font-dharma_gothic_cheavy text-2xl sm:text-9xl mr-1 sm:mr-3">
              {formatPrice(product.price)}
            </span>
            <span className="whitespace-nowrap">1 day</span>
          </div>
        </div>
      </SelectableBox>
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
