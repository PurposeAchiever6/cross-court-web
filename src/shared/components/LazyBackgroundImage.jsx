import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import colors from 'shared/styles/constants';

const LazyBackgroundImage = ({ as: HTMLTag, img, backgroundColor, children, ...props }) => {
  const containerRef = useRef();

  useEffect(() => {
    containerRef.current.style.backgroundColor = backgroundColor;

    const onIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const container = entry.target;
          container.style.backgroundColor = null;
          container.style.backgroundImage = `url('${img}')`;
          observer.disconnect();
        }
      });
    };

    const observer = new IntersectionObserver(onIntersection);
    observer.observe(containerRef.current);
  }, [backgroundColor, img]);

  return (
    <HTMLTag ref={containerRef} {...props}>
      {children}
    </HTMLTag>
  );
};

LazyBackgroundImage.defaultProps = {
  as: 'div',
  children: null,
  backgroundColor: colors.brandBlack,
};

LazyBackgroundImage.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  backgroundColor: PropTypes.string,
  img: PropTypes.string.isRequired,
};

export default LazyBackgroundImage;
