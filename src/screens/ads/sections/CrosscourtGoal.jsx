import React from 'react';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import SectionLayout from 'shared/components/layout/SectionLayout';
import ExpandedLayout from 'shared/components/layout/ExpandedLayout';
import Button from 'shared/components/Button';
import DashedXSvg from 'shared/components/svg/DashedXSvg';
import crosscourtGoalImg from 'screens/ads/images/crosscourt-goal.jpg';

const CrosscourtGoal = ({ className }) => (
  <SectionLayout className={className}>
    <ExpandedLayout mdBreakpoint={false} lgBreakpoint={false} xlBreakpoint={false}>
      <img alt="crosscourt-goal-img" src={crosscourtGoalImg} className="max-w-3xl w-full mx-auto" />
    </ExpandedLayout>
    <div className="text-center">
      <h3 className="relative font-shapiro95_super_wide text-3xl -mt-20 md:-mt-12 mb-6">
        <span className="text-cc-purple">Unlock your potential</span>
        <br />
        <span>through team sport.</span>
      </h3>
      <Button to={ROUTES.SIGNUP}>Get Started</Button>
      <DashedXSvg className="mx-auto w-80 -mt-60 md:-mt-44" />
    </div>
  </SectionLayout>
);

CrosscourtGoal.defaultProps = {
  className: '',
};

CrosscourtGoal.propTypes = {
  className: PropTypes.string,
};

export default CrosscourtGoal;
