import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { updateSkillRatingInit } from 'screens/my-account/actionCreators';
import { getSkillRatingUpdateLoading } from 'screens/my-account/reducer';
import OnboardingLayout, {
  OnboardingLayoutContent,
  OnboardingLayoutSidebar,
} from 'shared/components/layout/OnboardingLayout';
import BackButton from 'shared/components/BackButton';
import Button from 'shared/components/Button';
import IntensityLevels from 'screens/rating/components/IntensityLevels';

const OnboardingIntensityLevelPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [skillRating, setSkillRating] = useState(null);

  const isLoading = useSelector(getSkillRatingUpdateLoading);

  const updateSkillRating = () => {
    dispatch(
      updateSkillRatingInit(
        { skillRating },
        {
          disableSuccessToast: true,
          redirectTo: ROUTES.ONBOARDING_MEMBERSHIPS,
        }
      )
    );
  };

  return (
    <OnboardingLayout disableLink>
      <OnboardingLayoutContent>
        <h1 className="font-shapiro95_super_wide text-xl md:text-2xl mb-4">
          Intensity Level Assesment
        </h1>
        <IntensityLevels setSelectedSkillRating={setSkillRating} />
      </OnboardingLayoutContent>
      <OnboardingLayoutSidebar>
        <div className="flex items-stretch">
          <BackButton
            onClick={() => history.push(ROUTES.ONBOARDING_PERSONAL_DETAILS)}
            className="shrink-0 mr-3"
          />
          <Button
            onClick={updateSkillRating}
            loading={isLoading}
            disabled={!skillRating}
            className="w-full"
          >
            Next
          </Button>
        </div>
      </OnboardingLayoutSidebar>
    </OnboardingLayout>
  );
};

export default OnboardingIntensityLevelPage;
