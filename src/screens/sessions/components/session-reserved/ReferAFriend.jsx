import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';

import { referralText } from 'shared/constants/referrals';
import { getUserProfile } from 'screens/my-account/reducer';
import SectionLayout from 'shared/components/layout/SectionLayout';
import Button from 'shared/components/Button';
import spaceLinesBgImg from 'shared/images/backgrounds/space-lines.jpeg';
import CheckmarkList from 'shared/components/CheckmarkList';
import CheckSvg from 'shared/components/svg/CheckSvg';

const ReferAFriend = () => {
  const [copied, setCopied] = useState(false);

  const currentUser = useSelector(getUserProfile);

  const { referralCode } = currentUser;

  const REFERRAL_CODE_PERCENTAGE_DISCOUNT = import.meta.env.VITE_REFERRAL_CODE_PERCENTAGE_DISCOUNT;

  return (
    <SectionLayout
      backgroundImage={spaceLinesBgImg}
      className="bg-no-repeat bg-cover bg-center h-full py-10 lg:py-16 flex justify-center items-center"
    >
      <div className="bg-black text-white max-w-screen-sm mx-auto px-4 py-8 lg:px-10 lg:py-10 lg:transform lg:-translate-y-24">
        <h1 className="font-shapiro95_super_wide text-center text-cc-purple uppercase mb-4">
          <span className="block text-xl">Refer A</span>
          <span className="block text-5xl">Friend</span>
        </h1>
        <div className="font-shapiro95_super_wide text-center border-t border-b border-cc-purple py-4 mb-6">
          <span className="block text-3xl">Give 50% Off</span>
          <span className="block text-xl">Get CC Cash!</span>
        </div>
        <CheckmarkList
          list={[
            { title: 'Invite your friends to CC', subtitle: 'Share your personal promo code.' },
            {
              title: `They get a CC Membership for ${REFERRAL_CODE_PERCENTAGE_DISCOUNT}% off their first month`,
              subtitle: 'Please note: It must be redeemed before attending the first session.',
            },
            { title: 'You get CC Cash', subtitle: 'Use it to buy day-passes, merch and more.' },
          ]}
          className="mb-6"
        />
        <div className="text-center">
          <div className="bg-cc-blue-300 text-cc-purple text-sm px-4 py-3 mb-1">{referralCode}</div>
          <CopyToClipboard onCopy={() => setCopied(true)} text={referralText(referralCode)}>
            <Button className="w-full">{copied ? 'Copied' : 'Invite Friend'}</Button>
          </CopyToClipboard>
          <div
            className={`transition-opacity duration-1000 ${
              copied ? 'opacity-100' : 'h-0 opacity-0'
            }`}
          >
            <div className="bg-cc-blue-300 text-center text-xs py-3 flex justify-center items-center">
              <CheckSvg className="w-4 text-success mr-2" />
              Copied text to clipboard
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};

export default ReferAFriend;
