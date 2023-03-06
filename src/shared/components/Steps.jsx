import React from 'react';
import PropTypes from 'prop-types';

const Steps = ({ steps, className }) => (
  <div className={`my-4 text-sm md:text-base ${className}`}>
    {steps.map((step, i) => (
      <div key={`step-${i}`} className="flex items-center mb-2">
        <div className="bg-cc-purple rounded-full flex items-center justify-center w-8 h-8 md:w-10 md:h-10 m-4 font-dharma_gothic_cheavy_italic text-2xl md:text-3xl text-white">
          {i + 1}
        </div>
        <div className="flex flex-col w-3/4">
          <p>{step.title}</p>
          {step.subtitle && <p>{step.subtitle}</p>}
          {step.note && <p className="text-xs">{step.note}</p>}
        </div>
      </div>
    ))}
  </div>
);

Steps.defaultProps = {
  steps: [],
  className: '',
};

Steps.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
      note: PropTypes.string,
    })
  ),
  className: PropTypes.string,
};

export default Steps;
