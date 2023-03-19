import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loading from 'shared/components/Loading';
import Gallery from 'shared/components/Gallery';
import Pagination from 'shared/components/Pagination';
import usePagination from 'shared/hooks/usePagination';

import { getGalleryPhotos, getPageLoading, getPagination } from './reducer';
import { fetchGalleryPhotos } from './actionCreators';

const GalleryPage = () => {
  const dispatch = useDispatch();
  const { totalRecords } = useSelector(getPagination);
  const [firstLoad, setFirstLoad] = useState(true);
  const { nextPage, prevPage, currentPage, maxPage, setTotalRecords } = usePagination();

  const galleryPhotos = useSelector(getGalleryPhotos);
  const isLoading = useSelector(getPageLoading);

  const images = galleryPhotos.map((galleryPhoto) => ({
    id: galleryPhoto.id,
    src: galleryPhoto.imageUrl,
  }));

  useEffect(() => {
    dispatch(fetchGalleryPhotos(currentPage));
    setFirstLoad(false);
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (setTotalRecords && totalRecords) {
      setTotalRecords(totalRecords);
    }
  }, [totalRecords, setTotalRecords]);

  if (isLoading && firstLoad) {
    return <Loading />;
  }

  return (
    <div className="w-full overflow-auto bg-cc-black pt-16 p-2">
      <Gallery images={images} />
      <Pagination
        className="my-8 text-white"
        nextPage={nextPage}
        prevPage={prevPage}
        currentPage={currentPage}
        maxPage={maxPage}
      />
    </div>
  );
};

export default GalleryPage;
