import currency from 'currency.js';
import { ONE_TIME, RECURRING, FREE_SESSION, UNLIMITED_VALUE } from 'screens/products/constants';

export const THEME = {
  white: 'white',
  highlighted: 'highlighted',
};

export const productDiscount = (product, user) => {
  const userHasActiveSubscription = !!user.activeSubscription;
  const userHasNotReceivedFreeSession = !user.hasReceivedFreeSession;
  const userHasNotReserveAnySession = !user.hasReserveAnySession;
  const userHasNotAnyCredits = user.totalCredits === 0;

  const oneTimeProduct = product.productType === ONE_TIME;
  const { priceForUser, priceForMembers, priceForFirstTimersNoFreeSession, price } = product;

  let discountPercentage = 0;
  let discountReason = null;

  if (
    oneTimeProduct &&
    priceForFirstTimersNoFreeSession &&
    userHasNotReceivedFreeSession &&
    userHasNotReserveAnySession &&
    userHasNotAnyCredits
  ) {
    discountPercentage = 100 - (priceForUser * 100) / price;
    discountReason = 'being your first session';
  } else if (oneTimeProduct && priceForMembers && userHasActiveSubscription) {
    discountPercentage = 100 - (priceForUser * 100) / price;
    discountReason = 'being a member';
  }

  return {
    discountPercentage: Math.round(discountPercentage),
    discountReason,
  };
};

export const creditsString = (credits) => (credits === UNLIMITED_VALUE ? 'Unlimited' : credits);

export const formatPrice = (price) =>
  currency(price, {
    formatWithSymbol: true,
    precision: 0,
  }).format();

export const thisYearFreeFinishedSubscriptionPauses = (activeSubscription) =>
  activeSubscription?.thisYearSubscriptionPauses?.filter(
    (subscriptionPause) => subscriptionPause.status === 'finished' && !subscriptionPause.paid
  )?.length ?? 0;

export const dropInProducts = (products) =>
  products.filter(
    (product) =>
      product.productType === ONE_TIME &&
      product.name !== FREE_SESSION &&
      !product.seasonPass &&
      !product.scouting &&
      !product.trial
  );

export const isRecurring = (product) => product?.productType === RECURRING;

export const isTrial = (product) => product.trial;

export const findMostExpensiveProduct = (products) => {
  if (!products.length) return null;

  return products.reduce((max, min) => (Number(max.price) > Number(min.price) ? max : min));
};
