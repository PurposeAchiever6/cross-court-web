import React from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import MapMarker from './MapMarker';
import styles from './styles';
import styled from 'styled-components';

const LA_CENTER = {
  lat: 34.0688791,
  lng: -118.2711009,
};

const getMapBounds = (maps, locations) => {
  const bounds = new maps.LatLngBounds();

  [...locations, LA_CENTER].forEach((location) => {
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
  const bounds = getMapBounds(maps, locations);

  // Fit map to bounds
  map.fitBounds(bounds);

  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

const env = runtimeEnv();
const GOOGLE_MAPS_API_KEY = env.REACT_APP_GOOGLE_MAPS_API_KEY;

const LocationsPageContainer = styled.div`
  height: 40vh;

  @media (min-width: 768px) {
    height: calc(100vh - 4rem);
  }
`;

const Map = ({ locations, selectedLocation, setLocationHandler }) => {
  return (
    <LocationsPageContainer className="w-full md:min-h-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
        center={{
          lat: LA_CENTER.lat,
          lng: LA_CENTER.lng,
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, locations)}
        defaultZoom={15}
        zoom={15}
        options={{ styles }}
      >
        {locations.map((location) => (
          <MapMarker
            key={location.id}
            lat={location.lat}
            lng={location.lng}
            id={location.id}
            location={location}
            selected={location.id === selectedLocation}
            onClickHandler={() => setLocationHandler(location.id)}
            hoverDistance={100}
          />
        ))}
      </GoogleMapReact>
    </LocationsPageContainer>
  );
};

Map.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    })
  ),
  selectedLocation: PropTypes.number,
  setLocationHandler: PropTypes.func.isRequired,
};

export default Map;
