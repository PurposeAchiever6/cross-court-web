/* eslint-disable react/button-has-type */
import React from 'react';
import Tooltip from 'shared/components/Tooltip';
import FireSvg from 'shared/components/svg/FireSvg';
import InfoSvg from 'shared/components/svg/InfoSvg';
import PropTypes from 'prop-types';

const SessionThemeInfo = ({ session }) => {
  const { themeTitle, themeSweatLevel, themeDescription, themeSubheading } = session;

  const themeFireArray = themeSweatLevel
    ? Array(themeSweatLevel)
        .fill()
        .map((_, i) => <FireSvg key={i} className="text-cc-black" />)
    : [];

  const hasSweatLevel = themeFireArray.length > 0;

  return (
    <div className="overflow-hidden">
      <div className="my-1 sm:flex sm:items-center">
        <div className="flex items-center">
          <p className="pt-1 font-shapiro96_inclined_wide text-sm uppercase overflow-hidden overflow-ellipsis">
            {themeTitle}
          </p>
          {!hasSweatLevel && themeDescription && (
            <Tooltip tooltip={themeDescription} place="right">
              <InfoSvg className="text-cc-black cursor-pointer ml-2 w-4 h-4" />
            </Tooltip>
          )}
        </div>
        {hasSweatLevel && (
          <div className="flex items-center">
            {hasSweatLevel && <div className="flex sm:ml-1 my-1 sm:my-0">{themeFireArray}</div>}
            {themeDescription && (
              <Tooltip tooltip={themeDescription} place="right">
                <InfoSvg className="text-cc-black cursor-pointer ml-2 mb-1 mt-2 sm:mb-0 sm:mt-1 w-4 h-4" />
              </Tooltip>
            )}
          </div>
        )}
      </div>
      {themeSubheading && (
        <p className="my-1 text-xs overflow-hidden overflow-ellipsis">{themeSubheading}</p>
      )}
    </div>
  );
};

SessionThemeInfo.propTypes = {
  session: PropTypes.shape().isRequired,
};

export default SessionThemeInfo;
