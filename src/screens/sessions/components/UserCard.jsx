import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import Avatar from 'shared/components/Avatar';
import Badge from 'shared/components/Badge';
import LineDashedSvg from 'shared/components/svg/LineDashedSvg';
import Link from 'shared/components/Link';
import Button from 'shared/components/Button';

const UserCard = ({ user, newLabel, className }) => {
  const { firstName, age, imageUrl, instagramProfile } = user;

  return (
    <div className={className}>
      <div className="bg-cc-blue-100 p-4 relative">
        <span className="font-shapiro95_super_wide capitalize text-sm">{firstName}</span>
        {age && <span className="text-white text-opacity-60 text-xs ml-3">{age}</span>}
        <Avatar img={imageUrl} size="md" className="absolute-center-y right-4" />
      </div>
      <div className="bg-cc-blue-300 p-4">
        {newLabel && (
          <div className="h-6">
            <Badge variant="white" shrink size="sm">
              New
            </Badge>
          </div>
        )}
        <div className="font-shapiro95_super_wide text-xs mb-1">Architecture</div>
        <div className="text-sm mb-2">GB Firm</div>
        <div className="text-white text-opacity-60 text-xs mb-4">
          Design and develop commercial architecture
        </div>
        <div className={newLabel ? '' : 'pt-6'}>
          <LineDashedSvg strokeWidth="1" strokeDashArray="6" className="text-cc-purple mb-4" />
          <div className="mb-4">
            <Link
              to={instagramProfile}
              variant="white-opacity"
              isExternal
              target="_blank"
              rel="noreferrer"
              disabled={!instagramProfile}
            >
              <FontAwesomeIcon icon={faInstagram} size="xl" />
            </Link>
          </div>
          <Button to={ROUTES.MYACCOUNT} variant="outline-white" className="w-full">
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

UserCard.defaultProps = {
  newLabel: false,
  className: '',
};

UserCard.propTypes = {
  user: PropTypes.shape().isRequired,
  newLabel: PropTypes.bool,
  className: PropTypes.string,
};

export default UserCard;
