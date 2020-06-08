/* eslint-disable import/first */

import React, { useEffect, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import styled from 'styled-components';
import { ToastContainer, Zoom } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import ReactGA from 'react-ga';

import { initialAppLoad } from 'shared/actions/actionCreators';
import ROUTES from 'shared/constants/routes';
import Header from 'shared/components/Header';
import Footer from 'shared/components/Footer';
import Loading from 'shared/components/Loading';
import ScrollToPosition from 'shared/components/ScrollToPosition';
import { history } from 'shared/history';
import colors from 'shared/styles/constants';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getLegalDocs } from 'screens/legal-docs/actionCreators';
import PrivateRoute from './PrivateRoute';

const Home = lazy(() => import('screens/homepage/HomePage'));
const Login = lazy(() => import('screens/auth/pages/LoginPage'));
const Signup = lazy(() => import('screens/auth/pages/SignupPage'));
const SignupSuccess = lazy(() => import('screens/auth/pages/SignupSuccess'));
const SignupConfirmation = lazy(() => import('screens/auth/pages/SignupConfirmation'));
const ForgotPass = lazy(() => import('screens/auth/pages/ForgotPassPage'));
const ForgotPassSuccess = lazy(() => import('screens/auth/pages/ForgotPassSuccess'));
const PassReset = lazy(() => import('screens/auth/pages/PassResetPage'));
const PassResetSuccess = lazy(() => import('screens/auth/pages/PassResetSuccess'));
const SemSession = lazy(() => import('screens/sem-session/semSession'));
const HowItWorks = lazy(() => import('screens/how-it-works/HowItWorksPage'));
const SemHomePage = lazy(() => import('screens/sem/semHomePage'));
const Locations = lazy(() => import('screens/locations/LocationsPage'));
const Sessions = lazy(() => import('screens/sessions/SessionsPage'));
const SessionConfirmed = lazy(() => import('screens/sessions/pages/SessionConfirmed'));
const SessionReserved = lazy(() => import('screens/sessions/pages/SessionReserved'));
const Checkout = lazy(() => import('screens/checkout/CheckoutPage'));
const SeriesPage = lazy(() => import('screens/series/SeriesPage'));
const MyAccount = lazy(() => import('screens/my-account/MyAccountPage'));
const PurchaseHistory = lazy(() => import('screens/purchase-history/PurchaseHistoryPage'));
const CheckoutConfirm = lazy(() => import('screens/checkout/pages/CheckoutConfirm'));
const Payments = lazy(() => import('screens/payments/PaymentsPage'));
const PaymentsAddCard = lazy(() => import('screens/payments/pages/AddCard'));
const SemHandbook = lazy(() => import('shared/pages/SemHandbook'));
const FAQ = lazy(() => import('shared/pages/Faq'));
const CancelationPolicy = lazy(() => import('screens/legal-docs/pages/CancelationPolicy'));
const TermsAndConditions = lazy(() => import('screens/legal-docs/pages/TermsAndConditions'));

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

  const RoutesWithoutFooter = () => (
    <Switch>
      <PrivateRoute path={ROUTES.SEMSESSION} exact>
        <SemSession />
      </PrivateRoute>
    </Switch>
  );

  const RoutesWithFooter = () => (
    <>
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
        <Route path={ROUTES.FAQ}>
          <FAQ />
        </Route>
        <Route path={ROUTES.HOME} exact>
          <Home />
        </Route>
        <Route path={ROUTES.SEM} exact>
          <SemHomePage />
        </Route>
        <PrivateRoute path={ROUTES.SEMHANDBOOK}>
          <SemHandbook />
        </PrivateRoute>
      </Switch>
      <Footer />
    </>
  );

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
      <Suspense fallback={Loading}>
        <ConnectedRouter history={history}>
          <Header />
          <ScrollToPosition />
          <main>
            <Switch>
              <Route path="/sem/session">
                <RoutesWithoutFooter />
              </Route>
              <Route path="/">
                <RoutesWithFooter />
              </Route>
            </Switch>
          </main>
        </ConnectedRouter>
      </Suspense>
    </AppWrapper>
  );
};

export default Routes;
