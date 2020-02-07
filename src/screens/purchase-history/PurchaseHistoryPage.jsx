import React from 'react';
import PurchaseHistoryPageDesktop from './components/desktop/PurchaseHistoryPage';
import PurchaseHistoryPageMobile from './components/mobile/PurchaseHistoryPage';

const PurchaseHistoryPage = () => (
  <>
    <PurchaseHistoryPageDesktop />
    <PurchaseHistoryPageMobile />
  </>
);

export default PurchaseHistoryPage;
