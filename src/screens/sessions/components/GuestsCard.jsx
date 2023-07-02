import React from 'react';
import PropTypes from 'prop-types';

import { pluralize } from 'shared/utils/helpers';
import LineDashedSvg from 'shared/components/svg/LineDashedSvg';

const NUMBER_OF_GUESTS_SHOWN = 4;

const GuestsCard = ({ guests, className }) => (
  <div className={className}>
    <div className="bg-cc-blue-100 p-4 relative flex items-center">
      <span className="font-shapiro95_super_wide capitalize text-sm">{`${guests.length} ${pluralize(
        'guest',
        guests.length
      )}`}</span>
    </div>
    <div className="bg-cc-blue-300 p-4 pt-6 h-full">
      {guests.map(
        (guest, index) =>
          index + 1 <= NUMBER_OF_GUESTS_SHOWN && (
            <div key={guest.id}>
              <div className="font-shapiro95_super_wide capitalize text-xs">{`${guest.firstName} ${guest.lastName}`}</div>
              {index + 1 < guests.length && index + 1 < NUMBER_OF_GUESTS_SHOWN && (
                <LineDashedSvg
                  strokeWidth="1"
                  strokeDashArray="6"
                  className="text-cc-purple my-3"
                />
              )}
            </div>
          )
      )}
      {guests.length > NUMBER_OF_GUESTS_SHOWN && (
        <p className="font-shapiro95_super_wide text-cc-gray-600 text-xs mt-4">{`+${
          guests.length - NUMBER_OF_GUESTS_SHOWN
        } more`}</p>
      )}
    </div>
  </div>
);

GuestsCard.defaultProps = {
  className: '',
};

GuestsCard.propTypes = {
  guests: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  className: PropTypes.string,
};

export default GuestsCard;
