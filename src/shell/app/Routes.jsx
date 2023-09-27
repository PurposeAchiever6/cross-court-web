/* eslint-disable react/no-unstable-nested-components */

import React, { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { ToastContainer, Bounce } from 'react-toastify';
import deepEqual from 'deep-equal';
import HttpsRedirect from 'react-https-redirect';
import ReactGA from 'react-ga4';
import styled from 'styled-components';

import ROUTES from 'shared/constants/routes';
import { SIGNUP_STATE_CREATED } from 'screens/onboarding/constants';
import { initialAppLoad } from 'shared/actions/actionCreators';
import StripeContainer from 'shared/components/StripeContainer';
import Header from 'shared/components/Header';
import Footer from 'shared/components/Footer';
import Loading from 'shared/components/Loading';
import ScrollToPosition from 'shared/components/ScrollToPosition';
import { history } from 'shared/history';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import { toggleActiveCampaignChat } from 'shared/utils/activeCampaign';
import {
  parseUrlUtmParams,
  removeUtmParams,
  setUtmParams,
  isUtmParamsEmpty,
} from 'shared/utils/utm';
import AmpliUtils from 'shared/utils/amplitude'
import ScheduleTourButton from 'shared/components/ScheduleTourButton';
import PrivateRoute from './PrivateRoute';
import HtmlHead from './HtmlHead';

const Home = lazy(() => import('screens/homepage/HomePage'));
const Login = lazy(() => import('screens/auth/pages/LoginPage'));
const Signup = lazy(() => import('screens/auth/pages/SignupPage'));
const SignupVerification = lazy(() => import('screens/auth/pages/SignupVerificationPage'));
const SignupConfirmation = lazy(() => import('screens/auth/pages/SignupConfirmationPage'));
const OnboardingPersonalDetails = lazy(() =>
  import('screens/onboarding/pages/OnboardingPersonalDetailsPage')
);
const OnboardingIntensityLevel = lazy(() =>
  import('screens/onboarding/pages/OnboardingIntensityLevelPage')
);
const OnboardingMemberships = lazy(() =>
  import('screens/onboarding/pages/OnboardingMembershipsPage')
);
const OnboardingPaymentMethod = lazy(() =>
  import('screens/onboarding/pages/OnboardingPaymentMethodPage')
);
const OnboardingReview = lazy(() => import('screens/onboarding/pages/OnboardingReviewPage'));
const Dashboard = lazy(() => import('screens/dashboard/DashboardPage'));
const WhyJoin = lazy(() => import('screens/why-join/WhyJoinPage'));
const Ads = lazy(() => import('screens/ads/AdsPage'));
const CareersPage = lazy(() => import('screens/careers/CareersPage'));
const Locations = lazy(() => import('screens/locations/LocationsPage'));
const Session = lazy(() => import('screens/sessions/pages/Session'));
const SessionReserved = lazy(() => import('screens/sessions/pages/SessionReserved'));
const FirstSessionReserved = lazy(() => import('screens/sessions/pages/FirstSessionReserved'));
const ProductsPage = lazy(() => import('screens/products/ProductsPage'));
const ManageMembershipPage = lazy(() => import('screens/memberships/ManageMembershipPage'));
const MyAccount = lazy(() => import('screens/my-account/MyAccountPage'));
const CheckoutConfirm = lazy(() => import('screens/checkout/pages/CheckoutConfirm'));
const FAQ = lazy(() => import('screens/faq/FaqPage'));
const Content = lazy(() => import('screens/content/ContentPage'));
const TermsAndConditions = lazy(() => import('screens/legal-docs/pages/TermsAndConditions'));
const PrivacyPolicy = lazy(() => import('screens/legal-docs/pages/PrivacyPolicy'));
const PWA = lazy(() => import('screens/pwa/PWAPage'));
const Gallery = lazy(() => import('screens/gallery/GalleryPage'));
const Referrals = lazy(() => import('screens/referrals/ReferralsPage'));
const MembershipConfirm = lazy(() => import('screens/checkout/pages/MembershipConfirm'));
const NotFoundPage = lazy(() => import('screens/not-found/NotFoundPage'));
const SettingsPage = lazy(() => import('screens/settings/SettingsPage'));
const SelfCheckInPage = lazy(() => import('screens/self-check-in/pages/SelfCheckInPage'));
const SelfCheckInConfirmPage = lazy(() =>
  import('screens/self-check-in/pages/SelfCheckInConfirmPage')
);
const SelfCheckInErrorPage = lazy(() => import('screens/self-check-in/pages/SelfCheckInErrorPage'));
const SelfCheckInSuccessPage = lazy(() =>
  import('screens/self-check-in/pages/SelfCheckInSuccessPage')
);

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
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

  if (window.localStorage.getItem('currentPage') !== pathname) {
    window.localStorage.setItem('previousPage', window.localStorage.getItem('currentPage'));
    window.localStorage.setItem('currentPage', pathname);
  }
};
const setScrollClasses = () => {
  if (body.getAttribute('data-page') === 'no-session-credits') {
    const bigTitle = document.querySelector('.no-session-credits .title');
    const scroll = document.querySelector('.no-session-credits .scroll');

    if (bigTitle && keepScrolling) {
      let addClass = '';
      const animClasses = [
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

      if (window.scrollY >= 20 && window.scrollY < 40) {
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
  const { search } = window.location;
  const params = new URLSearchParams(search);
  const referralCode = params.get('referralCode');

  if (referralCode) {
    window.localStorage.setItem('referralCode', referralCode);
  }
};

history.listen((location) => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.send({ hitType: 'pageview', page: location.pathname }); // Record a pageview for the given page

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

window.onpopstate = () => {
  history.replace(window.localStorage.getItem('previousPage'));
};

const Routes = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const currentUser = useSelector(getUserProfile, deepEqual);

  let forceRedirect = null;

  if (isAuthenticated && currentUser.signupState === SIGNUP_STATE_CREATED) {
    forceRedirect = ROUTES.ONBOARDING_PERSONAL_DETAILS;
  }

  useEffect(() => {
    const utmParams = parseUrlUtmParams(window.location.search);

    if (isUtmParamsEmpty()) {
      setUtmParams(utmParams);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      window.localStorage.setItem('hasLoggedIn', 'true');
      removeUtmParams();
      dispatch(initialAppLoad());
    }

    window.cookieAndSessionStorageHandler(isAuthenticated);
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    AmpliUtils.ampliUserGroup(isAuthenticated, currentUser);
  }, [isAuthenticated, currentUser]);

  const Pages = () => (
    <main className="pt-16">
      <Switch>
        <Route path={ROUTES.LOGIN} exact>
          <Login />
        </Route>
        <Route path={ROUTES.SIGNUP} exact>
          <Signup />
        </Route>
        <Route path={ROUTES.ADS} exact>
          <Ads />
        </Route>
        <Route path={ROUTES.SIGNUP_VERIFICATION} exact>
          <SignupVerification />
        </Route>
        <Route path={ROUTES.SIGNUP_CONFIRMATION} exact>
          <SignupConfirmation />
        </Route>
        <PrivateRoute path={ROUTES.ONBOARDING_PERSONAL_DETAILS} exact>
          <OnboardingPersonalDetails />
        </PrivateRoute>
        <PrivateRoute path={ROUTES.ONBOARDING_INTENSITY_LEVEL} exact>
          <OnboardingIntensityLevel />
        </PrivateRoute>
        <PrivateRoute path={ROUTES.ONBOARDING_MEMBERSHIPS} exact>
          <OnboardingMemberships />
        </PrivateRoute>
        <PrivateRoute path={ROUTES.ONBOARDING_PAYMENT_METHOD} exact>
          <OnboardingPaymentMethod />
        </PrivateRoute>
        <PrivateRoute path={ROUTES.ONBOARDING_REVIEW} exact>
          <OnboardingReview />
        </PrivateRoute>
        <Route path={[ROUTES.LOCATIONS, ROUTES.LOCATIONSFIRST]} exact>
          <Locations />
        </Route>
        <PrivateRoute path={ROUTES.SESSIONRESERVED} exact>
          <SessionReserved />
        </PrivateRoute>
        <PrivateRoute path={ROUTES.FIRSTSESSIONRESERVED} exact>
          <FirstSessionReserved />
        </PrivateRoute>
        <Route path={ROUTES.SESSION} exact>
          <Session />
        </Route>
        <Route path={ROUTES.WHY_JOIN} exact>
          <WhyJoin />
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
        <PrivateRoute path={ROUTES.CHECKOUT_CONFIRMED} exact>
          <CheckoutConfirm />
        </PrivateRoute>
        <PrivateRoute path={ROUTES.CHECKOUT_MEMBERSHIP_CONFIRMED} exact>
          <MembershipConfirm />
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
        <PrivateRoute path={ROUTES.SELF_CHECK_IN} exact>
          <SelfCheckInPage />
        </PrivateRoute>
        <PrivateRoute path={ROUTES.SELF_CHECK_IN_CONFIRM} exact>
          <SelfCheckInConfirmPage />
        </PrivateRoute>
        <PrivateRoute path={ROUTES.SELF_CHECK_IN_ERROR} exact>
          <SelfCheckInErrorPage />
        </PrivateRoute>
        <PrivateRoute path={ROUTES.SELF_CHECK_IN_SUCCESS} exact>
          <SelfCheckInSuccessPage />
        </PrivateRoute>
        <Route path={ROUTES.GALLERY} exact>
          <Gallery />
        </Route>
        <PrivateRoute path={ROUTES.REFERRALS} exact>
          <Referrals />
        </PrivateRoute>
        <PrivateRoute path={ROUTES.SETTINGS} exact>
          <SettingsPage />
        </PrivateRoute>
        <Route path={ROUTES.NOT_FOUND} exact>
          <NotFoundPage />
        </Route>
        <Route path="*">
          <Redirect to={ROUTES.NOT_FOUND} />
        </Route>
      </Switch>
    </main>
  );

  if (forceRedirect && window.location.pathname !== forceRedirect) {
    window.location.href = forceRedirect;
    return <Loading />;
  }

  return (
    <HttpsRedirect>
      <HtmlHead />
      <AppWrapper>
        <ToastContainer
          transition={Bounce}
          position="top-right"
          autoClose={false}
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
            <StripeContainer>
              <Pages />
            </StripeContainer>
            <Footer />
            <ScheduleTourButton />
          </ConnectedRouter>
        </Suspense>
      </AppWrapper>
    </HttpsRedirect>
  );
};

export default Routes;
