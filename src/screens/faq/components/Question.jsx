import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Question = ({ text, collapse, collapsable, toggleCollapse }) => {
  const textClass = 'font-shapiro95_super_wide text-xl mb-1';

  return collapsable ? (
    <div className="inline-block">
      <div className="flex items-center cursor-pointer" onClick={toggleCollapse}>
        <h3 className={`${textClass} mr-2`}>{text}</h3>
        {collapse ? (
          <FontAwesomeIcon icon={faChevronDown} />
        ) : (
          <FontAwesomeIcon icon={faChevronUp} className="-mt-2" />
        )}
      </div>
    </div>
  ) : (
    <h3 className={textClass}>{text}</h3>
  );
};

Question.defaultProps = {
  collapsable: false,
  collapse: true,
  toggleCollapse: null,
};

Question.propTypes = {
  text: PropTypes.string.isRequired,
  collapsable: PropTypes.bool,
  collapse: PropTypes.bool,
  toggleCollapse: PropTypes.func,
};

export default Question;
