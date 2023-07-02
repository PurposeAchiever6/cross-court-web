import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';

import { capitalize } from 'shared/utils/helpers';
import Avatar from 'shared/components/Avatar';
import Badge from 'shared/components/Badge';
import LineDashedSvg from 'shared/components/svg/LineDashedSvg';
import Link from 'shared/components/Link';
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
        <div className="bg-cc-blue-300 px-4 py-6">
          {newLabel && (
            <div className="h-7">
              <Badge variant="white" shrink size="sm">
                New
              </Badge>
            </div>
          )}
          <div className="h-24">
            {workIndustry && (
              <div className="font-shapiro95_super_wide text-xs mb-2">{workIndustry}</div>
            )}
            {workCompany && <div className="capitalize text-sm mb-2">{workCompany}</div>}
            {workOccupation && (
              <div className="text-white text-opacity-60 text-xs">{capitalize(workOccupation)}</div>
            )}
          </div>
          <div className={newLabel ? '' : 'pt-7'}>
            <LineDashedSvg strokeWidth="1" strokeDashArray="6" className="text-cc-purple mb-4" />
            <div className="flex items-center">
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
              {links?.map((link, i) => (
                <Link
                  to={link}
                  key={`${firstName}-link-${i}`}
                  variant="white-opacity"
                  isExternal
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkSvg className="w-6 ml-2" />
                </Link>
              ))}
            </div>
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
