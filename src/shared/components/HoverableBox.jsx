import React from 'react';
import PropTypes from 'prop-types';

const HoverableBox = ({ title, description, className }) => (
  <div className={className}>
    <div className="group bg-cc-black text-white border border-cc-purple hover:bg-cc-purple transition-all duration-500 flex justify-center items-center text-center p-10 relative cursor-pointer h-full w-full">
      <div className="group-hover:transition-all duration-150 delay-300 group-hover:delay-0 group-hover:opacity-0">
        <span className="text-cc-purple font-shapiro95_super_wide uppercase">{title}</span>
      </div>
      <p className="absolute inset-0 flex justify-center items-center p-4 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
        {description}
      </p>
    </div>
  </div>
);

HoverableBox.propTypes = {
  className: '',
};

HoverableBox.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  descriptclassNameion: PropTypes.string,
};

export default HoverableBox;
