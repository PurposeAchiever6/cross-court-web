import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import { referralText } from 'shared/constants/referrals';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const STEPS = [
  {
    title: 'INVITE YOUR FRIENDS TO CC',
    subtitle: 'Share your personal promo code',
  },
  {
    title: 'THEY GET A CC MEMBERSHIP',
    subtitle: 'For 50% off their first month',
  },
  {
    title: 'YOU GET CC CA$H',
    subtitle: 'Buy drop in sessions, merch and more',
  },
];

const ReferAFriend = ({ code, className }) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className={className}>
      <p className="font-shapiro95_super_wide text-2xl">REFER A FRIEND</p>
      <p>Give 50% off, get CC CA$H</p>
      <div className="my-4 text-sm md:text-base">
        {STEPS.map((step, i) => (
          <div key={`step-${i}`} className="flex items-center px-4 mb-1">
            <div className="bg-cc-purple rounded-full flex items-center justify-center w-8 h-8 md:w-10 md:h-10 m-4 font-dharma_gothic_cheavy_italic text-2xl md:text-3xl text-white">
              {i + 1}
            </div>
            <div className="flex flex-col w-3/4">
              <p>{step.title}</p>
              <p>{step.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 w-full">
        {code && <div className="bg-gray-300 w-full p-2 mb-1 text-center">{code}</div>}
        <CopyToClipboard onCopy={() => setCopied(true)} text={referralText(code)}>
          <PrimaryButton w="100%" className="mb-2">
            <FontAwesomeIcon icon={faExternalLinkAlt} /> {copied ? 'Copied' : 'Invite a friend'}
          </PrimaryButton>
        </CopyToClipboard>
      </div>
    </div>
  );
};

ReferAFriend.defaultProps = {
  code: null,
  className: 'flex flex-col items-center',
};

ReferAFriend.propTypes = {
  code: PropTypes.string,
  className: PropTypes.string,
};

export default ReferAFriend;
