import runtimeEnv from '@mars/heroku-js-runtime-env';
import ROUTES from 'shared/constants/routes';

const env = runtimeEnv();
const APP_URL = env.REACT_APP_URL;

const CONTACT_US_FORM_EVENT = 'Contact Us Form';
const STAY_IN_THE_LOOP_EVENT = 'Stay In The Loop';
const STARTED_CHECKOUT = 'Started Checkout';

const contactUrl = `${APP_URL}?openForm=true`;

const identify = (email, customProperties = {}) => {
  window._learnq.push(['identify', { $email: email, ...customProperties }]);
};

// On identify call, klaviyo updates the user cookies. So we need some delay to track an event
// after we identify the user, so it uses the new cookie and not the old one. If we don't,
// it will track the event using the old cookie, that means, potentially tracking an event for
// other user
const trackEventWithDelay = (eventName, eventProperties = {}) => {
  setTimeout(() => {
    window._learnq.push(['track', eventName, eventProperties]);
  }, 1000);
};

export const contactUsForm = ({ email }) => {
  identify(email);
  trackEventWithDelay(CONTACT_US_FORM_EVENT);
};

export const stayInTheLoop = ({ email }) => {
  const locationsUrl = `${APP_URL}${ROUTES.LOCATIONS}`;

  identify(email, { stayInTheLoop: true });
  trackEventWithDelay(STAY_IN_THE_LOOP_EVENT, { locationsUrl, contactUrl });
};

export const startedCheckout = ({ email, product }) => {
  const checkoutUrl = `${APP_URL}${ROUTES.MEMBERSHIPS}`;

  const isRecurringProduct = product.productType === 'recurring';
  let productName = null;

  if (isRecurringProduct) {
    productName = `${product.name.toLowerCase()} membership`;
  } else {
    productName = `drop in ${product.credits > 1 ? 'credits' : 'credit'}`;
  }

  identify(email);
  trackEventWithDelay(STARTED_CHECKOUT, { productName, checkoutUrl, contactUrl });
};
