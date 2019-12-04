import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');
const element = document.createElement('div');

function Modal({ children }) {
  useEffect(() => {
    modalRoot.appendChild(element);
    return () => {
      modalRoot.removeChild(element);
    };
  }, []);
  return ReactDOM.createPortal(children, element);
}

Modal.protoTypes = {
  children: PropTypes.node,
};

export default Modal;
