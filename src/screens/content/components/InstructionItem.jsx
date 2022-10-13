import React from 'react';
import PropTypes from 'prop-types';

const InstructionItem = ({ number, children, className }) => (
  <li className={`flex mb-12 relative ${className}`}>
    <div className="font-dharma_gothic_cheavy_italic text-8xl md:text-10xl text-center w-16 mr-3 sm:mr-6 flex-shrink-0 text-cc-purple -mt-3">
      {number}
    </div>
    <div className="w-100">{children}</div>
  </li>
);

InstructionItem.propTypes = {
  number: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

InstructionItem.defaultProps = {
  className: '',
};

export default InstructionItem;
