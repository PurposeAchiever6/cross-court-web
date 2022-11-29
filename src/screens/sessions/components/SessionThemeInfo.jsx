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

  return (
    <div className="overflow-hidden">
      <div className="my-1 flex items-center">
        <p className="pt-1 font-shapiro96_inclined_wide overflow-hidden overflow-ellipsis">
          {themeTitle}
        </p>
        {themeFireArray.length > 0 && themeFireArray}
        {themeDescription && (
          <Tooltip variant="black" tooltip={themeDescription} place="right">
            <InfoSvg className="ml-1 text-cc-black cursor-pointer" />
          </Tooltip>
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
