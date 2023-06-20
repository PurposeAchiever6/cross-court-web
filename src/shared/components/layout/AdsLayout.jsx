import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import { getIsAuthenticated } from 'screens/auth/reducer';
import PageLayout from 'shared/components/layout/PageLayout';
import SectionLayout from 'shared/components/layout/SectionLayout';
import Link from 'shared/components/Link';
import Button from 'shared/components/Button';
import LogoSvg from 'shared/components/svg/LogoSvg';

const AdsLayout = ({ children }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <PageLayout noPadding>
      <div className="flex justify-between items-center m-4 md:m-6">
        <Link className="z-10" variant="none" to={ROUTES.HOME}>
          <LogoSvg className="w-44 md:w-56 text-white" />
        </Link>
        <Button className="z-10" size="sm" to={ROUTES.MEMBERSHIPS}>
          Join Today
        </Button>
      </div>
      {children}
      <SectionLayout className="mt-24 mb-16">
        <div className="text-sm opacity-90">{`${new Date().getFullYear()}`} &copy; Crosscourt</div>
      </SectionLayout>
    </PageLayout>
  );
};

AdsLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdsLayout;
