import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import ROUTES from 'shared/constants/routes';
import BasketballSvg from 'shared/components/svg/BasketballSvg';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import BackButton from 'shared/components/BackButton';
import OnboardingTour from 'shared/components/OnboardingTour';
import { isOnboardingTourEnable } from 'shared/utils/onboardingTour';

import { updateSkillRatingInit } from '../../screens/auth/actionCreators';

const Circle = styled.div`
  border: 2px solid black;
  background-color: transparent;
  height: 30px;
  border-radius: 50%;
  width: 30px;
  position: absolute;
`;

const ALLOWED_PATHS = [ROUTES.MYACCOUNT, ROUTES.SIGNUP];

const RATINGS = [
  {
    value: '1',
    description: 'Just beginning my basketball career. Primarily here for the cardio and vibes',
  },
  {
    value: '1.5',
    description:
      'Limited basketball experience and primarily focused on improving the fundamentals and having a good time',
  },
  {
    value: '2',
    description:
      'Basic understanding of the game, but lack on-court experience and have obvious holes in my abilities, but working hard to improve',
  },
  {
    value: '2.5',
    description:
      'Can sustain full offensive and defensive gameplay with players of similar ability. Love to hustle. Difficulty hanging with players of incremental skill levels',
  },
  {
    value: '3',
    description:
      'Fairly consistent with dribbling and have a decent shot. Not too comfortable with different types of shots and lack confidence when trying to shoot off the dribble or off balance. Consider myself a force on defense',
  },
  {
    value: '3.5',
    description:
      'Have achieved improved shot dependability and have developed more control when shooting off balance, but still struggle shooting from deep or making difficult, contested shots. Here for a good time',
  },
  {
    value: '4',
    description:
      'Have a dependable shot from different areas of the court, including when off balance, plus have the ability to shoot consistently from different areas of the court. Occasionally force turnovers from lack of experience playing at a high level',
  },
  {
    value: '4.5',
    description:
      'Starting to master the ability to score in different and creative ways. Understand game-flow. Can control pacing and know how to facilitate my teammates in a way that leads to points',
  },
  {
    value: '5',
    description:
      'Have good court anticipation and consistently make shots as well as advanced passes. Can be a focal point of the offense and create own shots as well as force turnovers',
  },
  {
    value: '5.5',
    description:
      'Have developed into an impactful weapon on offense and defense. I can execute consistently on both ends of the floor. Look like I played D1, but wouldn’t have made the team',
  },
  {
    value: '6',
    description:
      'Have played competitive collegiate basketball at a D2, D3, or Junior College level within the last 20 years',
  },
  {
    value: '6.5',
    description:
      'Have played competitive collegiate basketball at a D1 level and/or professionally overseas within the last 20 years',
  },
  {
    value: '7',
    description:
      'Have played competitive basketball at a professional level in the US within the last 20 years',
  },
];

const Rating = () => {
  const [skillRating, setSkillRating] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const updateSkillRatingAction = () => dispatch(updateSkillRatingInit({ skillRating, isEdit }));

  const handleClick = () => {
    updateSkillRatingAction();
  };

  useEffect(() => {
    if (!ALLOWED_PATHS.includes(location?.state?.from)) history.push(ROUTES.HOME);
    setIsEdit(location?.state?.isEdit ?? false);
    setSkillRating(location?.state?.currentValue ?? null);
  }, [location, history]);

  return (
    <div className="flex color-cc-black justify-center p-4 md:p-8">
      <div className="flex flex-col">
        {isEdit && <BackButton className="my-6 md:mt-0" />}
        <h1 className="font-shapiro95_super_wide text-xl md:text-3xl text-center mt-4">
          SKILL ASSESSMENT SURVEY
        </h1>
        <h2 className="my-4 md:text-lg max-w-7xl text-center">
          To give you the best experience possible, we ask that you choose one of the following
          descriptions of your current skill level so we are able to surround you with players of
          similar ability.
        </h2>
        <div className="self-center">
          {RATINGS.map((rating) => (
            <div className="flex my-1 max-w-6xl" key={rating.value}>
              <div className="flex items-center justify-center mx-1 w-2/12 md:w-1/12 bg-gray-200">
                {rating.value}
              </div>
              <div className="flex mx-1 bg-gray-200 p-4 text-sm w-8/12 md:w-10/12 md:text-base">
                {rating.description}
              </div>
              <div
                className="flex items-center justify-center mx-1 w-2/12 md:w-1/12 bg-gray-200 cursor-pointer"
                onClick={() => setSkillRating(rating.value)}
              >
                {skillRating === rating.value && <BasketballSvg className="relative w-6 h-6" />}
                <Circle />
              </div>
            </div>
          ))}
        </div>
        <PrimaryButton
          id="rating-btn"
          disabled={!skillRating}
          className="my-6"
          onClick={handleClick}
        >
          {isEdit ? 'SAVE' : 'SIGN UP'}
        </PrimaryButton>
        {!isEdit && (
          <OnboardingTour
            id="onboarding-tour-rating"
            enabled={isOnboardingTourEnable('onboarding-tour-rating')}
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
    </div>
  );
};

export default Rating;
