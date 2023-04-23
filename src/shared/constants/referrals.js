export const referralText = (code) => {
  const REFERRAL_CODE_PERCENTAGE_DISCOUNT = import.meta.env.VITE_REFERRAL_CODE_PERCENTAGE_DISCOUNT;

  return `Use my referral code ${code} at checkout to receive ${REFERRAL_CODE_PERCENTAGE_DISCOUNT}% off on your first month of any Crosscourt membership! Please note, it must be redeemed before attending the first session.`;
};
