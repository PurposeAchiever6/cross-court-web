import React from 'react';
import styled from 'styled-components';
import { object, bool } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from 'shared/components/svg/EditIcon.svg';
import { editProfileInit, showEditProfile } from '../actionCreators';
import { getEditProfileLoading, getShowEditProfile } from '../reducer';

import EditProfileForm from './EditProfileForm';

const MyProfileContainer = styled.div`
  position: relative;
  padding: 2rem;
  border-bottom: 1px solid #bbbecd;
  h3 {
    font-size: 1.75rem;
    font-weight: 500;
    margin: 0 0 2rem 0;
  }
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
  svg {
    font-size: 1rem;
  }
  .detail-row {
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    .title {
      font-size: 0.9rem;
      font-weight: 600;
      letter-spacing: 0.2rem;
      color: #aaaff3;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }
  }
`;

const MyProfile = ({ profile, showTitle = true }) => {
  const dispatch = useDispatch();

  const editProfileAction = (name, phone) => dispatch(editProfileInit(name, phone));
  const showEditProfileAction = (name, phone) => dispatch(showEditProfile(name, phone));
  const editProfileLoading = useSelector(getEditProfileLoading);
  const showEditProfileForm = useSelector(getShowEditProfile);

  return (
    <MyProfileContainer>
      <button className="edit-btn" type="button" onClick={showEditProfileAction}>
        <EditIcon />
      </button>
      {showTitle && <h3>My Profile</h3>}

      <div className="detail-row">
        <span className="title">email</span>
        <span className="text">{profile.email}</span>
      </div>
      {showEditProfileForm ? (
        <EditProfileForm
          profile={profile}
          editProfileAction={editProfileAction}
          editProfileLoading={editProfileLoading}
        />
      ) : (
        <>
          <div className="detail-row">
            <span className="title">name</span>
            <span className="text">{profile.name}</span>
          </div>
          <div className="detail-row">
            <span className="title">Phone</span>
            <span className="text">{profile.phoneNumber || 'No phone'}</span>
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
