import React from 'react';
import PropTypes from 'prop-types';

import Label from 'shared/components/Label';
import InputSelectField from 'shared/components/InputSelectField';

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
  label,
  labelColor,
  error,
  hint,
  disabled,
  dayOptions,
  monthOptions,
  yearOptions,
  className,
}) => (
  <div className={className}>
    {label && (
      <Label className="mb-1 uppercase text-sm md:text-base" htmlFor={name} color={labelColor}>
        {label}
      </Label>
    )}
    <div className="flex justify-between">
      <InputSelectField
        name={`${name}Month`}
        disabled={disabled}
        options={monthOptions}
        placeholder="Month"
        className="mr-1 flex-grow"
      />
      <InputSelectField
        name={`${name}Day`}
        disabled={disabled}
        options={dayOptions}
        placeholder="Day"
        className="mr-1 flex-grow"
      />
      <InputSelectField
        name={`${name}Year`}
        disabled={disabled}
        options={yearOptions}
        placeholder="Year"
        className="flex-grow"
      />
    </div>
    {hint && (
      <div
        className={`font-shapiro45_welter_extd text-xs text-right mt-2 ${
          error ? 'text-red-500' : 'text-current opacity-70'
        }`}
      >
        {hint}
      </div>
    )}
    {error && !hint && (
      <div className="font-shapiro45_welter_extd text-xs text-right text-red-500 mt-2">{error}</div>
    )}
  </div>
);

InputDateField.defaultProps = {
  label: null,
  labelColor: null,
  error: null,
  hint: null,
  disabled: false,
  dayOptions: DAY_OPTS,
  monthOptions: MONTH_OPTS,
  yearOptions: YEAR_OPTS,
  className: '',
};

InputDateField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  error: PropTypes.string,
  hint: PropTypes.string,
  disabled: PropTypes.bool,
  dayOptions: PropTypes.arrayOf(PropTypes.shape()),
  monthOptions: PropTypes.arrayOf(PropTypes.shape()),
  yearOptions: PropTypes.arrayOf(PropTypes.shape()),
  className: PropTypes.string,
};

export default InputDateField;
