import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getUserProfile } from 'screens/my-account/reducer';
import InputTextareaField from 'shared/components/InputTextareaField';
import Button from 'shared/components/Button';
import ROUTES from 'shared/constants/routes';
import LineDashedSvg from 'shared/components/svg/LineDashedSvg';
import Link from 'shared/components/Link';

const StepProvideReasonContent = ({ submitRequest }) => {
  const history = useHistory();

  const currentUser = useSelector(getUserProfile);

  const [errors, setErrors] = useState({});
  const [reason, setReason] = useState('');

  const userNotMember = !currentUser.activeSubscription;

  const validate = () => {
    const newErrors = {};

    if (reason.trim().length < 20) {
      newErrors.reason = true;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (userNotMember) {
      return;
    }

    if (validate()) {
      submitRequest({ reason });
    }
  };

  const onPurchaseScoutingCredit = () => {
    if (userNotMember) {
      return;
    }

    history.push({
      pathname: ROUTES.MEMBERSHIPS,
      state: { showScouting: true },
    });
  };

  return (
    <div>
      {userNotMember && (
        <div className="text-center mb-6">
          <div className="font-shapiro95_super_wide uppercase text-xs md:text-sm bg-cc-purple text-white p-4 mb-4">
            Only members can request a skill rating update
          </div>
          <Button variant="outline-purple" to={ROUTES.MEMBERSHIPS} className="text-sm">
            See Memberships
          </Button>
        </div>
      )}
      <div className={`text-sm ${userNotMember ? 'opacity-30 pointer-events-none' : ''}`}>
        <div className="mb-8">
          {userNotMember && (
            <p className="mb-2">
              We believe it is important for our member's success to experience Crosscourt with
              other athletes of similar abilities.
            </p>
          )}
          <p className="mb-6 text-lg md:text-xl">
            You must have played D3 or above at a university level to update this skill, or purchase
            an evaluation credit.
          </p>
          <div className="mb-4">
            Add links to team roster, MaxPreps profile, articles, Youtube videos, social media
            clips, or images that depict your D3 or above university level status that was within
            the last 10 years.
          </div>
          <InputTextareaField
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            hint="Please include at least 20 characters"
            error={errors.reason}
            formik={false}
            className="mb-4"
            placeholder="Paste links..."
          />
          <Button className="w-full md:w-auto" onClick={onSubmit}>
            Submit
          </Button>
        </div>
        <div className="flex items-center mb-4">
          <span className="block text-lg md:text-xl mr-4">OR</span>
          <LineDashedSvg strokeWidth="4px" />
        </div>
        <div className="mb-6 md:mb-12">
          <div className="mb-6 text-lg md:text-xl">
            If you think you have what it takes, purchase an evaluation credit below.
          </div>
          <div className="mb-4">
            You’ll be able to apply the evaluation credit at your leisure when booking a session.
          </div>
          <div className="md:flex md:items-center">
            <Button
              variant="outline-purple"
              className="w-full md:w-auto"
              onClick={onPurchaseScoutingCredit}
            >
              Buy Credit
            </Button>
            <Link
              className="block mt-4 md:mt-0 md:ml-4 w-full md:w-auto text-center"
              to="/player-evaluation-form.png"
              target="_blank"
              isExternal
            >
              View Evaluation Form
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

StepProvideReasonContent.propTypes = {
  submitRequest: PropTypes.func.isRequired,
};

export default StepProvideReasonContent;
