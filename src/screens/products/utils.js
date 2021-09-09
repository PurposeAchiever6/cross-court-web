import { ONE_TIME } from 'screens/products/constants';

export const productPrice = (product, userHasActiveSubscription) => {
  const oneTimeProduct = product.productType === ONE_TIME;
  const priceForMembers = product.priceForMembers;
  const price = product.price;

  if (oneTimeProduct && priceForMembers && userHasActiveSubscription) {
    return priceForMembers;
  } else {
    return price;
  }
};
