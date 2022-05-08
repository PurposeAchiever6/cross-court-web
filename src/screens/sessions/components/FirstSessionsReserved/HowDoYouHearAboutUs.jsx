import React, { useState } from 'react';
import PropTypes from 'prop-types';

import InputCheckboxField from 'shared/components/InputCheckboxField';

const HowDoYouHearAboutUs = ({ className }) => {
  const [firstTimerSurvey, setFirstTimerSurvey] = useState(null);

  const onChangeFirstTimerSurvey = (e) => {
    const { checked, id: value } = e.target;

    if (checked) {
      setFirstTimerSurvey(value);
    } else {
      setFirstTimerSurvey(null);
    }
  };

  return (
    <div className={className}>
      <h4 className="text-cc-purple text-2xl font-shapiro96_inclined_wide mb-4">
        How do you hear about us?
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
          name="socialMedia"
          onChange={onChangeFirstTimerSurvey}
          value={firstTimerSurvey === 'socialMedia'}
          className="mb-1"
          formik={false}
        >
          Social Media
        </InputCheckboxField>
        <InputCheckboxField
          name="searchEngine"
          onChange={onChangeFirstTimerSurvey}
          value={firstTimerSurvey === 'searchEngine'}
          className="mb-1"
          formik={false}
        >
          Search Engine
        </InputCheckboxField>
        <InputCheckboxField
          name="anotherWebsite"
          onChange={onChangeFirstTimerSurvey}
          value={firstTimerSurvey === 'anotherWebsite'}
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

HowDoYouHearAboutUs.defaultProps = {
  className: '',
};

HowDoYouHearAboutUs.propTypes = {
  className: PropTypes.string,
};

export default HowDoYouHearAboutUs;
