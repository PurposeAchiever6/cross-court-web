import React from 'react';
import PropTypes from 'prop-types';
import currency from 'currency.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import Tooltip from 'shared/components/Tooltip';

const Prorate = ({ prorate }) => {
  const price = currency(prorate.total, {
    formatWithSymbol: true,
    precision: 2,
  }).format();

  const prorateExplanation =
    'Upgrading or downgrading your membership may result in prorated charges. ' +
    'After this first prorated invoice, all charges will show the membership rate. ' +
    'Please note, the billing period will be reset and you will be charged immediately';

  return (
    <div className="flex items-center">
      <span>{price}</span>
      <div className="ml-2">
        <Tooltip place="right" variant="black" tooltip={prorateExplanation}>
          <FontAwesomeIcon icon={faInfoCircle} className="text-lg" />
        </Tooltip>
      </div>
    </div>
  );
};

Prorate.propTypes = {
  prorate: PropTypes.object,
};

Prorate.defaultProps = {
  prorate: null,
};

export default Prorate;
