import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FreeSessionBanner from 'shared/components/FreeSessionBanner';
import Loading from 'shared/components/Loading';
import ROUTES from 'shared/constants/routes';

import { initialLoad, setSelectedProduct } from './actionCreators';
import { getAvailableProducts, getPageLoading } from './reducer';
import Plans from './components/Plans';
import Series from './components/Series';

const SeriesPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const availableProducts = useSelector(getAvailableProducts);
  const isLoading = useSelector(getPageLoading);

  const selectProductHandler = product => {
    dispatch(setSelectedProduct(product));
    history.push(ROUTES.PAYMENTS);
  };

  useEffect(() => {
    dispatch(initialLoad());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <FreeSessionBanner />
      <Plans selectProductHandler={selectProductHandler} availableProducts={availableProducts} />
      <Series />
    </div>
  );
};

export default SeriesPage;
