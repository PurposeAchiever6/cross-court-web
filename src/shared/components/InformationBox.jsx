import React from 'react';
import PropTypes from 'prop-types';

const InformationBox = ({ image, title, description, imageClassName, className }) => (
  <div className={className}>
    <img alt="box-img" src={image} className={imageClassName} />
    <div className="bg-cc-blue-900 px-5 py-7">
      <div className="font-shapiro95_super_wide text-2xl mb-2">{title}</div>
      <div className="text-xs">{description}</div>
    </div>
  </div>
);

InformationBox.defaultProps = {
  title: null,
  imageClassName: '',
  className: '',
};

InformationBox.propTypes = {
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string,
  imageClassName: PropTypes.string,
  className: PropTypes.string,
};

export default InformationBox;
