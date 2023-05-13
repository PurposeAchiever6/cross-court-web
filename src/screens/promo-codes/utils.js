import {
  PROMO_CODE_DURATION_FOREVER,
  PROMO_CODE_TYPE_PERCENTAGE_DISCOUNT,
} from 'screens/promo-codes/constants';
import { pluralize } from 'shared/utils/helpers';

export const isForever = (promoCode) => promoCode?.duration === PROMO_CODE_DURATION_FOREVER;

export const discountAmountText = (promoCode) => {
  if (promoCode.type === PROMO_CODE_TYPE_PERCENTAGE_DISCOUNT) {
    return `${promoCode.discount}%`;
  }

  return `$${promoCode.discount}`;
};

export const discountTimeText = (promoCode) => {
  const { durationInMonths } = promoCode;

  if (isForever(promoCode)) {
    return 'forever';
  }

  return `your first ${durationInMonths === 1 ? '' : durationInMonths} ${pluralize(
    'month',
    durationInMonths
  )}`;
};
