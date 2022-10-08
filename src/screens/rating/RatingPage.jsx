import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import styled from 'styled-components';

import ROUTES from 'shared/constants/routes';
import BasketballSvg from 'shared/components/svg/BasketballSvg';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import BackButton from 'shared/components/BackButton';
import OnboardingTour from 'shared/components/OnboardingTour';
import { isOnboardingTourEnable, disableOnboardingTour } from 'shared/utils/onboardingTour';

import SkillRatingUpdateRequestModal from 'screens/rating/components/SkillRatingUpdateRequestModal/index';
import { updateSkillRatingInit } from 'screens/auth/actionCreators';

const Circle = styled.div`
  border: 2px solid white;
  background-color: transparent;
  height: 30px;
  border-radius: 50%;
  width: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ALLOWED_PATHS = [ROUTES.MYACCOUNT, ROUTES.SIGNUP];

const RATINGS = [
  {
    value: '1',
    name: 'Rookie',
    description:
      'Love the game. Not exactly a difference maker, but always looking to improve my skills ' +
      'and quiet the non-believers. Can easily hang with average to below average competition. ' +
      'Here for the vibes, the sweat, and some friendly competition.',
  },
  {
    value: '2',
    name: 'Rising Star',
    description:
      'Strong grasp of the fundamentals. Average to below average athleticism, but can hold my ' +
      'own against relatively standard competition. Would have a tough time creating shots or ' +
      'putting the team on my back in a more competitive environment. ' +
      'Show flashes once in a while.',
  },
  {
    value: '3',
    name: 'Vet',
    description:
      'Can make plays. Might not have played competitively within the last 15 years, ' +
      'but possess the skill set of a seasoned player. Can keep up with skilled competition ' +
      'and can turn it on even further when surrounded by above average players or when ' +
      'things heat up.',
  },
  {
    value: '4',
    name: 'All Star',
    description:
      'Walking bucket as the kids say. Ball is life. Played varsity or ' +
      "more back in the glory days. Can hang with the best of 'em. Play hard on both ends of " +
      'the court and love to run.',
  },
  {
    value: '5',
    name: 'MVP',
    description: 'Played D1 or professionally within the last 15 years.',
  },
];

const RatingPage = () => {
  const env = runtimeEnv();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const SKILL_RATINGS_FOR_REVIEW = env.REACT_APP_SKILL_RATINGS_FOR_REVIEW;
  const skillRatingsForReview = SKILL_RATINGS_FOR_REVIEW ? SKILL_RATINGS_FOR_REVIEW.split(',') : [];

  const [isEdit, setIsEdit] = useState(false);
  const [skillRating, setSkillRating] = useState(null);
  const [oldSkillRating, setOldSkillRating] = useState(null);
  const [showSkillRatingUpdateRequestModal, setShowSkillRatingUpdateRequestModal] = useState(false);

  const updateSkillRatingAction = () => dispatch(updateSkillRatingInit({ skillRating, isEdit }));

  const updateNeedsReview = () =>
    isEdit && oldSkillRating < skillRating && skillRatingsForReview.includes(skillRating);

  const handleClick = () => {
    updateNeedsReview() ? setShowSkillRatingUpdateRequestModal(true) : updateSkillRatingAction();
  };

  const isRatingDisabled = (rating) => !isEdit && skillRatingsForReview.includes(rating);

  useEffect(() => {
    if (!ALLOWED_PATHS.includes(location?.state?.from)) {
      history.push(ROUTES.HOME);
    }

    setIsEdit(location?.state?.isEdit ?? false);
    setSkillRating(location?.state?.currentValue ?? null);
    setOldSkillRating(location?.state?.currentValue ?? null);
  }, [location, history]);

  return (
    <>
      <div className="p-4 md:p-8">
        {isEdit && <BackButton className="my-6 md:mt-0" />}
        <h1 className="font-shapiro95_super_wide text-xl md:text-3xl text-center mt-4">
          SKILL ASSESSMENT SURVEY
        </h1>
        <h2 className="my-8 md:text-lg max-w-7xl mx-auto text-center">
          To give you the best experience possible, we ask that you choose one of the following
          descriptions of your current skill level so we are able to surround you with players of
          similar ability.
        </h2>
        <div className="text-white max-w-6xl mx-auto">
          {RATINGS.map((rating) => (
            <div
              className={`flex my-1 ${
                isRatingDisabled(rating.value) ? 'pointer-events-none opacity-70' : ''
              }`}
              key={rating.value}
            >
              <div className="flex items-center bg-cc-black p-4 md:px-8 md:py-4">
                <span className="w-4 text-center">{rating.value}</span>
                <span className="hidden sm:block ml-5 uppercase w-32">{rating.name}</span>
              </div>
              <div className="flex mx-1 bg-cc-black p-4 text-sm md:text-base w-full items-center">
                {rating.description}
              </div>
              <div
                className="relative flex justify-center items-center bg-cc-black cursor-pointer p-4 sm:p-7 md:px-10 md:py-8"
                onClick={() => setSkillRating(rating.value)}
              >
                <BasketballSvg
                  className={`w-6 h-6 ${skillRating === rating.value ? 'visible' : 'invisible'}`}
                />
                <Circle />
              </div>
            </div>
          ))}
          {!isEdit && skillRatingsForReview.length > 0 && (
            <div class="bg-cc-purple mt-2 md:mt-3 p-4 text-sm">
              Our advanced sessions are reserved for members only. Once a member, it's possible our
              Experience Team adjusts your skill level based on playstyle and sportsmanship. If your
              skill level isn't adjusted by Crosscourt, you have the ability to request a skill
              level update through your "My Account" portal. You will be asked to provide the
              necessary information, ranging from providing information showing at least university
              level played or referrals from existing members in the skill range selected.
            </div>
          )}
        </div>
        <div className="text-center">
          <PrimaryButton
            id="rating-btn"
            disabled={!skillRating}
            className="my-6"
            onClick={handleClick}
          >
            {isEdit ? 'SAVE' : 'SIGN UP'}
          </PrimaryButton>
        </div>
        {!isEdit && (
          <OnboardingTour
            id="onboarding-tour-rating"
            enabled={isOnboardingTourEnable('onboarding-tour-rating')}
            onExit={() => {
              disableOnboardingTour('onboarding-tour-rating');
              window.scrollTo({ top: 0 });
            }}
            steps={[
              {
                element: '#rating-btn',
                intro:
                  'Choose a description that most describes your current skill level and tap <strong>SIGN UP</strong> to receive your account verification email. Verify your email and a free session credit will be placed in your account. Make sure to check your other email folders if it’s not in your inbox. Side note: You are able to edit your skill level later.',
              },
            ]}
          />
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

export default RatingPage;
