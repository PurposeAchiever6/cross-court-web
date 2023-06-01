import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import Map from 'shared/components/Map/Map';

const MapModal = ({ isOpen, closeHandler, location }) => (
  <Modal isOpen={isOpen} closeHandler={closeHandler} title={location.name} size="xl">
    <div className="h-[25rem] mb-4">
      <Map locations={[location]} />
    </div>
    <div className="text-sm">
      <span className="font-shapiro95_super_wide">Parking:</span> There is a gated parking lot
      attached to the club for 20-30 vehicles. Please pull all the way in and avoid double parking
      or blocking the driveway.
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
