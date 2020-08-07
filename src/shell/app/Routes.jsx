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
    overflow-y: auto;
  }
`;
const { body } = document;

function setPageNameOnBodyClass(pathname) {
  let pageName = '';

  if (pathname === '/') {
    pageName = 'home';
  } else {
    pageName = pathname.replace(/\//g, '-').replace(/^-/, '');
  }

  body.setAttribute('data-page', pageName);
}

history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page

  setPageNameOnBodyClass(location.pathname);
  setScrollClasses();
});

function setScrollClasses() {
  const { body } = document;
  const header = document.querySelector('.header');

  if (body.getAttribute('data-page') === 'home') {
    const bigTitle = document.querySelector('.crosscourt-big-title');

    if (bigTitle) {
      let addClass = '';
      let animClasses = [
        'anim1', 'anim2', 'anim3', 'anim4', 'anim5', 'anim6', 'anim7', 'anim8', 'anim9', 'anim10',
        'anim11', 'anim12', 'anim13', 'anim14', 'anim15', 'anim16', 'anim17', 'anim18', 'anim19', 'anim20'
      ];

      if (window.scrollY < 100) {
      } else if (window.scrollY >= 100 && window.scrollY < 130) {
        addClass = 'anim1';
      } else if (window.scrollY >= 130 && window.scrollY < 160) {
        addClass = 'anim2';
      } else if (window.scrollY >= 160 && window.scrollY < 190) {
        addClass = 'anim3';
      } else if (window.scrollY >= 190 && window.scrollY < 210) {
        addClass = 'anim4';
      } else if (window.scrollY >= 210 && window.scrollY < 240) {
        addClass = 'anim5';
      } else if (window.scrollY >= 240 && window.scrollY < 270) {
        addClass = 'anim6';
      } else if (window.scrollY >= 270 && window.scrollY < 300) {
        addClass = 'anim7';
      } else if (window.scrollY >= 300 && window.scrollY < 330) {
        addClass = 'anim8';
      } else if (window.scrollY >= 330 && window.scrollY < 360) {
        addClass = 'anim9';
      } else if (window.scrollY >= 360 && window.scrollY < 390) {
        addClass = 'anim10';
      } else if (window.scrollY >= 390 && window.scrollY < 420) {
        addClass = 'anim11';
      } else if (window.scrollY >= 420 && window.scrollY < 450) {
        addClass = 'anim12';
      } else if (window.scrollY >= 450 && window.scrollY < 480) {
        addClass = 'anim13';
      } else if (window.scrollY >= 480 && window.scrollY < 510) {
        addClass = 'anim14';
      } else if (window.scrollY >= 510 && window.scrollY < 540) {
        addClass = 'anim15';
      } else if (window.scrollY >= 540 && window.scrollY < 570) {
        addClass = 'anim16';
      } else if (window.scrollY >= 570 && window.scrollY < 600) {
        addClass = 'anim17';
      } else if (window.scrollY >= 600 && window.scrollY < 630) {
        addClass = 'anim18';
      } else if (window.scrollY >= 630 && window.scrollY < 660) {
        addClass = 'anim19';
      } else if (window.scrollY >= 660 && window.scrollY < 690) {
        addClass = 'anim20';
      } else if (window.scrollY >= 690) {
      }

      if (addClass) {
        bigTitle.classList.add(addClass);
      }
      bigTitle.classList.remove(...animClasses.filter(item => item !== addClass));
    }

    window.setTimeout(function() {
      const video = document.querySelector('.video-player');

      if (video) {
        video.addEventListener('pause', function() {
          video.classList.add('data-user-paused');
        });

        const options = {
          rootMargin: '0px',
          threshold: 0,
        };

        function callback(entries, observer) {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (!video.classList.contains('data-user-paused')) {
                video.play();
              }
            } else {
              video.pause();
              video.classList.remove('data-user-paused');
            }
          });
        }

        window.observer = new IntersectionObserver(callback, options);
        window.observer.observe(document.querySelector('.video-player'));
      }
    }, 2000);
  } else if (window.observer) {
    window.observer.disconnect();
  }

  if (
    body.getAttribute('data-page') === 'home' ||
    body.getAttribute('data-page') === 'how-it-works'
  ) {
    if (window.scrollY > 800) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  } else {
    header.classList.add('scrolled');
  }

  window.setTimeout(function() {
    const bottomBanner = document.querySelector('.banner-container');

    if (body.getAttribute('data-page') === 'how-it-works') {
      const seeScheduleButton = document.querySelector('.see-schedule-button');

      if (!seeScheduleButton.classList.contains('done') && (window.innerHeight + window.pageYOffset) >= (document.body.offsetHeight - 400)) {
        seeScheduleButton.classList.add(
          'animate__animated',
          'animate__bounce',
          'animate__slower',
          //'animate__slow',
          'animate__bounceInLeft',
          //'animate__rollIn',
          'done'
        );
      }
    }

    if (bottomBanner) {
      if ((window.innerHeight + window.pageYOffset) >= (document.body.offsetHeight - 200)) {
        bottomBanner.classList.add('scrolled-down');
      } else {
        bottomBanner.classList.remove('scrolled-down');
      }
    }
  }, 100);
}

window.addEventListener('scroll', setScrollClasses);

setPageNameOnBodyClass(window.location.pathname);
window.setTimeout(setScrollClasses, 0);

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
