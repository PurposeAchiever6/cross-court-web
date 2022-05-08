import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import InputCheckboxField from 'shared/components/InputCheckboxField';
import { createOrUpdateFirstTimerSurvey } from 'screens/surveys/firstTimers/actionCreators';

const HowDidYouHearAboutUs = ({ className }) => {
  const dispatch = useDispatch();
  const [firstTimerSurvey, setFirstTimerSurvey] = useState(null);

  const onChangeFirstTimerSurvey = (e) => {
    const { checked, id: value } = e.target;
    const howDidYouHearAboutUs = checked ? value : null;

    setFirstTimerSurvey(howDidYouHearAboutUs);
    dispatch(createOrUpdateFirstTimerSurvey({ howDidYouHearAboutUs }));
  };

  useEffect(() => {
    dispatch(createOrUpdateFirstTimerSurvey({ howDidYouHearAboutUs: null }));
  }, [dispatch]);

  return (
    <div className={className}>
      <h4 className="text-cc-purple text-2xl font-shapiro96_inclined_wide mb-4">
        How did you hear about us?
      </h4>
      <div className="text-lg">
        <InputCheckboxField
          name="referral"
          onChange={onChangeFirstTimerSurvey}
          value={firstTimerSurvey === 'referral'}
          className="mb-1"
          formik={false}
        >
          Referral
        </InputCheckboxField>
        <InputCheckboxField
          name="ad"
          onChange={onChangeFirstTimerSurvey}
          value={firstTimerSurvey === 'ad'}
          className="mb-1"
          formik={false}
        >
          Ad
        </InputCheckboxField>
        <InputCheckboxField
          name="social-media"
          onChange={onChangeFirstTimerSurvey}
          value={firstTimerSurvey === 'social-media'}
          className="mb-1"
          formik={false}
        >
          Social Media
        </InputCheckboxField>
        <InputCheckboxField
          name="search-engine"
          onChange={onChangeFirstTimerSurvey}
          value={firstTimerSurvey === 'search-engine'}
          className="mb-1"
          formik={false}
        >
          Search Engine
        </InputCheckboxField>
        <InputCheckboxField
          name="another-website"
          onChange={onChangeFirstTimerSurvey}
          value={firstTimerSurvey === 'another-website'}
          className="mb-1"
          formik={false}
        >
          Another Website
        </InputCheckboxField>
        <InputCheckboxField
          name="other"
          onChange={onChangeFirstTimerSurvey}
          value={firstTimerSurvey === 'other'}
          className="mb-1"
          formik={false}
        >
          Other
        </InputCheckboxField>
      </div>
    </div>
  );
};

HowDidYouHearAboutUs.defaultProps = {
  className: '',
};

HowDidYouHearAboutUs.propTypes = {
  className: PropTypes.string,
};

export default HowDidYouHearAboutUs;
