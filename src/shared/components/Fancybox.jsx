import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Fancybox as NativeFancybox } from '@fancyapps/ui/dist/fancybox.esm.js';
import '@fancyapps/ui/dist/fancybox.css';

const Fancybox = ({ delegate, options, children }) => {
  useEffect(() => {
    NativeFancybox.bind(delegate, options);

    return () => {
      NativeFancybox.destroy();
    };
  }, [delegate, options]);

  return <>{children}</>;
};

Fancybox.defaultProps = {
  delegate: '[data-fancybox]',
  options: {},
};

Fancybox.propTypes = {
  delegate: PropTypes.string,
  options: PropTypes.shape(),
  children: PropTypes.node.isRequired,
};

export default Fancybox;
