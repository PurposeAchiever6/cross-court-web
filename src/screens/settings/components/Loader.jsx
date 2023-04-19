import React from 'react';
import Spinner from 'shared/components/Spinner';

const Loader = () => (
  <div className="bg-black h-screen w-max mx-auto">
    <Spinner className="text-2xl" />
  </div>
);

export default Loader;
