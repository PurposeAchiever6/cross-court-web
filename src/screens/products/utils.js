import currency from 'currency.js';
import { ONE_TIME, UNLIMITED_VALUE } from 'screens/products/constants';

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
