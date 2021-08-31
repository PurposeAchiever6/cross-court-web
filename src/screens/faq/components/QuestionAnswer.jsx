import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Question from './Question';

const QuestionAnswer = ({ question, collapsable, className, children }) => {
  const [collapse, setCollapse] = useState(true);

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <div className={className}>
      <Question
        text={question}
        collapsable={collapsable}
        collapse={collapse}
        toggleCollapse={toggleCollapse}
      />
      {collapsable ? !collapse && <div>{children}</div> : <div>{children}</div>}
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
