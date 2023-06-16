import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import Button from 'shared/components/Button';
import BasketballIlustrationSvg from 'shared/components/svg/BasketballIlustrationSvg';
import DayPassIllustrationSvg from 'shared/components/svg/DayPassIllustrationSvg';
import Link from 'shared/components/Link';
import Map from 'shared/components/Map/Map';

const OutsideRangeModal = ({ isOpen, closeHandler, location, onContinue }) => (
  <Modal isOpen={isOpen} closeHandler={closeHandler} size="2xl">
    <h3 className="font-shapiro95_super_wide mb-4">
      Your zip code indicates you live outside of a {Number(location?.milesRangeRadius)} mile range
      to Crosscourt {location?.name}...
    </h3>
    <p className="mb-4">Are you sure you want to continue?</p>
    <Button className="mb-4" onClick={onContinue}>
      I'm good with it
    </Button>
    <hr className="mb-4" />
    <div className="flex items-center mb-4">
      <BasketballIlustrationSvg className="w-12 h-12 text-cc-purple mr-4" />
      <div>
        <span className="font-shapiro95_super_wide">TIP:</span> It's still worth it.
        <p className="text-sm mt-1">Make your time well-spent by booking back-to-back sessions.</p>
      </div>
    </div>
    <hr className="mb-4" />
    <div className="flex items-center mb-4">
      <DayPassIllustrationSvg className="w-12 h-12 text-cc-purple mr-4" />
      <div>
        If you’re still not sure:
        <p className="text-sm mt-1">
          Try Crosscourt out by simply booking a one-time Day Pass.{' '}
          <Link onClick={onContinue}>Let’s do it</Link>
        </p>
      </div>
    </div>
    {location && (
      <div className="h-[24rem]">
        <Map selectedLocation={location?.id} locations={[location]} />
      </div>
    )}
  </Modal>
);

OutsideRangeModal.defaultProps = {
  location: null,
};

OutsideRangeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  location: PropTypes.shape(),
  onContinue: PropTypes.func.isRequired,
};

export default OutsideRangeModal;
