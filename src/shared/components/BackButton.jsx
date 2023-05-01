import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import CaretLeftSvg from 'shared/components/svg/CaretLeftSvg';

const BackButton = ({ onClick, className }) => {
  const history = useHistory();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      history.goBack();
    }
  };

  return (
    <div
      className={`border border-white/30 flex items-center p-3 cursor-pointer hover:border-white/60 transition-all ${className}`}
      onClick={handleClick}
    >
      <CaretLeftSvg className="w-4 h-4" />
    </div>
  );
};

BackButton.defaultProps = {
  onClick: null,
  className: '',
};

BackButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default BackButton;
