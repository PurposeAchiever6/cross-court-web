import React from 'react';
import PropTypes from 'prop-types';

const ProgressTracker = ({ steps, noLabels, vertical, className }) => {
  const getHorizontalLabelClass = (index) => {
    const classes = 'mt-2 absolute -bottom-7';

    if (index + 1 === steps.length) {
      return `${classes} right-0`;
    }

    if (index > 0) {
      return `${classes} left-1/2 transform -translate-x-1/2`;
    }

    return classes;
  };

  return (
    <div
      className={`${vertical ? 'flex flex-col justify-between h-full' : 'flex justify-between'} ${
        !noLabels && !vertical ? 'pb-7' : ''
      } ${className}`}
    >
      {steps.map(({ label, active }, index) => (
        <div
          key={index}
          className={
            vertical
              ? `${index + 1 < steps.length ? 'h-full' : 'h-4'}`
              : `${index + 1 < steps.length ? 'w-full' : 'w-4'}`
          }
        >
          <div className="flex items-center h-4">
            <div className={`relative w-4 h-4 shrink-0 ${active ? 'bg-cc-purple' : 'bg-current'}`}>
              {!noLabels && !vertical && (
                <div className={getHorizontalLabelClass(index)}>{label}</div>
              )}
            </div>
            {!noLabels && vertical && <div className="ml-4">{label}</div>}
          </div>
          {index + 1 < steps.length && (
            <div
              className={`border-dashed ${
                vertical ? 'h-full border-l ml-2' : 'w-full border-t border-dashed -mt-2'
              } ${active ? 'border-cc-purple' : 'border-current'}`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

ProgressTracker.defaultProps = {
  className: '',
  noLabels: false,
  vertical: true,
};

ProgressTracker.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  noLabels: PropTypes.bool,
  vertical: PropTypes.bool,
  className: PropTypes.string,
};

export default ProgressTracker;
