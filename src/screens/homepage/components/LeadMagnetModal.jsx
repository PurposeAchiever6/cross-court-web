import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { getDropInProducts } from 'screens/products/reducer';
import { initialLoad } from 'screens/products/actionCreators';
import { validateEmail } from 'shared/utils/helpers';
import { LEAD_MAGNET_EVENT } from 'shared/constants/active_campaign';
import { formatPrice } from 'screens/products/utils';
import { confirmDontShowLeadMagnet } from 'shared/utils/leadMagnet';
import activeCampaignService from 'shared/services/activeCampaign';
import Modal from 'shared/components/Modal';
import InputTextField from 'shared/components/InputTextField';
import Button from 'shared/components/Button';
import Link from 'shared/components/Link';
import leadMagnetImg from 'screens/homepage/images/lead-magnet-image.png';
import EnvelopeSvg from 'shared/components/svg/EnvelopeSvg';
import CheckmarkSvg from 'shared/components/svg/CheckmarkSvg';

const DISCOUNT = 50;
export const LOCAL_STORAGE_LEAD_MAGNET_NOT_SHOW_AGAIN_KEY = 'leadMagnetNotShowAgain';

const LeadMagnetModal = ({ isOpen, closeHandler }) => {
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const dropInProduct = useSelector(getDropInProducts)?.[0];
  const discountedPrice = dropInProduct ? (dropInProduct.price * DISCOUNT) / 100 : 0;

  useEffect(() => {
    if (isOpen) {
      dispatch(initialLoad());
    }
  }, [isOpen]);

  const handleClick = async () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
    } else {
      setLoading(true);
      setEmailError(null);

      try {
        const { contact } = await activeCampaignService.createContact({
          email,
          utm_source: 'lead_magnet',
        });

        await activeCampaignService.createDeal(LEAD_MAGNET_EVENT, [], {
          email: contact.email,
          contact_id: contact.id,
        });

        setSuccess(true);
      } catch {
        setEmailError('Something went wrong. Please try again later.');
      }

      setLoading(false);
    }
  };

  const onClose = () => {
    setSuccess(false);
    closeHandler();
    setEmail('');
  };

  const handleNotShowAgain = () => {
    confirmDontShowLeadMagnet();
    onClose();
  };

  return (
    <Modal isOpen={isOpen && !!dropInProduct} closeHandler={onClose} size="md">
      {success ? (
        <div className="flex flex-col items-center">
          <CheckmarkSvg className="w-12 -mt-1 mr-2" />
          <p className="font-shapiro95_super_wide text-2xl mt-4">You're in.</p>
          <p>Check your email for next steps.</p>
        </div>
      ) : (
        <>
          <img alt="lead-img" src={leadMagnetImg} />
          <div className="mt-8">
            <p className="font-shapiro95_super_wide text-3xl mb-3">{DISCOUNT}% off Day Pass</p>
            <div className="flex mb-5">
              <p className="text-xs">
                Enter your email to get {DISCOUNT}% off on your first Crosscourt Day Pass.
              </p>
              <div className="border-2 border-black flex items-center justify-center px-2 ml-2">
                <span className="m-0 p-0 mr-1 text-md line-through">
                  {formatPrice(dropInProduct?.price)}
                </span>
                <span className="m-0 p-0 ml-1 font-shapiro95_super_wide text-md">
                  {formatPrice(discountedPrice)}
                </span>
              </div>
            </div>
          </div>
          <InputTextField
            name="email"
            label="Your email address"
            icon={<EnvelopeSvg className="w-5" />}
            leftIcon
            className="mb-6"
            autoComplete="email"
            formik={false}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            error={emailError}
          />
          <Button loading={loading} onClick={handleClick}>
            Use Deal
          </Button>
          <Link onClick={handleNotShowAgain} className="text-xs ml-4">
            Don't show me again
          </Link>
        </>
      )}
    </Modal>
  );
};

LeadMagnetModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default LeadMagnetModal;
