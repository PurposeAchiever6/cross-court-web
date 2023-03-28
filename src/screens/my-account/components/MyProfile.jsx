import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import Tooltip from 'shared/components/Tooltip';
import ROUTES from 'shared/constants/routes';
import { formatPhoneNumber } from 'shared/utils/helpers';
import missingProfileImg from 'shared/images/missing-profile-image.png';
import EditSvg from 'shared/components/svg/EditSvg';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import ToggleButton from 'shared/components/ToggleButton';

import { referralText } from 'shared/constants/referrals';
import { editProfileInit, showEditProfile } from '../actionCreators';
import { getEditProfileLoading, getShowEditProfile } from '../reducer';
import EditProfileForm from './EditProfileForm';

const detailRowClasses = 'flex flex-col mb-8 text-lg';
const titleClasses = 'font-shapiro95_super_wide';

const MyProfile = ({ profile, showTitle = true }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [inviteFriendTextCopied, setInviteFriendTextCopied] = useState(false);
  const [applyCCCashToSubscription, setApplyCCCashToSubscription] = useState(
    profile.applyCcCashToSubscription
  );

  const editProfileAction = (values) => dispatch(editProfileInit(values));
  const showEditProfileAction = () => dispatch(showEditProfile());

  const editProfileLoading = useSelector(getEditProfileLoading);
  const showEditProfileForm = useSelector(getShowEditProfile);

  const dateOfBirth = new Date(profile.birthday);
  const { defaultPaymentMethod } = profile;

  const handleApplyCCCashToSubscriptionChange = () => {
    const value = !applyCCCashToSubscription;
    setApplyCCCashToSubscription(value);
    editProfileAction({ applyCcCashToSubscription: value });
  };

  const ccCashTooltip = `
    Only one discount can apply to an invoice; it’s not possible to stack two or more discounts.
    If a discount is already being applied to your membership, CC CA$H discount will not be applied.
    The maximum amount of CC CA$H that can be applied to a subscription is
    $${profile.maxCcCashSubscriptionDiscount}
  `;

  return (
    <div className="relative p-8">
      <button type="button" onClick={showEditProfileAction} className="absolute right-8 top-10">
        <EditSvg />
      </button>
      {showTitle && <h3 className="font-shapiro95_super_wide mb-3 text-3xl">MY ACCOUNT</h3>}

      <div className={detailRowClasses}>
        <span className={titleClasses}>EMAIL</span>
        <span className="truncate">{profile.email}</span>
      </div>
      {showEditProfileForm ? (
        <EditProfileForm
          profile={profile}
          editProfileAction={editProfileAction}
          editProfileLoading={editProfileLoading}
        />
      ) : (
        <>
          <div className={detailRowClasses}>
            <span className={titleClasses}>PROFILE IMAGE</span>
            <img
              className="w-16 h-16 object-cover rounded-full"
              src={profile.imageUrl ? profile.imageUrl : missingProfileImg}
              alt="Profile"
            />
          </div>
          <div className={detailRowClasses}>
            <span className={titleClasses}>FULL NAME</span>
            <span className="truncate">{`${profile.firstName} ${profile.lastName}`}</span>
          </div>
          <div className={detailRowClasses}>
            <span className={titleClasses}>PHONE</span>
            <span className="truncate">
              {profile.phoneNumber ? formatPhoneNumber(profile.phoneNumber) : 'No phone'}
            </span>
          </div>
          <div className={detailRowClasses}>
            <span className={titleClasses}>DATE OF BIRTH</span>
            <span className="truncate">
              {profile.birthday
                ? dateOfBirth.toLocaleDateString('en-US', { timeZone: 'UTC' })
                : '-'}
            </span>
          </div>
          <div className={detailRowClasses}>
            <span className={titleClasses}>GENDER</span>
            <span className="truncate">{profile.gender || '-'}</span>
          </div>
          <div className={detailRowClasses}>
            <span className={titleClasses}>INSTAGRAM</span>
            <span className="truncate">
              {profile.instagramUsername ? (
                <Link
                  to={{ pathname: profile.instagramProfile }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profile.instagramUsername}
                </Link>
              ) : (
                '-'
              )}
            </span>
          </div>
          <div className={detailRowClasses}>
            <span className={titleClasses}>BILLING</span>
            <span className="mr-7">
              {defaultPaymentMethod ? `Card ending in ${defaultPaymentMethod.last4}` : 'Not set'}
            </span>
            <PrimaryButton
              className="text-left"
              fontSize="0.75rem"
              lineHeight="1"
              onClick={() => history.push(ROUTES.PAYMENT_METHODS_DEFAULT)}
            >
              Edit
            </PrimaryButton>
          </div>
          <div className={detailRowClasses}>
            <span className={titleClasses}>SKILL RATING</span>
            <span className="mr-7">{profile?.skillRating ?? 'Not set'}</span>
            <PrimaryButton
              className="text-left"
              fontSize="0.75rem"
              lineHeight="1"
              onClick={() =>
                history.push({
                  pathname: ROUTES.RATING,
                  state: {
                    isEdit: true,
                    currentValue: profile.skillRating,
                    from: location.pathname,
                  },
                })
              }
            >
              Edit
            </PrimaryButton>
          </div>
          <div className={detailRowClasses}>
            <span className={titleClasses}>REFERRAL CODE</span>
            <span>{profile.referralCode}</span>
          </div>
          <div className="text-lg mb-3">
            <div className="flex">
              <span className={titleClasses}>CC CA$H</span>
              <Tooltip
                variant="purple"
                tooltip="Accumulate CC CA$H through membership referrals and attending certain sessions that have a discount offer"
                className="ml-3"
              >
                <FontAwesomeIcon icon={faInfoCircle} className="text-cc-purple cursor-pointer" />
              </Tooltip>
            </div>
            <span className="font-shapiro95_super_wide text-3xl block">{`$${Number(
              profile.ccCash
            )}`}</span>
          </div>
          {profile.activeSubscription && (
            <>
              <div className="flex items-center">
                <span className={`${titleClasses} text-sm`}>
                  APPLY CC CA$H TO <br /> NEXT MONTH'S INVOICE
                </span>
                <Tooltip variant="purple" tooltip={ccCashTooltip} className="ml-3">
                  <FontAwesomeIcon icon={faInfoCircle} className="text-cc-purple cursor-pointer" />
                </Tooltip>
              </div>
              <ToggleButton
                size="4xl"
                value={applyCCCashToSubscription}
                onChange={handleApplyCCCashToSubscriptionChange}
                className="uppercase text-xs sm:text-sm md:text-xl mb-5"
              />
            </>
          )}
          <CopyToClipboard
            onCopy={() => setInviteFriendTextCopied(true)}
            text={referralText(profile.referralCode)}
          >
            <PrimaryButton w="100%" className="mb-2">
              <FontAwesomeIcon icon={faExternalLinkAlt} />{' '}
              {inviteFriendTextCopied ? 'Copied' : 'Invite a friend'}
            </PrimaryButton>
          </CopyToClipboard>
          <PrimaryButton to={ROUTES.REFERRALS} inverted w="100%">
            Referral History
          </PrimaryButton>
        </>
      )}
    </div>
  );
};

MyProfile.propTypes = {
  profile: PropTypes.shape().isRequired,
  showTitle: PropTypes.bool,
};

export default MyProfile;
