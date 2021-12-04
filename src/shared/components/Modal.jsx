import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import useWindowSize from 'shared/hooks/useWindowSize';
import { size } from 'shared/styles/mediaQueries';
import CrossSvg from './svg/CrossSvg';

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
    maxHeight: 'calc(100vh - 50px)', // <-- This sets the height
    overflowY: 'auto', // <-- This tells the modal to scrolad
  },
};

ReactModal.setAppElement('#root');

const Modal = ({ children, shouldClose, closeHandler, isOpen, style, showCloseButton, title }) => {
  const { width: windowSize } = useWindowSize();
  const newModalStyle = {
    ...modalStyle,
    content: {
      ...modalStyle.content,
      width: windowSize < size.desktop ? '80%' : '25rem',
      ...style,
    },
  };

  return (
    <ReactModal
      style={newModalStyle}
      shouldCloseOnOverlayClick={shouldClose}
      onRequestClose={closeHandler}
      isOpen={isOpen}
    >
      <div className="flex items-center">
        {showCloseButton && (
          <button className="h-1/5" onClick={closeHandler}>
            <CrossSvg color="black" />
          </button>
        )}
        {title && <h2 className="ml-4">{title}</h2>}
      </div>
      <div className={`flex items-center justify-center ${showCloseButton ? 'h-4/5' : 'h-full'}`}>
        {children}
      </div>
    </ReactModal>
  );
};

Modal.propTypes = {
  children: PropTypes.element,
  shouldClose: PropTypes.bool,
  closeHandler: PropTypes.func,
  isOpen: PropTypes.bool,
  style: PropTypes.object,
  showCloseButton: PropTypes.bool,
  title: PropTypes.string,
};

Modal.defaultProps = {
  children: null,
  shouldClose: false,
  closeHandler: null,
  isOpen: false,
  style: {},
  showCloseButton: false,
  title: null,
};

export default Modal;
