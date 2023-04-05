import ROUTES from 'shared/constants/routes';
import activeCampaignService from 'shared/services/activeCampaign';

const APP_URL = import.meta.env.VITE_URL;

const HIDE_CHATS_FOR_PATHS = [ROUTES.DASHBOARD];
const STARTED_CHECKOUT_EVENT = 'Started Checkout';

const contactUrl = `${APP_URL}?openForm=true`;

export const contactUsForm = async (userParams) => {
  await activeCampaignService.createContact(userParams);
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

export const toggleActiveCampaignChat = () => {
  // Chat widget takes some time to load, so the safer way is to hide it using CSS
  const currentPath = window.location.pathname;
  const { body } = document;

  if (HIDE_CHATS_FOR_PATHS.includes(currentPath)) {
    body.classList.add('hide-ac-chat');
  } else {
    body.classList.remove('hide-ac-chat');
  }
};
