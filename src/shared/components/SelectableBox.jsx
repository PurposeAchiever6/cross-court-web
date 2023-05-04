import React from 'react';
import PropTypes from 'prop-types';

import DisabledSvg from 'shared/components/svg/DisabledSvg';

const SelectableBox = ({ children, onClick, selected, variant, disabled, className }) => {
  const variantClass = (() => {
    switch (variant) {
      case 'white':
        return {
          content: 'text-black border-2 border-r-0 border-black',
          button: 'border-2 border-black',
        };
      case 'blue-dark':
        return { content: 'bg-cc-blue-500 text-white', button: 'bg-cc-blue-700' };
      case 'blue-light':
      default:
        return { content: 'bg-cc-blue-100 text-white', button: 'bg-cc-blue-500' };
    }
  })();

  return (
    <div className={className}>
      <div className="flex">
        <div className={`p-4 ${variantClass.content}`}>{children}</div>
        <button
          onClick={() => (disabled ? null : onClick())}
          type="button"
          className={`relative flex justify-center items-center w-20 shrink-0 ${
            variantClass.button
          } ${disabled ? 'pointer-events-none' : ''}`}
        >
          {disabled ? (
            <DisabledSvg className="w-8 h-8 text-cc-gray-600" />
          ) : (
            <>
              <div className="absolute-center rounded-full border-2 border-cc-purple w-8 h-8" />
              {selected && <div className="rounded-full bg-cc-purple w-5 h-5" />}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

SelectableBox.defaultProps = {
  selected: false,
  className: '',
  variant: 'blue-light',
  disabled: false,
};

SelectableBox.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default SelectableBox;
