import runtimeEnv from '@mars/heroku-js-runtime-env';
import ROUTES from 'shared/constants/routes';

const env = runtimeEnv();
const APP_URL = env.REACT_APP_URL;

export const identify = (email) => {
  window._learnq.push([
    'identify',
    {
      $email: email,
    },
  ]);
};

export const startedCheckout = ({ product }) => {
  const checkoutUrl = `${APP_URL}${ROUTES.MEMBERSHIPS}`;
  const contactUrl = `${APP_URL}?openForm=true`;

  const isRecurringProduct = product.productType === 'recurring';
  let productName = null;

  if (isRecurringProduct) {
    productName = `${product.name.toLowerCase()} membership`;
  } else {
    productName = `drop in ${product.credits > 1 ? 'credits' : 'credit'}`;
  }

  window._learnq.push([
    'track',
    'Started Checkout',
    {
      productName,
      checkoutUrl,
      contactUrl,
    },
  ]);
};
