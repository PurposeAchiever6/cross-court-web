import React from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

import MapMarker from './MapMarker';
import styles from './styles';

const getMapBounds = (map, maps, locations) => {
  const bounds = new maps.LatLngBounds();

  locations.forEach(location => {
    bounds.extend(new maps.LatLng(location.lat, location.lng));
  });

  return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, locations) => {
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, locations);

  // Fit map to bounds
  map.fitBounds(bounds);

  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

const Map = ({ locations, selectedLocation, setLocationHandler }) => (
  <div style={{ height: '82.5vh', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyA-GOpIwemLp-zCfVmFCTeRjRikXjnCmf0' }}
      center={{
        lat: 34.0688791,
        lng: -118.2711009,
      }}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, locations)}
      defaultZoom={15}
      zoom={15}
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
      id: PropTypes.number.isRequired,
      lat: PropTypes.string.isRequired,
      lng: PropTypes.string.isRequired,
    })
  ),
  selectedLocation: PropTypes.string.isRequired,
  setLocationHandler: PropTypes.func.isRequired,
};

export default Map;
