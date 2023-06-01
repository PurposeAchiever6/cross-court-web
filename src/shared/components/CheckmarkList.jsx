import React from 'react';
import PropTypes from 'prop-types';

import CheckmarkSvg from 'shared/components/svg/CheckmarkSvg';

const CheckmarkList = ({ list, className }) => (
  <div className={className}>
    {list.map(({ title, subtitle }, index) => (
      <div key={index} className={`flex ${index + 1 < list.length ? 'mb-4' : ''}`}>
        <CheckmarkSvg className="text-cc-purple w-6 mt-1 shrink-0 mr-4 self-start" />
        <div>
          {title && (
            <div className="font-shapiro95_super_wide text-lg sm:text-xl mb-1">{title}</div>
          )}
          {subtitle && <div className="text-sm">{subtitle}</div>}
        </div>
      </div>
    ))}
  </div>
);

CheckmarkList.defaultProps = {
  className: '',
};

CheckmarkList.propTypes = {
  list: PropTypes.shape().isRequired,
  className: PropTypes.string,
};

export default CheckmarkList;
