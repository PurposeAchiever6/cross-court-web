import React from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

import MapMarker from './MapMarker';
import styles from './styles';

const Map = ({ locations, selectedLocation, setLocationHandler }) => (
  <div style={{ height: '81.7vh', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyA-GOpIwemLp-zCfVmFCTeRjRikXjnCmf0' }}
      defaultCenter={{
        lat: 34.0688791,
        lng: -118.2711009,
      }}
      defaultZoom={13}
      options={{ styles }}
    >
      {locations.map(location => (
        <MapMarker
          key={location.id}
          lat={location.lat}
          lng={location.lng}
          id={location.id}
          selected={location.id === selectedLocation}
          onClickHandler={() => setLocationHandler(location.id)}
        />
      ))}
    </GoogleMapReact>
  </div>
);

Map.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      lat: PropTypes.string.isRequired,
      lng: PropTypes.string.isRequired,
    })
  ),
  selectedLocation: PropTypes.string.isRequired,
  setLocationHandler: PropTypes.func.isRequired,
};

export default Map;
