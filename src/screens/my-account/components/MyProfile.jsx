import React, { useState } from 'react';
import styled from 'styled-components';
import { object, bool } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from 'shared/components/svg/EditIcon.svg';
import { formatPhoneNumber } from 'shared/utils/helpers';
import { editProfileInit, showEditProfile } from '../actionCreators';
import { getEditProfileLoading, getShowEditProfile } from '../reducer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import EditProfileForm from './EditProfileForm';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import { useHistory, useLocation } from 'react-router-dom';
import ROUTES from 'shared/constants/routes';

const MyProfileContainer = styled.div`
  > button {
    padding: 0;
    margin: 0;
    background-color: transparent;
    border: 0;
    position: absolute;
    top: 2.4rem;
    right: 2rem;
    cursor: pointer;
  }
`;

const detailRowClasses = 'flex flex-col mb-8 text-lg';
const titleClasses = 'font-shapiro95_super_wide';

const MyProfile = ({ profile, showTitle = true }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [copied, setCopied] = useState(false);
  const editProfileAction = (values) => dispatch(editProfileInit(values));
  const showEditProfileAction = () => dispatch(showEditProfile());
  const editProfileLoading = useSelector(getEditProfileLoading);
  const showEditProfileForm = useSelector(getShowEditProfile);
  const shareText = 'Use my link to sign up.';
  const shareUrl = `${window.location.origin}`;
  const shareTextAndUrl = `${shareText} ${shareUrl}`;

  const handleCopy = () => {
    const input = document.createElement('input');
    input.setAttribute('value', shareTextAndUrl);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    setCopied(true);
  };

  return (
    <MyProfileContainer className="relative p-8">
      <button type="button" onClick={showEditProfileAction}>
        <EditIcon />
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
            <span className={titleClasses}>SKILL RATING</span>
            <div className="flex justify-between items-center">
              <span>{profile.skillRating ? profile.skillRating : 'Not set'}</span>
              <PrimaryButton
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
          </div>
          <div className={detailRowClasses}>
            <PrimaryButton className="invite-a-friend-button" onClick={handleCopy} double w="100%">
              <FontAwesomeIcon icon={faExternalLinkAlt} /> {copied ? 'COPIED' : 'INVITE A FRIEND'}
            </PrimaryButton>
          </div>
        </>
      )}
    </MyProfileContainer>
  );
};

MyProfile.propTypes = {
  profile: object.isRequired,
  showTitle: bool,
};

export default MyProfile;
