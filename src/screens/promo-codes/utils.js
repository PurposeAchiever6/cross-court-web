import { PROMO_CODE_DURATION_FOREVER } from 'screens/promo-codes/constants';

export const isForever = (promoCode) => promoCode?.duration === PROMO_CODE_DURATION_FOREVER;
