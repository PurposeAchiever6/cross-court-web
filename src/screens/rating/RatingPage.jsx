import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import IntensityLevels from 'shared/components/IntensityLevels';
import PageLayout from 'shared/components/layout/PageLayout';
import SectionLayout from 'shared/components/layout/SectionLayout';
import ROUTES from 'shared/constants/routes';

const ALLOWED_PATHS = [ROUTES.SIGNUP];

const RatingPage = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!ALLOWED_PATHS.includes(location?.state?.from)) {
      history.push(ROUTES.HOME);
    }
  }, [location, history]);

  return (
    <PageLayout dark={false}>
      <SectionLayout>
        <h1 className="font-shapiro95_super_wide text-xl md:text-3xl text-center mt-4">
          SKILL ASSESSMENT SURVEY
        </h1>
        <IntensityLevels isEdit={false} />
      </SectionLayout>
    </PageLayout>
  );
};

export default RatingPage;
