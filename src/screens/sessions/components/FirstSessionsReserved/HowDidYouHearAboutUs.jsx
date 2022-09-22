import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import InputTextField from 'shared/components/InputTextField';
import InputCheckboxField from 'shared/components/InputCheckboxField';
import { createOrUpdateFirstTimerSurvey } from 'screens/surveys/firstTimers/actionCreators';

const HowDidYouHearAboutUs = ({ className }) => {
  const dispatch = useDispatch();
  const [option, setOption] = useState(null);
  const [openAnswer, setOpenAnswer] = useState('');
  const [showOpenAnswerSuccess, setShowOpenAnswerSuccess] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const onChangeOption = (e) => {
    const { checked, id: value } = e.target;
    const howDidYouHearAboutUs = checked ? value : null;

    setOption(howDidYouHearAboutUs);
    dispatch(createOrUpdateFirstTimerSurvey({ howDidYouHearAboutUs }));
  };

  const onChangeOpenAnswer = (e) => {
    const { value } = e.target;
    setOpenAnswer(value);
    dispatch(createOrUpdateFirstTimerSurvey({ howDidYouHearAboutUs: value }));

    clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(() => {
      setShowOpenAnswerSuccess(true);
      setTimeout(() => setShowOpenAnswerSuccess(false), 2000);
    }, 1000);

    setTimeoutId(newTimeoutId);
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
          onChange={onChangeOption}
          value={option === 'referral'}
          className="mb-1"
          formik={false}
        >
          Referral
        </InputCheckboxField>
        <InputCheckboxField
          name="ad"
          onChange={onChangeOption}
          value={option === 'ad'}
          className="mb-1"
          formik={false}
        >
          Ad
        </InputCheckboxField>
        <InputCheckboxField
          name="social-media"
          onChange={onChangeOption}
          value={option === 'social-media'}
          className="mb-1"
          formik={false}
        >
          Social Media
        </InputCheckboxField>
        <InputCheckboxField
          name="search-engine"
          onChange={onChangeOption}
          value={option === 'search-engine'}
          className="mb-1"
          formik={false}
        >
          Search Engine
        </InputCheckboxField>
        <InputCheckboxField
          name="another-website"
          onChange={onChangeOption}
          value={option === 'another-website'}
          className="mb-1"
          formik={false}
        >
          Another Website
        </InputCheckboxField>
        <div className="flex items-start">
          <InputCheckboxField
            name="other"
            onChange={onChangeOption}
            value={option === 'other'}
            formik={false}
          >
            Other
          </InputCheckboxField>
          {option === 'other' && (
            <InputTextField
              name="other-open"
              variant="shrink"
              value={openAnswer}
              onChange={onChangeOpenAnswer}
              className="text-sm ml-4"
              rightIcon
              icon={
                <FontAwesomeIcon
                  className={`text-green-500 text-xl transition-all duration-500 ${
                    showOpenAnswerSuccess ? 'opacity-100' : 'opacity-0'
                  }`}
                  icon={faCheckCircle}
                />
              }
              formik={false}
            />
          )}
        </div>
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
