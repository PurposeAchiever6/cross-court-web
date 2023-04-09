/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import colors from 'shared/styles/constants';

const Tooltip = ({
  children,
  tooltip,
  enable,
  variant,
  place,
  className,
  tooltipClassName,
  delayHide,
  delayUpdate,
}) => {
  const tooltipId = (Math.random() + 1).toString(36).substring(2);

  const { textColor, backgroundColor } = (() => {
    switch (variant) {
      case 'white':
        return { textColor: 'black', backgroundColor: 'white' };
      case 'purple':
        return { textColor: 'white', backgroundColor: colors.brandPurple };
      case 'black':
      default:
        return { textColor: 'white', backgroundColor: colors.brandBlack };
    }
  })();

  const { textAlign } = (() => {
    switch (place) {
      case 'right':
        return { textAlign: 'text-left' };
      case 'left':
        return { textAlign: 'text-right' };
      case 'bottom':
        return { textAlign: 'text-center' };
      default:
        return { textAlign: 'text-center' };
    }
  })();

  return (
    <>
      {enable ? (
        <>
          <div data-for={tooltipId} data-tip className={className}>
            {children}
          </div>
          <ReactTooltip
            id={tooltipId}
            backgroundColor={backgroundColor}
            delayHide={delayHide}
            delayUpdate={delayUpdate}
            textColor={textColor}
            place={place}
            effect="solid"
            className={`max-w-xs font-shapiro45_welter_extd leading-normal ${textAlign} ${tooltipClassName}`}
          >
            {tooltip}
          </ReactTooltip>
        </>
      ) : (
        children
      )}
    </>
  );
};

Tooltip.defaultProps = {
  variant: 'black',
  className: '',
  enable: true,
  place: 'bottom',
  tooltipClassName: '',
  delayHide: 250,
  delayUpdate: 500,
};

Tooltip.propTypes = {
  tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  className: PropTypes.string,
  enable: PropTypes.bool,
  place: PropTypes.string,
  tooltipClassName: PropTypes.string,
  delayHide: PropTypes.number,
  delayUpdate: PropTypes.number,
};

export default Tooltip;
