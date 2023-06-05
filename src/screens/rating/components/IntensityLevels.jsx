import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'ramda';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import { initialLoadInit, updateSkillRatingInit } from 'screens/my-account/actionCreators';
import { getUserProfile, getPageLoading } from 'screens/my-account/reducer';
import Loading from 'shared/components/Loading';
import HeaderAction from 'shared/components/HeaderAction';
import SelectableBox from 'shared/components/SelectableBox';
import SkillRatingUpdateRequestModal from 'screens/rating/components/SkillRatingUpdateRequestModal';

export const LEVELS = [
  {
    value: '1',
    title: 'Level 1',
    subtitle: 'Lowest Intensity',
    description:
      "New to the game and haven't played in a while. Here for the vibes, the sweat, and the people.",
  },
  {
    value: '2',
    title: 'Level 2',
    subtitle: 'Light Intensity',
    description:
      'Developing a foundational skill set. Inconsistent play. Limited conditioning. ' +
      'Basic understanding of the game, but limited interest in sprinting the floor against ' +
      'average to above average competition.',
  },
  {
    value: '3',
    title: 'Level 3',
    subtitle: 'Neutral Intensity',
    description:
      "Didn't play on an organized team at a varsity level or higher, but I can keep up " +
      'in an intermediate session.',
  },
  {
    value: '4',
    title: 'Level 4',
    subtitle: 'High Intensity',
    description:
      'Played at a varsity level or higher within last 20 years. Strong understanding of where ' +
      'to be on the court and have the cardio to run the floor. Can hang and add value in a ' +
      'higher intensity session.',
  },
  {
    value: '5',
    title: 'Level 5',
    subtitle: 'Highest Intensity',
    description:
      'Played D3 or better in the last 10 years (must submit verification of highest level ' +
      'played to be a 5)',
  },
];

const IntensityLevels = ({ isEdit, setSelectedSkillRating }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const SKILL_RATINGS_FOR_REVIEW = import.meta.env.VITE_SKILL_RATINGS_FOR_REVIEW;
  const SKILL_RATINGS_FOR_REVIEW_ON_EDIT = import.meta.env.VITE_SKILL_RATINGS_FOR_REVIEW_ON_EDIT;

  const skillRatingsForReview = SKILL_RATINGS_FOR_REVIEW
    ? SKILL_RATINGS_FOR_REVIEW.split(',').sort()
    : [];
  const skillRatingsForReviewOnEdit = SKILL_RATINGS_FOR_REVIEW_ON_EDIT
    ? SKILL_RATINGS_FOR_REVIEW_ON_EDIT.split(',')
    : [];

  const currentUser = useSelector(getUserProfile);
  const isLoading = useSelector(getPageLoading);
  const { skillRating: currentValue } = currentUser;

  const [skillRating, setSkillRating] = useState(null);
  const [oldSkillRating, setOldSkillRating] = useState(null);
  const [showSkillRatingUpdateRequestModal, setShowSkillRatingUpdateRequestModal] = useState(false);

  const updateNeedsReview =
    isEdit && oldSkillRating < skillRating && skillRatingsForReviewOnEdit.includes(skillRating);

  const isRatingDisabled = (rating) => !isEdit && skillRatingsForReview.includes(rating);

  const updateSkillRating = () => {
    updateNeedsReview
      ? setShowSkillRatingUpdateRequestModal(true)
      : dispatch(updateSkillRatingInit({ skillRating }));
  };

  const selectSkillRating = (value) => {
    setSkillRating(value);
    if (setSelectedSkillRating) {
      setSelectedSkillRating(value);
    }
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(initialLoadInit());
    }
  }, [isEdit, dispatch]);

  useEffect(() => {
    const value = currentValue ?? null;

    setSkillRating(value);
    setOldSkillRating(value);

    if (setSelectedSkillRating) {
      setSelectedSkillRating(value);
    }
  }, [currentValue]);

  if (isEdit && (isLoading || isEmpty(currentUser))) {
    return <Loading />;
  }

  return (
    <>
      {isEdit && (
        <HeaderAction
          confirmText="Save"
          onConfirm={updateSkillRating}
          cancelText="Cancel"
          onCancel={() => history.push(ROUTES.MYACCOUNT)}
        />
      )}
      <div>
        <p className="text-sm mb-4">
          To give you the best experience possible, please choose your desired, on court intensity
          level so we are able to surround you with similar players.
        </p>
        <div className="text-white">
          {LEVELS.map((level) => (
            <SelectableBox
              key={level.value}
              variant="blue-dark"
              disabled={isRatingDisabled(level.value)}
              selected={skillRating === level.value}
              onClick={() => selectSkillRating(level.value)}
              className="my-1"
            >
              <h4 className="font-shapiro95_super_wide text-xl">{level.title}</h4>
              <span className="block text-lg text-cc-purple my-1">{level.subtitle}</span>
              <span className="block text-sm">{level.description}</span>
            </SelectableBox>
          ))}
        </div>
        {!isEdit && skillRatingsForReview.length > 0 && (
          <div className="text-sm mt-3">
            You must already be a member to upgrade to levels{' '}
            {new Intl.ListFormat().format(skillRatingsForReview)}
          </div>
        )}
      </div>
      <SkillRatingUpdateRequestModal
        isOpen={showSkillRatingUpdateRequestModal}
        closeHandler={() => setShowSkillRatingUpdateRequestModal(false)}
        newSkillRating={skillRating}
      />
    </>
  );
};

IntensityLevels.defaultProps = {
  isEdit: false,
  setSelectedSkillRating: null,
};

IntensityLevels.propTypes = {
  isEdit: PropTypes.bool,
  setSelectedSkillRating: PropTypes.func,
};

export default IntensityLevels;
