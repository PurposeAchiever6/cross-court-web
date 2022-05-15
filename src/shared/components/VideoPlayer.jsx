import React from 'react';
import ReactModal from 'react-modal';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

const VideoPlayer = ({
  isModalOpen,
  closeModalHandler,
  openOnModal,
  width,
  height,
  controls,
  url,
  ...props
}) => {
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
      border: 'none',
      borderRadius: '0',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(0, 0, 0, 0.9)',
      padding: 0,
      width: '95%',
      height: '95%',
    },
  };

  return openOnModal ? (
    <>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModalHandler}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        style={modalStyle}
      >
        <div
          className="absolute top-0 right-0 mt-2 mr-3 cursor-pointer text-white text-3xl"
          onClick={closeModalHandler}
        >
          &#x2715;
        </div>
        <div className="px-0 md:px-12 py-10 md:py-0 w-full h-full">
          <ReactPlayer url={url} width={width} height={height} controls={controls} {...props} />
        </div>
      </ReactModal>
    </>
  ) : (
    <ReactPlayer url={url} width={width} height={height} controls={controls} {...props} />
  );
};

VideoPlayer.defaultProps = {
  width: '100%',
  height: '100%',
  controls: true,
  openOnModal: false,
  isModalOpen: false,
  closeModalHandler: () => null,
};

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  controls: PropTypes.bool,
  openOnModal: PropTypes.bool,
  isModalOpen: PropTypes.bool,
  closeModalHandler: PropTypes.func,
};

export default VideoPlayer;
