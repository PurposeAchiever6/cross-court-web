import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import InputSelectField from 'shared/components/InputSelectField';

const InputDateContainer = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 1rem;
    line-height: 1.5rem;
    color: ${(props) => props.labelColor};
    margin: 0 0 0.75rem;
    text-transform: uppercase;
    font-weight: bold;
    font-weight: 400;
  }

  small {
    text-align: right;
    margin-top: 1rem;
    color: ${colors.errorRed};
    text-transform: initial;
    font-family: shapiro45_welter_extd;
  }
`;

const generateArrayOfDays = () => {
  let days = [];

  for (let i = 1; i <= 31; i++) {
    days.push({ value: i, label: ('0' + i).slice(-2) });
  }

  return days;
};

const generateArrayOfMonths = () => {
  let months = [];

  for (let i = 1; i <= 12; i++) {
    months.push({ value: i, label: ('0' + i).slice(-2) });
  }

  return months;
};

const generateArrayOfYears = () => {
  let thisYear = new Date().getFullYear();
  let min = thisYear - 80;
  let years = [];

  for (let i = thisYear; i >= min; i--) {
    years.push({ value: i, label: i });
  }

  return years;
};

const DAY_OPTS = generateArrayOfDays();
const MONTH_OPTS = generateArrayOfMonths();
const YEAR_OPTS = generateArrayOfYears();

const InputDateField = ({
  name,
  error,
  labelText,
  disabled,
  showLabel,
  displayErrorMsg,
  labelColor,
  dayOptions,
  monthOptions,
  yearOptions,
  className,
}) => (
  <InputDateContainer labelColor={labelColor} className={className}>
    {showLabel && <label htmlFor={name}>{labelText}</label>}
    <div className="flex justify-between text-sm">
      <InputSelectField
        name={`${name}Month`}
        disabled={disabled}
        displayErrorMsg={true}
        options={monthOptions}
        placeholder="Month"
        className="mr-1 flex-grow"
        formik
      />
      <InputSelectField
        name={`${name}Day`}
        disabled={disabled}
        displayErrorMsg={true}
        options={dayOptions}
        placeholder="Day"
        className="mr-1 flex-grow"
        formik
      />
      <InputSelectField
        name={`${name}Year`}
        disabled={disabled}
        displayErrorMsg={true}
        options={yearOptions}
        placeholder="Year"
        className="flex-grow"
        formik
      />
    </div>
    {displayErrorMsg && error && (
      <small id={`${name}-error`} className="form-text">
        {error}
      </small>
    )}
  </InputDateContainer>
);

InputDateField.defaultProps = {
  error: null,
  labelText: null,
  disabled: false,
  showLabel: true,
  displayErrorMsg: true,
  labelColor: '#9999FF',
  dayOptions: DAY_OPTS,
  monthOptions: MONTH_OPTS,
  yearOptions: YEAR_OPTS,
  className: '',
};

InputDateField.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  labelText: PropTypes.string,
  disabled: PropTypes.bool,
  showLabel: PropTypes.bool,
  displayErrorMsg: PropTypes.bool,
  labelColor: PropTypes.string,
  dayOptions: PropTypes.arrayOf(PropTypes.shape()),
  monthOptions: PropTypes.arrayOf(PropTypes.shape()),
  yearOptions: PropTypes.arrayOf(PropTypes.shape()),
  className: PropTypes.string,
};

export default InputDateField;
