import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import useWindowSize from 'shared/hooks/useWindowSize';
import { size } from 'shared/styles/mediaQueries';

const modalStyle = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
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

const Modal = ({ children, shouldClose, closeHandler, isOpen }) => {
  const { width: windowSize } = useWindowSize();
  const newModalStyle = {
    ...modalStyle,
    content: { ...modalStyle.content, width: windowSize < size.desktop ? '80%' : '25rem' },
  };

  return (
    <ReactModal
      style={newModalStyle}
      shouldCloseOnOverlayClick={shouldClose}
      onRequestClose={closeHandler}
      isOpen={isOpen}
    >
      {
        <div className="frame">
          <div className="scroll">{children}</div>
        </div>
      }
    </ReactModal>
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  shouldClose: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Modal;
