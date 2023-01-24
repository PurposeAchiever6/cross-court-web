import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const QuestionAnswer = ({ question, collapsable, dark, className, children }) => {
  const [collapse, setCollapse] = useState(true);

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <div
      className={`${
        dark ? 'bg-cc-blue-900 text-white' : 'border border-cc-blue-900 text-black'
      } p-6 ${className}`}
    >
      <div className="relative pr-8">
        {question}
        {collapsable && (
          <FontAwesomeIcon
            className={`absolute top-0 right-0 cursor-pointer ${
              collapse ? '' : 'trasform rotate-45 transition-all'
            }`}
            icon={faPlus}
            size="lg"
            onClick={toggleCollapse}
          />
        )}
      </div>
      {collapsable ? (
        <div className={collapse ? 'hidden' : 'block mt-6 text-xs'}>{children}</div>
      ) : (
        <div className="mt-6 text-xs">{children}</div>
      )}
    </div>
  );
};

QuestionAnswer.defaultProps = {
  collapsable: true,
  dark: true,
  className: '',
};

QuestionAnswer.propTypes = {
  question: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  collapsable: PropTypes.bool,
  dark: PropTypes.bool,
  className: PropTypes.string,
};

export default QuestionAnswer;
