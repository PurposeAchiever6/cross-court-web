import React from 'react';
import PropTypes from 'prop-types';

import { dropInProducts, formatPrice } from 'screens/products/utils';
import { pluralize } from 'shared/utils/helpers';
import Button from 'shared/components/Button';

const DropIns = ({ selectProductHandler, availableProducts }) => {
  const products = dropInProducts(availableProducts);

  return (
    <div className="text-white mt-2 mb-4 md:my-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-cc-blue-700 md:flex md:gap-6 md:justify-center p-4 md:py-8 md:px-10"
        >
          <span className="block font-shapiro95_super_wide text-xl mb-4 md:mb-0">
            {product.name}
          </span>
          <span className="block max-w-lg text-sm mb-4 md:mb-0">
            {product.credits} {pluralize('credit', product.credits)} to use on any experience plus
            access to Office Hours. No membership perks. Expires in 30 days. Does not renew.
          </span>
          <Button onClick={() => selectProductHandler(product)} className="h-max">
            Buy - {formatPrice(product.priceForUser)}
          </Button>
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
