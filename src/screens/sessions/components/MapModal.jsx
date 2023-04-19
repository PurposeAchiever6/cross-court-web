import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import Map from 'shared/components/Map/Map';

const MapModal = ({ isOpen, closeHandler, location }) => (
  <Modal isOpen={isOpen} closeHandler={closeHandler} size="xl">
    <div className="h-[30rem]">
      <Map locations={[location]} />
    </div>
  </Modal>
);

MapModal.defaultProps = {
  location: {},
};

MapModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  location: PropTypes.shape(),
};

export default MapModal;
