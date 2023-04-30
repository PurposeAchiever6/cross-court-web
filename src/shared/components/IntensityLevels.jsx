import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';
import { useHistory } from 'react-router-dom';

import HeaderAction from 'shared/components/HeaderAction';
import BasketballSvg from 'shared/components/svg/BasketballSvg';
import Button from 'shared/components/Button';
import { initialLoadInit, updateSkillRatingInit } from 'screens/my-account/actionCreators';
import { getUserProfile, getPageLoading } from 'screens/my-account/reducer';

import SkillRatingUpdateRequestModal from 'screens/rating/components/SkillRatingUpdateRequestModal/index';
import Loading from 'shared/components/Loading';

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

const IntensityLevels = ({ isEdit }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const SKILL_RATINGS_FOR_REVIEW = import.meta.env.VITE_SKILL_RATINGS_FOR_REVIEW;
  const SKILL_RATINGS_FOR_REVIEW_ON_EDIT = import.meta.env.VITE_SKILL_RATINGS_FOR_REVIEW_ON_EDIT;

  const skillRatingsForReview = SKILL_RATINGS_FOR_REVIEW ? SKILL_RATINGS_FOR_REVIEW.split(',') : [];
  const skillRatingsForReviewOnEdit = SKILL_RATINGS_FOR_REVIEW_ON_EDIT
    ? SKILL_RATINGS_FOR_REVIEW_ON_EDIT.split(',')
    : [];

  const [skillRating, setSkillRating] = useState(null);
  const [oldSkillRating, setOldSkillRating] = useState(null);
  const [showSkillRatingUpdateRequestModal, setShowSkillRatingUpdateRequestModal] = useState(false);

  useEffect(() => {
    if (isEdit) {
      dispatch(initialLoadInit());
    }
  }, [isEdit, dispatch]);

  const profile = useSelector(getUserProfile);
  const isLoading = useSelector(getPageLoading);
  const { skillRating: currentValue } = profile;

  useEffect(() => {
    setSkillRating(currentValue ?? null);
    setOldSkillRating(currentValue ?? null);
  }, [currentValue]);

  const updateSkillRatingAction = () => dispatch(updateSkillRatingInit({ skillRating, isEdit }));

  const updateNeedsReview =
    isEdit && oldSkillRating < skillRating && skillRatingsForReviewOnEdit.includes(skillRating);

  const handleClick = () => {
    updateNeedsReview ? setShowSkillRatingUpdateRequestModal(true) : updateSkillRatingAction();
  };

  const isRatingDisabled = (rating) => !isEdit && skillRatingsForReview.includes(rating);

  if (isEdit && (isLoading || isEmpty(profile))) {
    return <Loading />;
  }

  return (
    <>
      {isEdit && (
        <HeaderAction
          confirmText="Save"
          onConfirm={handleClick}
          cancelText="Cancel"
          onCancel={() => history.goBack()}
        />
      )}
      <h2 className="my-8 max-w-7xl mx-auto">
        To give you the best experience possible, please choose your desired, on court intensity
        level so we are able to surround you with similar players.
      </h2>
      <div className="text-white max-w-6xl mx-auto">
        {LEVELS.map((level) => (
          <div
            className={`flex my-1 ${
              isRatingDisabled(level.value) ? 'pointer-events-none opacity-70' : ''
            }`}
            key={level.value}
          >
            <div className="bg-cc-blue-500 px-6 py-4 w-full">
              <h4 className="font-shapiro95_super_wide text-xl">{level.title}</h4>
              <span className="block text-lg text-cc-purple my-1">{level.subtitle}</span>
              <span className="block text-sm">{level.description}</span>
            </div>
            <div
              className="relative flex justify-center items-center bg-cc-blue-700 cursor-pointer p-4 sm:p-7 md:px-6 md:py-8"
              onClick={() => setSkillRating(level.value)}
            >
              <BasketballSvg
                className={`w-6 h-6 text-cc-purple ${
                  skillRating === level.value ? 'visible' : 'invisible'
                }`}
              />
              <div className="border-2 border-cc-purple bg-transparent h-[30px] w-[30px] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        ))}
        {!isEdit && skillRatingsForReview.length > 0 && (
          <div className="bg-cc-purple mt-2 md:mt-3 p-4 text-sm">
            To create the best experience for our members, our higher tiered sessions are available
            to members that display strong offensive and defensive skill, along with an ability to
            run up and down the court consistently with high energy. Once a member, you will have
            the ability to request a skill level update by providing proof of at least varsity level
            played or by undergoing a player evaluation, where our Experience Team will use an
            Evaluation Form to provide a rating after evaluating your performance and hustle during
            a live session.
          </div>
        )}
      </div>
      {!isEdit && (
        <div className="text-center">
          <Button disabled={!skillRating} className="my-6" onClick={handleClick}>
            NEXT
          </Button>
        </div>
      )}
      <SkillRatingUpdateRequestModal
        isOpen={showSkillRatingUpdateRequestModal}
        closeHandler={() => setShowSkillRatingUpdateRequestModal(false)}
        newSkillRating={skillRating}
      />
    </>
  );
};

IntensityLevels.propTypes = {
  isEdit: PropTypes.bool,
};

IntensityLevels.defaultProps = {
  isEdit: false,
};

export default IntensityLevels;
