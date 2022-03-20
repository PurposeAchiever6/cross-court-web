import React, { useEffect, useRef } from 'react';
import ReactModal from 'react-modal';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import PropTypes from 'prop-types';

import colors from 'shared/styles/constants';
import useWindowSize from 'shared/hooks/useWindowSize';
import { size as breakpoints } from 'shared/styles/mediaQueries';
import CrossSvg from './svg/CrossSvg';

ReactModal.setAppElement('#root');

const Modal = ({
  isOpen,
  closeHandler,
  title,
  lockScroll,
  showCloseButton,
  closeOnOverlayClick,
  size,
  style,
  dark,
  children,
  shouldCloseOnEsc,
}) => {
  const modalRef = useRef(null);
  const { width: windowSize } = useWindowSize();

  useEffect(() => {
    isOpen && lockScroll ? disableBodyScroll(modalRef.current) : enableBodyScroll(modalRef.current);
    return () => clearAllBodyScrollLocks();
  }, [isOpen, lockScroll]);

  const getWidthBySize = (() => {
    switch (size) {
      case 'xs':
        return '20rem';
      case 'sm':
        return '25rem';
      case 'md':
        return '30rem';
      case 'lg':
        return '35rem';
      case 'xl':
        return '40rem';
      case 'full':
        return '100%';
      default:
        return '100%';
    }
  })();

  const modalStyle = {
    overlay: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 100,
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: windowSize < breakpoints.desktop ? '100%' : getWidthBySize,
      maxWidth: '90%',
      maxHeight: '95%',
      overflowY: 'auto',
      backgroundColor: dark ? colors.brandBlack : 'white',
      borderColor: dark ? colors.brandBlack : null,
      ...style,
    },
  };

  return (
    <ReactModal
      shouldCloseOnEsc={shouldCloseOnEsc}
      isOpen={isOpen}
      onRequestClose={closeHandler}
      shouldCloseOnOverlayClick={closeOnOverlayClick}
      style={modalStyle}
      ref={modalRef}
    >
      <div className={`p-2 ${showCloseButton ? 'pt-5' : ''}`}>
        {showCloseButton && (
          <button className="absolute top-0 right-0 p-4" onClick={closeHandler}>
            <CrossSvg color={dark ? 'white' : 'black'} />
          </button>
        )}
        {title && (
          <h2
            className={`font-shapiro95_super_wide text-lg sm:text-2xl text-center uppercase mb-6 ${
              dark ? 'text-white' : ''
            }`}
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </ReactModal>
  );
};

Modal.defaultProps = {
  closeHandler: () => null,
  title: null,
  lockScroll: true,
  showCloseButton: true,
  closeOnOverlayClick: true,
  size: 'md',
  dark: false,
  style: {},
  shouldCloseOnEsc: true,
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func,
  title: PropTypes.string,
  lockScroll: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  closeOnOverlayClick: PropTypes.bool,
  size: PropTypes.string,
  dark: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
  shouldCloseOnEsc: PropTypes.bool,
};

export default Modal;
