import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const ArButton = ({ children, loading, ...props }) => {
  const { link, inverted, double, font, className } = props;
  return (
    <Link
      to={link}
      className={`ar-button${inverted ? ' inverted' : ''}${double ? ' double' : ''}${
        font ? ` ${font}` : ''
      }${className ? ` ${className}` : ''}`}
    >
      <div className="ar-button-inner">
        {loading ? <FontAwesomeIcon className="spinner" icon={faCircleNotch} /> : children}
      </div>
      {double && <div className="double-drop"></div>}
    </Link>
  );
};

export default ArButton;
