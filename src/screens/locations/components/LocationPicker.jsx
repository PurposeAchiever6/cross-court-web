import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colors from 'shared/styles/constants';
import { transparentize } from 'polished';

const LocationPickerContainer = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  .location-picker__control {
    border: 0;
    border-radius: 0;
    padding: 1.5rem;
  }

  .location-picker__indicator-separator {
    display: none;
  }

  .location-picker__indicator {
    color: ${colors.black};
  }

  .location-picker__menu {
    justify-content: center;
    margin-top: 0;

    .location-picker__menu-list {
      justify-content: center;

      .location-picker__option {
        cursor: pointer;
        text-align: center;
        padding: 1rem;
        font-size: 1rem;
        &:hover {
          background-color: ${transparentize(0.9, `#9999ff`)};
        }
      }

      .location-picker__option--is-selected {
        background-color: #9999ff;
        &:hover {
          background-color: #9999ff;
        }
      }
    }
  }

  .location-picker__value-container--has-value {
    justify-content: center;
    padding: 0.5rem;
  }

  .location-picker__placeholder {
    text-align: center;
    padding: 1rem;
    font-size: 1.5rem;
    width: 100%;
    color: ${colors.black};
  }
`;

const LocationPicker = ({ availableLocations, selectedLocation, setLocationHandler }) => {
  const selectedValue = availableLocations.find((location) => location.id === selectedLocation);
  const locationsWithoutNull = availableLocations.filter((location) => location.id !== null);
  const oneLocation = locationsWithoutNull.length === 1;

  return (
    <LocationPickerContainer>
      {oneLocation ? (
        <p className="text-center text-2xl py-4 font-shapiro95_super_wide uppercase">
          {selectedValue.name}
        </p>
      ) : (
        <Select
          options={availableLocations}
          classNamePrefix="location-picker"
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          onChange={(option) => setLocationHandler(option.id)}
          value={selectedValue}
          isSearchable={false}
        />
      )}
    </LocationPickerContainer>
  );
};

LocationPicker.propTypes = {
  availableLocations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  selectedLocation: PropTypes.number,
  setLocationHandler: PropTypes.func.isRequired,
};
export default LocationPicker;
