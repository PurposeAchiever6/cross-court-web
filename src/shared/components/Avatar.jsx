import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'shared/components/Tooltip';
import Badge from 'shared/components/Badge';
import missingProfileImg from 'shared/images/missing-profile-image.jpg';

const Avatar = ({ img, size, badge, tooltip, className }) => {
  const sizeClasses = (() => {
    switch (size) {
      case 'sm':
        return 'w-12 h-12';
      case 'md':
      default:
        return 'w-20 h-20';
    }
  })();

  return (
    <div className={className}>
      <Tooltip
        tooltip={tooltip}
        enable={!!tooltip}
        delayHide={0}
        variant="white"
        tooltipClassName="text-2xs"
      >
        <div className="relative">
          <img
            className={`${sizeClasses} object-cover rounded-full`}
            src={img || missingProfileImg}
            alt="profile-img"
          />
          {badge && (
            <div className="absolute right-1/2 -bottom-1 transform translate-x-1/2">
              <Badge variant="white" shrink size="sm">
                {badge}
              </Badge>
            </div>
          )}
        </div>
      </Tooltip>
    </div>
  );
};

Avatar.defaultProps = {
  className: '',
  badge: null,
  tooltip: null,
  img: null,
};

Avatar.propTypes = {
  className: PropTypes.string,
  badge: PropTypes.string,
  tooltip: PropTypes.string,
  img: PropTypes.string,
};

export default Avatar;
