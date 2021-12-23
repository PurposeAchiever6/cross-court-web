import React from 'react';
import PropTypes from 'prop-types';

const InstructionItem = ({ number, children }) => (
  <li className="flex mb-12">
    <div className="font-dharma_gothic_cheavy_italic text-7xl text-center w-10 mr-3 sm:mr-6 flex-shrink-0">
      {number}
    </div>
    <div className="w-100">{children}</div>
  </li>
);

InstructionItem.propTypes = {
  number: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default InstructionItem;
