import React from 'react';
import PropTypes from 'prop-types';
import stepContainer from 'shared/images/step-container.png';

const Steps = ({ steps, className }) => (
  <div className={className}>
    {steps.map((step, i) => (
      <div className="flex items-center mb-4" key={`step-${i}`}>
        <div className="w-1/4 md:w-1/5 p-3 relative">
          <img src={stepContainer} alt="step-container" />
          <span className="absolute font-dharma_gothic_cexbold text-white text-6xl md:text-8xl top-5 left-9 md:left-11">
            0{i + 1}
          </span>
        </div>
        <div className="w-3/4 md:w-4/5">
          <span className="block font-shapiro95_super_wide text-lg">{step.title}</span>
          <span className="block">{step.description}</span>
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
      description: PropTypes.string,
    })
  ),
  className: PropTypes.string,
};

export default Steps;
