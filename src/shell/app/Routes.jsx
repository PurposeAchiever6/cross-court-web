import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import styled from 'styled-components';
import { ToastContainer, Zoom } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import ReactGA from 'react-ga';

import { getIsAuthenticated } from 'screens/auth/reducer';
import { history } from 'shared/history';
import colors from 'shared/styles/constants';
import ROUTES from 'shared/constants/routes';
import { getLegalDocs } from 'screens/legal-docs/actionCreators';
import Home from 'screens/homepage/HomePage';
import Login from 'screens/auth/pages/LoginPage';
import Signup from 'screens/auth/pages/SignupPage';
import SignupSuccess from 'screens/auth/pages/SignupSuccess';
import SignupConfirmation from 'screens/auth/pages/SignupConfirmation';
import ForgotPass from 'screens/auth/pages/ForgotPassPage';
import ForgotPassSuccess from 'screens/auth/pages/ForgotPassSuccess';
import PassReset from 'screens/auth/pages/PassResetPage';
import PassResetSuccess from 'screens/auth/pages/PassResetSuccess';
import SemSession from 'screens/sem-session/semSession';
import SessionState from 'screens/sem-session/pages/sessionState';
import HowItWorks from 'screens/how-it-works/HowItWorksPage';
import SemHomePage from 'screens/sem/semHomePage';
import Locations from 'screens/locations/LocationsPage';
import Sessions from 'screens/sessions/SessionsPage';
import SessionConfirmed from 'screens/sessions/pages/SessionConfirmed';
import SessionReserved from 'screens/sessions/pages/SessionReserved';
import Checkout from 'screens/checkout/CheckoutPage';
import SeriesPage from 'screens/series/SeriesPage';
import MyAccount from 'screens/my-account/MyAccountPage';
import PurchaseHistory from 'screens/purchase-history/PurchaseHistoryPage';
import CheckoutConfirm from 'screens/checkout/pages/CheckoutConfirm';
import Payments from 'screens/payments/PaymentsPage';
import PaymentsAddCard from 'screens/payments/pages/AddCard';
import SemHandbook from 'shared/pages/SemHandbook';
import FAQ from 'shared/pages/Faq';
import CancelationPolicy from 'screens/legal-docs/pages/CancelationPolicy';
import TermsAndConditions from 'screens/legal-docs/pages/TermsAndConditions';
import Header from 'shared/components/Header';
import Footer from 'shared/components/Footer';
import { initialAppLoad } from 'shared/actions/actionCreators';
import ScrollToPosition from 'shared/components/ScrollToPosition';

import PrivateRoute from './PrivateRoute';

const AppWrapper = styled.div`
  font-family: 'Untitled Sans';
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  a {
    color: ${colors.black};
  }

  main {
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-top: 5rem;
    overflow-y: auto;
  }
`;

history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

const Routes = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(initialAppLoad());
      dispatch(getLegalDocs());
    } else {
      dispatch(getLegalDocs());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <AppWrapper>
      <ToastContainer
        transition={Zoom}
        position="top-right"
        autoClose={2500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
        closeButton={false}
        bodyClassName="toaster-container"
      />
      <ConnectedRouter history={history}>
        <Header />
        <ScrollToPosition />
        <main>
          <Switch>
            <Route path={ROUTES.LOGIN}>
              <Login />
            </Route>
            <Route path={ROUTES.SIGNUP} exact>
              <Signup />
            </Route>
            <Route path={ROUTES.SIGNUPSUCCESS}>
              <SignupSuccess />
            </Route>
            <Route path={ROUTES.SIGNUPCONFIRMATION}>
              <SignupConfirmation />
            </Route>
            <Route path={ROUTES.FORGOTPASSWORD} exact>
              <ForgotPass />
            </Route>
            <Route path={ROUTES.FORGOTPASSWORDSUCCESS}>
              <ForgotPassSuccess />
            </Route>
            <Route path={ROUTES.RESETPASSWORD} exact>
              <PassReset />
            </Route>
            <Route path={ROUTES.RESETPASSWORDSUCCESS}>
              <PassResetSuccess />
            </Route>
            <Route path={ROUTES.LOCATIONS}>
              <Locations />
            </Route>
            <Route path={ROUTES.SESSION} exact>
              <Sessions />
            </Route>
            <Route path={ROUTES.SESSIONRESERVED}>
              <SessionReserved />
            </Route>
            <Route path={ROUTES.SESSIONCONFIRMED}>
              <SessionConfirmed />
            </Route>
            <Route path={ROUTES.HOWITWORKS}>
              <HowItWorks />
            </Route>
            <Route path={ROUTES.SEM} exact>
              <SemHomePage />
            </Route>
            <Route path={ROUTES.SERIES}>
              <SeriesPage />
            </Route>
            <Route path={ROUTES.TERMS}>
              <TermsAndConditions />
            </Route>
            <Route path={ROUTES.CANCELATIONPOLICY}>
              <CancelationPolicy />
            </Route>
            <PrivateRoute path={ROUTES.PURCHASEHISTORY}>
              <PurchaseHistory />
            </PrivateRoute>
            <PrivateRoute path={ROUTES.CHECKOUT} exact>
              <Checkout />
            </PrivateRoute>
            <PrivateRoute path={ROUTES.CHECKOUTCONFIRMED}>
              <CheckoutConfirm />
            </PrivateRoute>
            <PrivateRoute path={ROUTES.PAYMENTS} exact>
              <Payments />
            </PrivateRoute>
            <PrivateRoute path={ROUTES.PAYMENTSADDCARD}>
              <PaymentsAddCard />
            </PrivateRoute>
            <PrivateRoute path={ROUTES.MYACCOUNT}>
              <MyAccount />
            </PrivateRoute>
            <PrivateRoute path={ROUTES.SEMSESSION} exact>
              <SemSession />
            </PrivateRoute>
            <PrivateRoute path={ROUTES.SESSIONSTATE} exact>
              <SessionState />
            </PrivateRoute>
            <PrivateRoute path={ROUTES.SEMHANDBOOK}>
              <SemHandbook />
            </PrivateRoute>
            <Route path={ROUTES.FAQ}>
              <FAQ />
            </Route>
            <Route path={ROUTES.HOME} exact>
              <Home />
            </Route>
          </Switch>
        </main>
        <Footer />
      </ConnectedRouter>
    </AppWrapper>
  );
};

export default Routes;
