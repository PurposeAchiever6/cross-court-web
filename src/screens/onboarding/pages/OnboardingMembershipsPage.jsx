import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { initialLoad as productsInitialLoad } from 'screens/products/actionCreators';
import { selectProduct, setPromoCodeInit } from 'screens/onboarding/actionCreators';
import { getPageLoading, getRecurringProducts, getDropInProducts } from 'screens/products/reducer';
import { getSelectedProduct } from 'screens/onboarding/reducer';
import OnboardingLayout, {
  OnboardingLayoutContent,
  OnboardingLayoutSidebar,
} from 'shared/components/layout/OnboardingLayout';
import Loading from 'shared/components/Loading';
import Link from 'shared/components/Link';
import ArrowPointDownSvg from 'shared/components/svg/ArrowPointDownSvg';
import Button from 'shared/components/Button';
import BackButton from 'shared/components/BackButton';
import ProductsList from 'screens/onboarding/components/ProductsList';
import RecurringProductsPromoCodeInformation from 'screens/onboarding/components/RecurringProductsPromoCodeInformation';
import CompareMembershipsTable from 'screens/products/components/CompareMembershipsTable';

const OnboardingMembershipsPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const compareMembershipsTableRef = useRef(null);

  const isLoading = useSelector(getPageLoading);
  const recurringProducts = useSelector(getRecurringProducts);
  const dropInProducts = useSelector(getDropInProducts);
  const selectedProduct = useSelector(getSelectedProduct);

  const selectProductHandler = (product) => {
    dispatch(selectProduct({ product }));

    if (product.promoCode?.validForUser) {
      dispatch(setPromoCodeInit({ promoCode: product.promoCode.code, product }));
    }
  };

  useEffect(() => {
    dispatch(productsInitialLoad());
  }, [dispatch]);

  return (
    <OnboardingLayout>
      <div>
        <div className="flex">
          <OnboardingLayoutContent>
            <div className="sm:flex sm:justify-between sm:items-center mb-4">
              <h1 className="font-shapiro95_super_wide text-xl md:text-2xl mb-3 sm:mb-0">
                Memberships
              </h1>
              <Link
                variant="purple-dark"
                onClick={() => compareMembershipsTableRef.current.scrollIntoView()}
                className="text-xs sm:text-sm flex items-center"
              >
                Compare Memberships
                <ArrowPointDownSvg className="w-3 sm:w-4 ml-1 text-black" />
              </Link>
            </div>
            {isLoading ? (
              <Loading />
            ) : (
              <div>
                <ProductsList
                  selectProduct={selectProductHandler}
                  selectedProduct={selectedProduct}
                  recurringProducts={recurringProducts}
                  dropInProducts={dropInProducts}
                />
                <div className="text-sm mt-5">
                  Cancel anytime.{' '}
                  <Link variant="purple-dark" to={ROUTES.TERMS} target="_blank">
                    Terms and conditions
                  </Link>{' '}
                  apply.
                </div>
                <RecurringProductsPromoCodeInformation
                  products={recurringProducts}
                  className="border-t border-black/30 mt-6 pt-6"
                />
              </div>
            )}
          </OnboardingLayoutContent>
          <OnboardingLayoutSidebar active="membership">
            <div className="flex items-stretch">
              <BackButton
                onClick={() => history.push(ROUTES.ONBOARDING_INTENSITY_LEVEL)}
                className="shrink-0 mr-3"
              />
              <Button
                onClick={() => history.push(ROUTES.ONBOARDING_PAYMENT_METHOD)}
                disabled={!selectedProduct}
                className="w-full"
              >
                Next
              </Button>
            </div>
          </OnboardingLayoutSidebar>
        </div>
        <CompareMembershipsTable
          products={recurringProducts}
          initialRowsShown={10}
          ref={compareMembershipsTableRef}
          className="pt-10"
        />
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingMembershipsPage;
