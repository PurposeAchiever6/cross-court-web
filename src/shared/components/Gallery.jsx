import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faDownload } from '@fortawesome/free-solid-svg-icons';

import ccLogo from 'shared/images/logos/cc-white.png';
import Fancybox from './Fancybox';

const toDataURL = (url) =>
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => URL.createObjectURL(blob));

const downloadImage = async (url) => {
  const filename = url.substring(url.lastIndexOf('/') + 1);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = await toDataURL(url);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const Gallery = ({ images, className }) => {
  images = images.map((image) => ({
    itemId: image.id.toString(),
    mediaUrl: image.src,
    metaData: {
      type: 'image',
      title: `gallery-${image.id}`,
    },
  }));

  return (
    <div className={className}>
      <Fancybox options={{ infinite: false }}>
        <div className="flex flex-wrap justify-center gap-4 after:flex-grow-[999] after:content-['']">
          {images.map((image, i) => (
            <div className="group flex-auto h-80 relative" key={`image-${i}`}>
              <img
                className="object-cover w-full h-full align-middle"
                src={image.mediaUrl}
                alt={image.title}
                loading="lazy"
              />
              <div className="opacity-0 group-hover:opacity-100 flex items-center justify-center absolute w-full h-full bg-[rgba(57,57,57,0.5)] top-0 left-0 transition-all text-white">
                <img
                  alt="cc-logo"
                  className="z-10 absolute left-1/2 top-[calc(50%-1.5rem)] w-8"
                  src={ccLogo}
                />
                <a className="" href={image.mediaUrl} data-fancybox>
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="z-10 absolute top-[calc(50%+1.5rem)] left-[calc(50%-1.5rem)] text-2xl mr-8 cursor-pointer"
                  />
                </a>
                <FontAwesomeIcon
                  icon={faDownload}
                  className="z-10 absolute top-[calc(50%+1.5rem)] left-[calc(50%+1.5rem)] text-2xl cursor-pointer"
                  onClick={() => downloadImage(image.mediaUrl)}
                />
              </div>
            </div>
          ))}
        </div>
      </Fancybox>
    </div>
  );
};

Gallery.defaultProps = {
  className: '',
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
    })
  ).isRequired,
  className: PropTypes.string,
};

export default Gallery;
