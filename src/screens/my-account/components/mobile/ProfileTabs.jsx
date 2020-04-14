import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colors from 'shared/styles/constants';
import MyProfile from '../MyProfile';
import MyCredits from './MyCredits';

const ProfileTabsContainer = styled.div`
  border-bottom: 1px solid ${colors.grey};

  .tabs {
    display: flex;
    justify-content: space-around;
    font-size: 1.7rem;
    margin-top: 1rem;
    font-weight: 200;
    color: ${colors.grey};
  }

  .selected {
    font-weight: 500;
    color: ${colors.black};
  }
`;

const ProfileTabs = ({ profile, editProfileLoading }) => {
  const [showCredits, setShowCredits] = useState(false);

  return (
    <ProfileTabsContainer>
      <div className="tabs">
        <span className={!showCredits && 'selected'} onClick={() => setShowCredits(false)}>
          My Account
        </span>
        <span className={showCredits && 'selected'} onClick={() => setShowCredits(true)}>
          My Credits
        </span>
      </div>
      {showCredits ? (
        <MyCredits credits={profile.credits} />
      ) : (
        <MyProfile profile={profile} showTitle={false} editProfileLoading={editProfileLoading} />
      )}
    </ProfileTabsContainer>
  );
};

ProfileTabs.propTypes = {
  profile: PropTypes.object.isRequired,
  editProfileLoading: PropTypes.bool,
};

export default ProfileTabs;
