import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Collapsible = ({ text, children, inverse, className }) => {
  const [open, setOpen] = useState(false);

  const toggleContent = () => setOpen(!open);

  return (
    <div className={className}>
      <div
        className={`flex items-center cursor-pointer ${
          inverse ? 'flex-row-reverse justify-end' : ''
        }`}
        onClick={toggleContent}
      >
        {text}
        <FontAwesomeIcon
          className={`${inverse ? 'mr-2' : 'ml-2'} transition-transform ${
            open ? 'transform rotate-180' : ''
          }`}
          icon={faChevronDown}
        />
      </div>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
};

Collapsible.defaultProps = {
  inverse: false,
  className: '',
};

Collapsible.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  inverse: PropTypes.bool,
  className: PropTypes.string,
};

export default Collapsible;
