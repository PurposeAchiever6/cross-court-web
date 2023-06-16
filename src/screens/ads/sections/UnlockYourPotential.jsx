import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { signUpInit } from 'screens/auth/actionCreators';
import unlockYourPotentialImg from 'screens/ads/images/unlock-your-potential.png';
import gradientEffectBgImg from 'screens/ads/images/unlock-your-potential-gradient-effect.png';
import purpleTexture from 'screens/ads/images/purple-texture.jpg';
import { getFeaturedRecurringProductPromoCode } from 'screens/products/reducer';
import { formatPrice } from 'screens/products/utils';
import { discountAmountText, discountTimeText } from 'screens/promo-codes/utils';
import ROUTES from 'shared/constants/routes';
import Button from 'shared/components/Button';
import SectionLayout from 'shared/components/layout/SectionLayout';
import ExpandedLayout from 'shared/components/layout/ExpandedLayout';
import InputTextField from 'shared/components/InputTextField';
import { validateEmail } from 'shared/utils/helpers';
import { getUtmParams } from 'shared/utils/utm';
import Spinner from 'shared/components/Spinner';

const UnlockYourPotential = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignup = () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
    } else {
      setLoading(true);
      setEmailError(null);

      const utmParams = getUtmParams();
      dispatch(signUpInit({ email, ...utmParams }));
    }
  };

  const promoCode = useSelector(getFeaturedRecurringProductPromoCode);
  const discountProductText = !promoCode
    ? ''
    : `Save ${discountAmountText(promoCode)} ${discountTimeText(
        promoCode
      )} by becoming a member today.`;

  return (
    <SectionLayout className="relative pt-10 md:pt-20">
      <img
        src={gradientEffectBgImg}
        alt="cc-basketball-balls"
        className="hidden md:block absolute -top-24 inset-x-0 w-full h-[40%]"
      />
      <div className="relative md:pb-28">
        <div className="flex flex-col-reverse">
          <img
            alt="unlock-your-potential-img"
            src={unlockYourPotentialImg}
            className="md:absolute right-12 -bottom-10 w-[24rem]"
          />
          <div className="relative md:w-1/2 mb-10 md:mb-0">
            <h1 className="font-shapiro95_super_wide text-4xl md:text-6xl mb-3">
              Trust the <br /> Progress.
            </h1>
            <p className="leading-6 mb-3">
              Crosscourt is a basketball-inspired social club built around thoughtfully designed
              spaces, a community bonded by team-sport, and member driven experiences that enable
              professionals in the game of life to elevate personally and professionally.
            </p>
            <p className="font-shapiro95_super_wide text-sm md:text-lg mb-3">
              Unlock your potential through team sport.
            </p>
            <Button to={ROUTES.MEMBERSHIPS}>Join Crosscourt</Button>
          </div>
        </div>
      </div>
      <ExpandedLayout
        backgroundImage={purpleTexture}
        className="bg-cover bg-no-repeat bg-center bg-cc-blue-700 px-6 py-10 md:py-14 relative"
      >
        <div className="md:max-w-lg mx-auto text-center">
          <p className="font-shapiro95_super_wide text-lg md:text-2xl text-cc-black">
            {promoCode ? (
              <>
                <span className="block text-4xl md:text-5xl">
                  <span className="text-black/50 line-through decoration-success">
                    {formatPrice(promoCode.product.price)}
                  </span>
                  <span className="ml-4 mr-1">{formatPrice(promoCode.discountedPrice)}</span>
                  <sup className="text-2xl md:text-3xl">/mo.</sup>
                </span>
                <span className="block">{discountProductText}</span>
              </>
            ) : (
              'Join Crosscourt today.'
            )}
          </p>
          <InputTextField
            name="email"
            variant="expanded"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            formik={false}
            error={emailError}
            dark
            rightIcon
            icon={
              loading ? (
                <Spinner />
              ) : (
                <span
                  onClick={handleSignup}
                  className="text-cc-purple hover:text-cc-purple-700 cursor-pointer"
                >
                  Submit
                </span>
              )
            }
            className="my-3 md:my-4"
          />
          <p className="font-shapiro95_super_wide text-sm text-cc-black">
            No strings attached: cancel anytime.
          </p>
        </div>
      </ExpandedLayout>
    </SectionLayout>
  );
};

export default UnlockYourPotential;
