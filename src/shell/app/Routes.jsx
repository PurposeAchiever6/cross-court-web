/* eslint-disable import/first */

import React, { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import HttpsRedirect from 'react-https-redirect';
import ReactGA from 'react-ga';
import { ToastContainer, Zoom } from 'react-toastify';
import styled from 'styled-components';

import { initialAppLoad } from 'shared/actions/actionCreators';
import ROUTES from 'shared/constants/routes';
import Header from 'shared/components/Header';
import Footer from 'shared/components/Footer';
import Loading from 'shared/components/Loading';
import ScrollToPosition from 'shared/components/ScrollToPosition';
import { history } from 'shared/history';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getLegalDocs } from 'screens/legal-docs/actionCreators';
import { toggleActiveCampaignChat } from 'shared/utils/activeCampaign';
import PrivateRoute from './PrivateRoute';
import HtmlHead from './HtmlHead';

const Home = lazy(() => import('screens/homepage/HomePage'));
const Login = lazy(() => import('screens/auth/pages/LoginPage'));
const Signup = lazy(() => import('screens/auth/pages/SignupPage'));
const SignupSuccess = lazy(() => import('screens/auth/pages/SignupSuccess'));
const SignupConfirmation = lazy(() => import('screens/auth/pages/SignupConfirmation'));
const ForgotPass = lazy(() => import('screens/auth/pages/ForgotPassPage'));
const ForgotPassSuccess = lazy(() => import('screens/auth/pages/ForgotPassSuccess'));
const PassReset = lazy(() => import('screens/auth/pages/PassResetPage'));
const PassResetSuccess = lazy(() => import('screens/auth/pages/PassResetSuccess'));
const Dashboard = lazy(() => import('screens/dashboard/Dashboard'));
const HowItWorks = lazy(() => import('screens/how-it-works/HowItWorksPage'));
const CareersPage = lazy(() => import('screens/careers/CareersPage'));
const Locations = lazy(() => import('screens/locations/LocationsPage'));
const Session = lazy(() => import('screens/sessions/pages/Session'));
const OpenClubSession = lazy(() => import('screens/sessions/pages/OpenClub'));
const SessionConfirmed = lazy(() => import('screens/sessions/pages/SessionConfirmed'));
const SessionReserved = lazy(() => import('screens/sessions/pages/SessionReserved'));
const SessionJoinWaitlist = lazy(() => import('screens/sessions/pages/JoinWaitlist'));
const Checkout = lazy(() => import('screens/checkout/CheckoutPage'));
const ProductsPage = lazy(() => import('screens/products/ProductsPage'));
const ManageMembershipPage = lazy(() => import('screens/memberships/ManageMembershipPage'));
const MyAccount = lazy(() => import('screens/my-account/MyAccountPage'));
const PurchaseHistory = lazy(() => import('screens/purchase-history/PurchaseHistoryPage'));
const CheckoutConfirm = lazy(() => import('screens/checkout/pages/CheckoutConfirm'));
const FAQ = lazy(() => import('screens/faq/FaqPage'));
const Content = lazy(() => import('screens/content/ContentPage'));
const Rules = lazy(() => import('shared/pages/Rules'));
const Rating = lazy(() => import('shared/pages/Rating'));
const CancelationPolicy = lazy(() => import('screens/legal-docs/pages/CancelationPolicy'));
const TermsAndConditions = lazy(() => import('screens/legal-docs/pages/TermsAndConditions'));
const PrivacyPolicy = lazy(() => import('screens/legal-docs/pages/PrivacyPolicy'));
const PWA = lazy(() => import('screens/pwa/PWAPage'));
const AddPaymentMethod = lazy(() => import('screens/payment-methods/pages/AddPaymentMethod'));
const PaymentMethodsSelect = lazy(() =>
  import('screens/payment-methods/pages/PaymentMethodsSelect')
);
const PaymentMethodsDefault = lazy(() =>
  import('screens/payment-methods/pages/PaymentMethodsDefault')
);
const PaymentMethodsMembership = lazy(() =>
  import('screens/payment-methods/pages/PaymentMethodsMembership')
);
const Gallery = lazy(() => import('screens/gallery/GalleryPage'));

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  main {
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
`;
const { body } = document;
let keepScrolling = true;

const setPageNameOnBodyClass = (pathname) => {
  let pageName = '';

  if (pathname === '/') {
    pageName = 'home';
  } else {
    pageName = pathname.replace(/\//g, '-').replace(/^-/, '');
  }

  body.setAttribute('data-page', pageName);

  if (window.localStorage.getItem('currentPage') !== pageName) {
    window.localStorage.setItem('previousPage', window.localStorage.getItem('currentPage'));
    window.localStorage.setItem('currentPage', pageName);
  }
};
const setScrollClasses = () => {
  if (
    body.getAttribute('data-page') === 'no-session-credits' ||
    (body.getAttribute('data-page') === 'memberships' &&
      window.location.search === '?testanimation')
  ) {
    const bigTitle = document.querySelector('.no-session-credits .title');
    const scroll = document.querySelector('.no-session-credits .scroll');

    if (bigTitle && keepScrolling) {
      let addClass = '';
      let animClasses = [
        'anim1',
        'anim2',
        'anim3',
        'anim4',
        'anim5',
        'anim6',
        'anim7',
        'anim8',
        'anim9',
        'anim10',
        'anim11',
        'anim12',
        'anim13',
        'anim14',
        'anim15',
        'anim16',
        'anim17',
        'anim18',
        'anim19',
        'anim20',
        'anim21',
        'anim22',
        'anim23',
        'anim24',
        'anim25',
        'anim26',
        'anim27',
        'anim28',
        'anim29',
        'anim30',
      ];

      if (window.scrollY < 20) {
      } else if (window.scrollY >= 20 && window.scrollY < 40) {
        addClass = 'anim1';
      } else if (window.scrollY >= 40 && window.scrollY < 60) {
        addClass = 'anim2';
      } else if (window.scrollY >= 60 && window.scrollY < 80) {
        addClass = 'anim3';
      } else if (window.scrollY >= 80 && window.scrollY < 100) {
        addClass = 'anim4';
      } else if (window.scrollY >= 100 && window.scrollY < 120) {
        addClass = 'anim5';
      } else if (window.scrollY >= 120 && window.scrollY < 140) {
        addClass = 'anim6';
      } else if (window.scrollY >= 140 && window.scrollY < 160) {
        addClass = 'anim7';
      } else if (window.scrollY >= 160 && window.scrollY < 180) {
        addClass = 'anim8';
      } else if (window.scrollY >= 180 && window.scrollY < 200) {
        addClass = 'anim9';
      } else if (window.scrollY >= 200 && window.scrollY < 220) {
        addClass = 'anim10';
      } else if (window.scrollY >= 220 && window.scrollY < 240) {
        addClass = 'anim11';
      } else if (window.scrollY >= 240 && window.scrollY < 260) {
        addClass = 'anim12';
      } else if (window.scrollY >= 260 && window.scrollY < 280) {
        addClass = 'anim13';
      } else if (window.scrollY >= 280 && window.scrollY < 300) {
        addClass = 'anim14';
      } else if (window.scrollY >= 300 && window.scrollY < 320) {
        addClass = 'anim15';
      } else if (window.scrollY >= 320 && window.scrollY < 340) {
        addClass = 'anim16';
      } else if (window.scrollY >= 340 && window.scrollY < 360) {
        addClass = 'anim17';
      } else if (window.scrollY >= 360 && window.scrollY < 380) {
        addClass = 'anim18';
      } else if (window.scrollY >= 380 && window.scrollY < 400) {
        addClass = 'anim19';
      } else if (window.scrollY >= 400 && window.scrollY < 420) {
        addClass = 'anim20';
      } else if (window.scrollY >= 420 && window.scrollY < 440) {
        addClass = 'anim21';
      } else if (window.scrollY >= 440 && window.scrollY < 460) {
        addClass = 'anim22';
      } else if (window.scrollY >= 460 && window.scrollY < 480) {
        addClass = 'anim23';
      } else if (window.scrollY >= 480 && window.scrollY < 500) {
        addClass = 'anim24';
      } else if (window.scrollY >= 500 && window.scrollY < 520) {
        addClass = 'anim25';
      } else if (window.scrollY >= 520 && window.scrollY < 540) {
        addClass = 'anim26';
      } else if (window.scrollY >= 540 && window.scrollY < 560) {
        addClass = 'anim27';
      } else if (window.scrollY >= 560 && window.scrollY < 580) {
        addClass = 'anim28';
      } else if (window.scrollY >= 580 && window.scrollY < 600) {
        addClass = 'anim29';
      } else if (window.scrollY >= 600) {
        addClass = 'anim30';
        keepScrolling = false;

        window.setTimeout(() => {
          window.setTimeout(() => {
            if (document.querySelector('.no-session-credits')) {
              document.querySelector('.no-session-credits').style.display = 'none';
            }
          }, 800);
        }, 1000);
      }

      if (addClass) {
        bigTitle.classList.add(addClass);
        scroll.classList.add(addClass);
      }
      bigTitle.classList.remove(...animClasses.filter((item) => item !== addClass));
      scroll.classList.remove(...animClasses.filter((item) => item !== addClass));
    }
  }
};

window.cookieAndSessionStorageHandler = () => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let referralCode = params.get('referralCode');

  if (referralCode) {
    window.localStorage.setItem('referralCode', referralCode);
  }
};

history.listen((location) => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page

  setPageNameOnBodyClass(window.location.pathname);
  keepScrolling = true;
  window.addEventListener('scroll', setScrollClasses);
  window.setTimeout(setScrollClasses, 1000);

  toggleActiveCampaignChat();
});

setPageNameOnBodyClass(window.location.pathname);
window.addEventListener('scroll', setScrollClasses);
window.setTimeout(setScrollClasses, 1000);
toggleActiveCampaignChat();

const Routes = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      window.localStorage.setItem('hasLoggedIn', 'true');
      dispatch(initialAppLoad());
      dispatch(getLegalDocs());
    } else {
      dispatch(getLegalDocs());
    }

    window.cookieAndSessionStorageHandler(isAuthenticated);
  }, [dispatch, isAuthenticated]);

  const Pages = () => (
    <main className="pt-16">
      <Switch>
        <Route path={ROUTES.LOGIN} exact>
          <Login />
        </Route>
        <Route path={ROUTES.SIGNUP} exact>
          <Signup />
        </Route>
        <Route path={ROUTES.RATING} exact>
          <Rating />
        </Route>
        <Route path={ROUTES.SIGNUPSUCCESS} exact>
          <SignupSuccess />
        </Route>
        <Route path={ROUTES.SIGNUPCONFIRMATION} exact>
          <SignupConfirmation />
        </Route>
        <Route path={ROUTES.FORGOTPASSWORD} exact>
          <ForgotPass />
        </Route>
        <Route path={ROUTES.FORGOTPASSWORDSUCCESS} exact>
          <ForgotPassSuccess />
        </Route>
        <Route path={ROUTES.RESETPASSWORD} exact>
          <PassReset />
        </Route>
        <Route path={ROUTES.RESETPASSWORDSUCCESS} exact>
          <PassResetSuccess />
        </Route>
        <Route path={[ROUTES.LOCATIONS, ROUTES.LOCATIONSFIRST]} exact>
          <Locations />
        </Route>
        <Route path={ROUTES.SESSION} exact>
          <Session />
        </Route>
        <Route path={ROUTES.OPEN_CLUB_SESSION} exact>
          <OpenClubSession />
        </Route>
        <Route path={[ROUTES.SESSIONRESERVED, ROUTES.FIRSTSESSIONRESERVED]} exact>
          <SessionReserved />
        </Route>
        <Route path={ROUTES.SESSIONCONFIRMED} exact>
          <SessionConfirmed />
        </Route>
        <Route path={ROUTES.HOWITWORKS} exact>
          <HowItWorks />
        </Route>
        <Route path={ROUTES.MEMBERSHIPS} exact>
          <ProductsPage />
        </Route>
        <Route path={ROUTES.MANAGE_MEMBERSHIP} exact>
          <ManageMembershipPage />
        </Route>
        <Route path={ROUTES.TERMS} exact>
          <TermsAndConditions />
        </Route>
        <Route path={ROUTES.PRIVACY_POLICY} exact>
          <PrivacyPolicy />
        </Route>
        <Route path={ROUTES.CANCELATIONPOLICY} exact>
          <CancelationPolicy />
        </Route>
        <PrivateRoute path={ROUTES.PURCHASEHISTORY} exact>
          <PurchaseHistory />
        </PrivateRoute>
        <PrivateRoute path={ROUTES.CHECKOUT} exact>
          <Checkout />
        </PrivateRoute>
        <PrivateRoute path={ROUTES.CHECKOUTCONFIRMED} exact>
          <CheckoutConfirm />
        </PrivateRoute>
        <PrivateRoute path={[ROUTES.PAYMENT_METHODS_SELECT]} exact>
          <PaymentMethodsSelect />
        </PrivateRoute>
        <PrivateRoute path={[ROUTES.PAYMENT_METHODS_DEFAULT]} exact>
          <PaymentMethodsDefault />
        </PrivateRoute>
        <PrivateRoute path={[ROUTES.PAYMENT_METHODS_MEMBERSHIP]} exact>
          <PaymentMethodsMembership />
        </PrivateRoute>
        <PrivateRoute path={ROUTES.PAYMENT_METHODS_ADD} exact>
          <AddPaymentMethod />
        </PrivateRoute>
        <PrivateRoute path={ROUTES.MYACCOUNT} exact>
          <MyAccount />
        </PrivateRoute>
        <Route path={ROUTES.FAQ} exact>
          <FAQ />
        </Route>
        <Route path={ROUTES.CONTENT} exact>
          <Content />
        </Route>
        <Route path={ROUTES.RULES} exact>
          <Rules />
        </Route>
        <Route path={ROUTES.HOME} exact>
          <Home />
        </Route>
        <Route path={ROUTES.CAREERS} exact>
          <CareersPage />
        </Route>
        <Route path={ROUTES.PWA} exact>
          <PWA />
        </Route>
        <PrivateRoute path={ROUTES.DASHBOARD} exact>
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path={ROUTES.SESSIONJOINWAITLIST} exact>
          <SessionJoinWaitlist />
        </PrivateRoute>
        <Route path={ROUTES.GALLERY} exact>
          <Gallery />
        </Route>
      </Switch>
    </main>
  );

  return (
    <HttpsRedirect>
      <HtmlHead />
      <AppWrapper>
        <ToastContainer
          transition={Zoom}
          position="top-right"
          autoClose={3500}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
          closeButton={false}
          className="toast-container"
          toastClassName="toast"
        />
        <Suspense fallback={<Loading />}>
          <ConnectedRouter history={history}>
            <Header />
            <ScrollToPosition />
            <Pages />
            <Footer />
          </ConnectedRouter>
        </Suspense>
      </AppWrapper>
    </HttpsRedirect>
  );
};

export default Routes;
