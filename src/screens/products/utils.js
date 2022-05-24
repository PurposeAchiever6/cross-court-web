import { ONE_TIME } from 'screens/products/constants';

export const productDiscount = (product, user) => {
  const userHasActiveSubscription = !!user.activeSubscription;
  const userHasNotReceivedFreeSession = !user.hasReceivedFreeSession;
  const userHasNotReserveAnySession = !user.hasReserveAnySession;
  const userHasNotAnyCredits = user.totalCredits === 0;

  const oneTimeProduct = product.productType === ONE_TIME;
  const priceForUser = product.priceForUser;
  const priceForMembers = product.priceForMembers;
  const priceForFirstTimersNoFreeSession = product.priceForFirstTimersNoFreeSession;
  const price = product.price;

  if (
    oneTimeProduct &&
    priceForFirstTimersNoFreeSession &&
    userHasNotReceivedFreeSession &&
    userHasNotReserveAnySession &&
    userHasNotAnyCredits
  ) {
    return {
      discountPercentage: 100 - (priceForUser * 100) / price,
      discountReason: 'being your first session',
    };
  } else if (oneTimeProduct && priceForMembers && userHasActiveSubscription) {
    return {
      discountPercentage: 100 - (priceForUser * 100) / price,
      discountReason: 'being a member',
    };
  } else {
    return { discountPercentage: 0 };
  }
};
