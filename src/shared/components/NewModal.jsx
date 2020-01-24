import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalContainer = styled.div``;
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
export default function Modal({ children, shouldClose, closeHandler, isOpen }) {
  return (
    <ModalContainer>
      <ReactModal
        style={modalStyle}
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
    </ModalContainer>
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  shouldClose: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
