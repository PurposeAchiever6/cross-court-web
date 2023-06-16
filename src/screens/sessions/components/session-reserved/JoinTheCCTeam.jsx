import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ROUTES from 'shared/constants/routes';
import { titleize } from 'shared/utils/helpers';
import { discountAmountText, discountTimeText } from 'screens/promo-codes/utils';
import { initialLoad as getAvailableProducts } from 'screens/products/actionCreators';
import { getFeaturedRecurringProductPromoCode } from 'screens/products/reducer';
import theSessionOfficialBgImg from 'screens/sessions/images/first-session-reserved/join-the-cc-team-bg-image.jpeg';
import SectionLayout from 'shared/components/layout/SectionLayout';
import Button from 'shared/components/Button';
import CheckmarkList from 'shared/components/CheckmarkList';

const CHECKMARK_LIST = [
  {
    title: 'Connect',
    subtitle:
      'Our members rediscover their connection to sports, discover new connections to people, and reveal how sport connects to their purpose.',
  },
  {
    title: 'Create',
    subtitle:
      'Whether it’s creating a new move or a new moment we cultivate the creative spirit through sport.',
  },
  {
    title: 'Compete',
    subtitle:
      'We believe in creating an environment where competition isn’t about playing against each other but playing for each other.',
  },
];

const JoinTheCCTeam = () => {
  const dispatch = useDispatch();

  const promoCode = useSelector(getFeaturedRecurringProductPromoCode);
  const validPromoCode = promoCode && promoCode.validForUser;

  useEffect(() => {
    dispatch(getAvailableProducts());
  }, []);

  return (
    <SectionLayout
      backgroundImage={theSessionOfficialBgImg}
      className="bg-no-repeat bg-cover bg-center h-full py-10 lg:py-16"
    >
      <div className="bg-black/80 text-white max-w-screen-sm mx-auto px-4 py-8 lg:px-10 lg:py-10">
        <h1 className="text-center text-cc-purple uppercase border-b border-cc-purple pb-4 mb-8">
          <span className="block font-shapiro95_super_wide text-xl">Join The</span>
          <span className="block font-dharma_gothic_cexbold text-8xl tracking-wide -mt-2">
            CCTeam
          </span>
        </h1>
        {validPromoCode && (
          <div className="font-shapiro95_super_wide text-center uppercase border-b border-cc-purple pb-6 mb-10">
            <span className="block text-5xl mb-2">{discountAmountText(promoCode)} off</span>
            <span className="block text-xl mb-2">{discountTimeText(promoCode)}</span>
            <span className="block">with {titleize(promoCode.product.name)}</span>
          </div>
        )}
        <CheckmarkList list={CHECKMARK_LIST} className="mb-8" />
        <div className="text-center mb-8">
          <Button to={ROUTES.MEMBERSHIPS}>Join Now</Button>
        </div>
      </div>
    </SectionLayout>
  );
};

export default JoinTheCCTeam;
