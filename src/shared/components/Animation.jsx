import React from 'react';
import Lottie from 'react-lottie';
import PropTypes from 'prop-types';

const Animation = ({ animation, height, width, className }) => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className={className}>
      <Lottie
        ariaRole="div"
        options={options}
        height={height}
        width={width}
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
};

Animation.defualtProps = {
  width: '100%',
  height: '100%',
  className: '',
};

Animation.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  animation: PropTypes.object.isRequired,
};

export default Animation;
