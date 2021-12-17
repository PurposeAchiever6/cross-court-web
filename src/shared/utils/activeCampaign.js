import runtimeEnv from '@mars/heroku-js-runtime-env';
import ROUTES from 'shared/constants/routes';
import activeCampaignService from 'shared/services/activeCampaign';

const env = runtimeEnv();
const APP_URL = env.REACT_APP_URL;

const STAY_IN_THE_LOOP_EVENT = 'Stay In The Loop';
const STARTED_CHECKOUT_EVENT = 'Started Checkout';

const contactUrl = `${APP_URL}?openForm=true`;

export const contactUsForm = async (userParams) => {
  await activeCampaignService.createContact(userParams);
};

export const stayInTheLoop = async ({ email }) => {
  const response = await activeCampaignService.createContact({ email });
  await activeCampaignService.createDeal(STAY_IN_THE_LOOP_EVENT, [], {
    email,
    contactId: response.contact.id,
  });
};

export const startedCheckout = async ({ product }) => {
  const checkoutUrl = `${APP_URL}${ROUTES.MEMBERSHIPS}`;

  const isRecurringProduct = product.productType === 'recurring';
  let productName = null;

  if (isRecurringProduct) {
    productName = `${product.name.toLowerCase()} membership`;
  } else {
    productName = `drop in ${product.credits > 1 ? 'credits' : 'credit'}`;
  }

  await activeCampaignService.createDeal(STARTED_CHECKOUT_EVENT, [
    { name: 'Product Name', value: productName },
    { name: 'Checkout Url', value: checkoutUrl },
    { name: 'Contact Url', value: contactUrl },
  ]);
};
