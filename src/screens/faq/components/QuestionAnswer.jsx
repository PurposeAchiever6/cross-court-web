import React, { useState } from 'react';
import PropTypes from 'prop-types';

const QuestionAnswer = ({ question, collapsable, className, children }) => {
  const [collapse, setCollapse] = useState(true);

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <div className={className}>
      <h3 className="font-shapiro95_super_wide text-xl mb-1">
        <span className={collapsable ? 'cursor-pointer' : ''} onClick={toggleCollapse}>
          {question}
        </span>
      </h3>
      {collapsable ? (
        <div className={collapse ? 'hidden' : 'block'}>{children}</div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

QuestionAnswer.defaultProps = {
  collapsable: false,
  className: '',
};

QuestionAnswer.propTypes = {
  question: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  collapsable: PropTypes.bool,
  className: PropTypes.string,
};

export default QuestionAnswer;
