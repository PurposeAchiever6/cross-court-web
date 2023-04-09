import React, { useState } from 'react';
import PropTypes from 'prop-types';

import LocationSvg from 'shared/components/svg/LocationSvg';
import InputSelectField from 'shared/components/InputSelectField';
import MapModal from 'screens/locations/components/MapModal';

const LocationPicker = ({ availableLocations, selectedLocationId, setLocationHandler }) => {
  const [showMapModal, setShowMapModal] = useState(false);

  const oneLocation = availableLocations.length === 1;
  const selectedLocation = availableLocations.find(
    (location) => location.id === selectedLocationId
  );
  const locationsOptions = availableLocations.map((location) => ({
    value: location.id,
    label: location.name,
  }));

  return (
    <>
      <div className="flex items-center">
        <LocationSvg
          onClick={() => setShowMapModal(true)}
          className="text-cc-purple w-8 mr-3 -mt-1 cursor-pointer"
        />
        {oneLocation ? (
          <span className="font-shapiro95_super_wide texl-lg sm:text-xl">
            {selectedLocation?.name}
          </span>
        ) : (
          <InputSelectField
            name="location"
            options={locationsOptions}
            value={selectedLocationId}
            onChange={(option) => setLocationHandler(option.value)}
            formik={false}
            className="w-40"
          />
        )}
      </div>
      <MapModal
        isOpen={showMapModal}
        closeHandler={() => setShowMapModal(false)}
        location={selectedLocation}
      />
    </>
  );
};

LocationPicker.defaultProps = {
  selectedLocationId: '',
};

LocationPicker.propTypes = {
  availableLocations: PropTypes.arrayOf(PropTypes.shape()),
  setLocationHandler: PropTypes.func.isRequired,
  selectedLocationId: PropTypes.number,
};
export default LocationPicker;
