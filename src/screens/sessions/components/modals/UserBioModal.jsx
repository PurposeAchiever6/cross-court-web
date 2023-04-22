import React from 'react';
import PropTypes from 'prop-types';

import { titleize } from 'shared/utils/helpers';
import Modal from 'shared/components/Modal';
import LineDashedSvg from 'shared/components/svg/LineDashedSvg';

export const UserBioModal = ({ isOpen, closeHandler, user }) => {
  const { fullName, bio } = user;

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler} size="xl">
      <h3 className="font-shapiro95_super_wide text-2xl mb-3">{titleize(fullName)}</h3>
      <LineDashedSvg className="mb-3" />
      <p className="whitespace-pre-wrap text-sm mb-3">{bio}</p>
      <LineDashedSvg />
    </Modal>
  );
};

UserBioModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
};

export default UserBioModal;
