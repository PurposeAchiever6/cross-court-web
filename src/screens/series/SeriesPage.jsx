import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { head } from 'ramda';
import FreeSessionBanner from 'shared/components/FreeSessionBanner';
import Loading from 'shared/components/Loading';
import ROUTES from 'shared/constants/routes';
import NewModal from 'shared/components/NewModal';
import { claimFreeSessionInit } from 'screens/payments/actionCreators';
import { getClaimFreeSession } from 'screens/payments/reducer';
import { initialLoad, setSelectedProduct } from './actionCreators';
import { getAvailableProducts, getPageLoading } from './reducer';
import Hero from './components/Hero';
import Plans from './components/Plans';
import Series from './components/Series';
import FreeSessionModal from './components/FreeSessionModal';

const SeriesPage = () => {
  const [showFreeSessionModal, setShowFreeSessionModal] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const availableProducts = useSelector(getAvailableProducts);
  const isLoading = useSelector(getPageLoading);
  const claimFreeSession = useSelector(getClaimFreeSession);

  const selectProductHandler = product => {
    dispatch(setSelectedProduct(product));
    history.push(ROUTES.PAYMENTS);
  };

  const claimFreeSessionAction = () => {
    const selectedProduct = head(
      availableProducts.filter(product => product.name === 'Free Session')
    );

    setShowFreeSessionModal(false);
    dispatch(claimFreeSessionInit());
    selectProductHandler(selectedProduct);
  };

  useEffect(() => {
    dispatch(initialLoad());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <NewModal
        shouldClose
        closeHandler={() => setShowFreeSessionModal(false)}
        isOpen={showFreeSessionModal}
      >
        <FreeSessionModal
          claimFreeSessionAction={claimFreeSessionAction}
          closeHandler={() => setShowFreeSessionModal(false)}
        />
      </NewModal>

      <FreeSessionBanner
        modalHandler={() => setShowFreeSessionModal(true)}
        claimFreeSession={claimFreeSession}
      />
      <Hero />
      <Plans selectProductHandler={selectProductHandler} availableProducts={availableProducts} />
      <Series />
    </div>
  );
};

export default SeriesPage;
