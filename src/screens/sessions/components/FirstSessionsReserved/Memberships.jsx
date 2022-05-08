import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import { startedCheckout } from 'shared/utils/activeCampaign';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import { RECURRING } from 'screens/products/constants';
import {
  initialLoad as loadAvailableProducts,
  setSelectedProduct,
} from 'screens/products/actionCreators';
import { getAvailableProducts } from 'screens/products/reducer';
import ToggleButton from 'shared/components/ToggleButton';
import ProductPlan from 'screens/products/components/ProductPlan';

const Memberships = ({ className }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(getIsAuthenticated);
  const userProfile = useSelector(getUserProfile);
  const products = useSelector(getAvailableProducts);

  const [applyDiscount, setApplyDiscount] = useState(false);

  const membershipProducts = products
    .filter((product) => product.productType === RECURRING)
    .map((product) => (applyDiscount ? { ...product, price: product.price * 0.25 } : product));

  const joinMembershipHandler = (product) => {
    dispatch(
      setSelectedProduct(products.find((currentProduct) => currentProduct.id === product.id))
    );

    if (isAuthenticated) {
      startedCheckout({ email: userProfile.email, product });
    }

    history.push(ROUTES.PAYMENT_METHODS_SELECT);
  };

  useEffect(() => {
    dispatch(loadAvailableProducts());
  }, [dispatch]);

  return (
    <div className={className}>
      <div className="text-center mb-6 lg:mb-16">
        <ToggleButton
          onLabel="With 75% Off"
          offLabel="Standard Pricing"
          size="4xl"
          value={applyDiscount}
          onChange={setApplyDiscount}
          className="uppercase text-xs sm:text-sm md:text-xl"
        />
      </div>
      <div className="flex flex-wrap justify-between lg:-mx-4 xl:-mx-7">
        {membershipProducts.map((product) => (
          <div key={product.id} className="w-full lg:w-1/3 lg:px-4 xl:px-7 mb-8">
            <ProductPlan
              product={product}
              submitText={applyDiscount ? 'Join Today' : 'Join'}
              handleSubmit={joinMembershipHandler}
              showFeatures={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

Memberships.defaultProps = {
  className: '',
};

Memberships.propTypes = {
  className: PropTypes.string,
};

export default Memberships;
