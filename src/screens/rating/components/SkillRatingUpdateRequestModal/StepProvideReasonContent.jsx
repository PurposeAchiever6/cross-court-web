import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getUserProfile } from 'screens/my-account/reducer';
import InputTextareaField from 'shared/components/InputTextareaField';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import ROUTES from 'shared/constants/routes';

const MAX_SKILL_RATING = '5';

const StepProvideReasonContent = ({ submitRequest, newSkillRating }) => {
  const history = useHistory();

  const currentUser = useSelector(getUserProfile);

  const [errors, setErrors] = useState({});
  const [reason, setReason] = useState('');

  const userNotMember = !currentUser.activeSubscription;
  const maxSkillRating = newSkillRating === MAX_SKILL_RATING;

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
          <PrimaryButton inverted to={ROUTES.MEMBERSHIPS} fontSize="0.75rem">
            See Memberships
          </PrimaryButton>
        </div>
      )}
      <div className={`text-sm ${userNotMember ? 'opacity-30 pointer-events-none' : ''}`}>
        <div className="mb-8">
          {userNotMember && (
            <p className="mb-2">
              We believe it is important for our member's success to experience crosscourt with
              other athletes of similar abilities.
            </p>
          )}
          <p className="mb-8">
            To update your skill rating to a <strong>{newSkillRating}</strong>, please provide{' '}
            <strong>proof</strong> of at least varsity level played <strong>OR</strong> book a{' '}
            <strong>evaluation session</strong> to have one of our experience members go through our
            player evaluation form with you during a session.
          </p>
          <div className="mb-4">
            1) Link(s) to team roster, MaxPreps profile, article, YouTube video, social media clips,
            or image(s) that depict at least{' '}
            <strong>{maxSkillRating ? 'D3 University' : 'varsity'}</strong> level played.
          </div>
          <InputTextareaField
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            hint="Please include at least 20 characters"
            error={errors.reason}
            formik={false}
            className="mb-6"
          />
          <div className="text-center">
            <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
          </div>
        </div>
        <div className="mb-6 md:mb-12">
          <div className="mb-6">
            2) If you think you have what it takes, please purchase a{' '}
            <strong>evaluation credit</strong> below. You will be able to apply the evaluation
            credit at your leisure when booking a session.
          </div>
          <div className="text-center">
            <div className="font-shapiro95_super_wide text-xl uppercase mb-6">
              Purchase evaluation credit
            </div>
            <PrimaryButton onClick={onPurchaseScoutingCredit}>Purchase Evaluation</PrimaryButton>
          </div>
        </div>
        <div className="text-center md:text-left">
          <PrimaryButton
            inverted
            color="black"
            fontSize="0.675rem"
            hoverEffect={false}
            to="/player-evaluation-form.pdf"
            target="_blank"
          >
            See Player Evaluation Form
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

StepProvideReasonContent.defaultProps = {
  newSkillRating: null,
};

StepProvideReasonContent.propTypes = {
  submitRequest: PropTypes.func.isRequired,
  newSkillRating: PropTypes.string,
};

export default StepProvideReasonContent;
