import React from 'react';
import PropTypes from 'prop-types';

import ExclamationSvg from 'shared/components/svg/ExclamationSvg';
import CrossSvg from 'shared/components/svg/CrossSvg';

const Toast = ({ variant, title, description, showIcon, closeToast }) => {
  const icon = (() => {
    if (!showIcon) {
      return;
    }

    switch (variant) {
      case 'error':
        return <ExclamationSvg className="w-6 shrink-0 mr-4" />;
      default:
    }
  })();

  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex items-center">
        {icon}
        <div className="mr-4 sm:mr-6">
          {title && <h3 className="shapiro95_super_wide">{title}</h3>}
          <p className="text-sm">{description}</p>
        </div>
      </div>
      <button onClick={closeToast} type="button">
        <CrossSvg className="w-4" />
      </button>
    </div>
  );
};

Toast.defaultProps = {
  title: null,
  showIcon: true,
  variant: null,
};

Toast.propTypes = {
  title: PropTypes.string,
  showIcon: PropTypes.bool,
  variant: PropTypes.string,
  description: PropTypes.string.isRequired,
  closeToast: PropTypes.func.isRequired,
};

export default Toast;
