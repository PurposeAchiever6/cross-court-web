import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import { MEMBERSHIPS_FEATURES } from 'shared/constants/memberships';
import HoverableBox from 'shared/components/HoverableBox';

const MembershipsFeatures = ({ className }) => (
  <div className={className}>
    <h4 className="text-2xl md:text-4xl font-shapiro95_super_wide uppercase mb-4 sm:mb-8 md:mb-10">
      Memberships Features
    </h4>
    <div className="flex flex-wrap sm:-m-5 pb-8 sm:pb-12">
      {MEMBERSHIPS_FEATURES.map(({ name, description }) => (
        <div key={name} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 sm:mb-0 sm:p-5">
          <HoverableBox title={name} description={description} className="h-64" />
        </div>
      ))}
    </div>
    <div className="text-center">
      <Link
        className="font-dharma_gothic_cheavy_italic text-7xl sm:text-8xl text-cc-black bg-cc-purple px-4 pt-1 uppercase"
        to={ROUTES.MEMBERSHIPS}
      >
        See Memberships
      </Link>
    </div>
  </div>
);

MembershipsFeatures.defaultProps = {
  className: '',
};

MembershipsFeatures.propTypes = {
  className: PropTypes.string,
};

export default MembershipsFeatures;
