import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loading from 'shared/components/Loading';
import { getGalleryPhotos, getPageLoading } from './reducer';
import { getGalleryPhotosInit } from './actionCreators';
import Gallery from 'shared/components/Gallery';

const GalleryPage = () => {
  const dispatch = useDispatch();

  const galleryPhotos = useSelector(getGalleryPhotos);
  const isLoading = useSelector(getPageLoading);

  const images = galleryPhotos.map((galleryPhoto) => ({
    id: galleryPhoto.id,
    src: galleryPhoto.imageUrl,
  }));

  useEffect(() => {
    dispatch(getGalleryPhotosInit());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full overflow-auto bg-cc-black border-b border-gray-400">
      <Gallery images={images} />
    </div>
  );
};

export default GalleryPage;
