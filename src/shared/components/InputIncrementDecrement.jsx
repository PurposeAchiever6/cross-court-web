import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import InputMask from 'react-input-mask';
import Label from 'shared/components/Label';

export const OPERATIONS = {
  PLUS: 'PLUS',
  MINUS: 'MINUS',
};

const Input = ({ ...props }) => (
  <input
    className="text-center font-shapiro95_super_wide text-cc-black text-opacity-70 focus:text-opacity-100 bg-gray-100 text-5xl my-4 w-full"
    autoComplete="off"
    {...props}
  />
);

const InputIncrementDecrement = ({
  name,
  placeholder,
  maxLength,
  labelColor,
  onClick,
  onChange,
  value,
  mask,
  className,
  error,
}) => (
  <div className={`flex flex-col ${className}`}>
    <div className="border bg-gray-100 flex flex-col items-center p-4">
      <Label
        className="mb-1 uppercase text-sm md:text-base font-shapiro45_welter_extd"
        htmlFor={name}
        color={labelColor}
      >
        {name}
      </Label>
      {mask ? (
        <InputMask mask={mask} value={value} onChange={(e) => onChange(e)}>
          {(maskProps) => (
            <Input name={name} maxLength={maxLength} placeholder={placeholder} {...maskProps} />
          )}
        </InputMask>
      ) : (
        <Input
          name={name}
          maxLength={maxLength}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
        />
      )}
      <div className="flex">
        <button
          className="flex items-center justify-center bg-opacity-80 hover:bg-opacity-100 bg-cc-black rounded-full w-10 h-10 text-white text-2xl mr-4"
          type="button"
          onClick={() => onClick(OPERATIONS.MINUS)}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <button
          className="flex items-center justify-center bg-opacity-80 hover:bg-opacity-100 bg-cc-black rounded-full w-10 h-10 text-white text-2xl ml-4"
          type="button"
          onClick={() => onClick(OPERATIONS.PLUS)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
    {error && (
      <div className="pt-1 font-shapiro45_welter_extd text-xs text-right text-red-500 mt-px">
        {error}
      </div>
    )}
  </div>
);

InputIncrementDecrement.defaultProps = {
  placeholder: '',
  maxLength: '',
  labelColor: 'black',
  className: '',
  value: '',
  mask: undefined,
  error: null,
};

InputIncrementDecrement.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  maxLength: PropTypes.string,
  labelColor: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string,
  className: PropTypes.string,
  mask: PropTypes.string,
  error: PropTypes.string,
};

export default InputIncrementDecrement;
