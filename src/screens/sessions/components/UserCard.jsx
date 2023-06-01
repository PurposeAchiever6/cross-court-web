import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import { capitalize } from 'shared/utils/helpers';
import Avatar from 'shared/components/Avatar';
import Badge from 'shared/components/Badge';
import LineDashedSvg from 'shared/components/svg/LineDashedSvg';
import Link from 'shared/components/Link';
import Button from 'shared/components/Button';
import LinkSvg from 'shared/components/svg/LinkSvg';

const UserCard = ({ user, newLabel, expanded, className }) => {
  const {
    firstName,
    age,
    imageUrl,
    workCompany,
    workIndustry,
    workOccupation,
    instagramProfile,
    links,
  } = user;

  return (
    <div className={className}>
      <div className="bg-cc-blue-100 p-4 relative flex items-center">
        <span className="font-shapiro95_super_wide capitalize text-sm">{firstName}</span>
        {age && <span className="text-white text-opacity-60 text-xs ml-3">{age}</span>}
        {!expanded && instagramProfile && (
          <Link
            to={instagramProfile}
            variant="white-opacity"
            isExternal
            target="_blank"
            rel="noreferrer"
            className="ml-3"
          >
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </Link>
        )}
        <Avatar img={imageUrl} size="md" className="absolute-center-y right-4" />
      </div>
      {expanded && (
        <div className="bg-cc-blue-300 p-4">
          {newLabel && (
            <div className="h-6">
              <Badge variant="white" shrink size="sm">
                New
              </Badge>
            </div>
          )}
          <div className="font-shapiro95_super_wide text-xs h-4 mb-1">{workIndustry}</div>
          <div className="capitalize text-sm h-4 mb-2">{workCompany}</div>
          <div className="text-white text-opacity-60 text-xs h-4 mb-4">
            {capitalize(workOccupation)}
          </div>
          <div className={newLabel ? '' : 'pt-6'}>
            <LineDashedSvg strokeWidth="1" strokeDashArray="6" className="text-cc-purple mb-4" />
            <div className="flex items-center mb-4">
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
              {links.map((link) => (
                <Link to={link} variant="white-opacity" isExternal target="_blank" rel="noreferrer">
                  <LinkSvg className="w-6 ml-2" />
                </Link>
              ))}
            </div>
            <Button to={ROUTES.MYACCOUNT} variant="outline-white" className="w-full">
              View Profile
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

UserCard.defaultProps = {
  newLabel: false,
  expanded: true,
  className: '',
};

UserCard.propTypes = {
  user: PropTypes.shape().isRequired,
  newLabel: PropTypes.bool,
  expanded: PropTypes.bool,
  className: PropTypes.string,
};

export default UserCard;
