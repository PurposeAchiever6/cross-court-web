import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { isNil } from 'ramda';
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
        text-align: center;
        padding: 1rem;
        font-size: 1.75rem;
        &:hover {
          background-color: ${transparentize(0.5, `#9999ff`)};
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

    .location-picker__single-value {
      font-size: 1.5rem;
      font-weight: bold;
    }
  }

  .location-picker__placeholder {
    text-align: center;
    padding: 1rem;
    font-size: 1.75rem;
    width: 100%;
    color: ${colors.black};
  }

  .address-container {
    background-color: #9999ff;
    color: ${colors.white};
    text-align: center;
    padding: 1rem;
  }
`;

const LocationPicker = ({ availableLocations, selectedLocation, setLocationHandler }) => {
  const selectedValue = availableLocations.find(location => location.id === selectedLocation);

  return (
    <LocationPickerContainer>
      <Select
        options={availableLocations}
        classNamePrefix="location-picker"
        getOptionLabel={option => option.name}
        getOptionValue={option => option.id}
        onChange={option => setLocationHandler(option.id)}
        value={selectedValue}
        isSearchable={false}
      />
      {isNil(selectedValue.direction) ? null : (
        <div className="address-container shapiro95_super_wide">
          <span>{selectedValue.direction}</span>
        </div>
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
  selectedLocation: PropTypes.object,
  setLocationHandler: PropTypes.func.isRequired,
};
export default LocationPicker;
