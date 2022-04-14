import React from 'react';
import PropTypes from 'prop-types';
import currency from 'currency.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import Tooltip from 'shared/components/Tooltip';

const prorateExplanation =
  'Upgrading or downgrading your membership may result in prorated charges on your next billing statement. ' +
  'After you receive your first prorated invoice, all charges will show the membership rate.';

const Prorate = ({ prorate }) => {
  return (
    <div className="flex justify-between">
      <span>Total</span>
      <div className="flex items-center">
        <span>
          {currency(prorate.total, {
            formatWithSymbol: true,
            precision: 2,
          }).format()}
        </span>
        <Tooltip variant="black" tooltip={prorateExplanation}>
          <FontAwesomeIcon icon={faInfoCircle} className="text-lg ml-3 md:mb-2" />
        </Tooltip>
      </div>
    </div>
  );
};

Prorate.propTypes = {
  prorate: PropTypes.object.isRequired,
};

Prorate.defaultProps = {
  prorate: null,
};

export default Prorate;
