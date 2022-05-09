import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getGalleryPhotosInit } from 'screens/gallery/actionCreators';
import { getGalleryPhotos } from 'screens/gallery/reducer';
import Gallery from 'shared/components/Gallery';

const GalleryPhotos = () => {
  const dispatch = useDispatch();

  const galleryPhotos = useSelector(getGalleryPhotos);

  const images = galleryPhotos.slice(-8).map((galleryPhoto) => ({
    id: galleryPhoto.id,
    src: galleryPhoto.imageUrl,
  }));

  useEffect(() => {
    dispatch(getGalleryPhotosInit());
  }, [dispatch]);

  return (
    <div>
      <Gallery images={images} hoverEnable={false} className="mb-8" />
      <div className="font-shapiro96_inclined_wide text-xl sm:text-3xl text-center uppercase">
        See you in the court!
      </div>
    </div>
  );
};

export default GalleryPhotos;
