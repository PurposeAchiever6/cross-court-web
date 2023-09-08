import React, { useEffect, useRef } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import { getIsAuthenticated } from 'screens/auth/reducer';
import PageLayout from 'shared/components/layout/PageLayout';
import SectionLayout from 'shared/components/layout/SectionLayout';
import Link from 'shared/components/Link';
import LogoSvg from 'shared/components/svg/LogoSvg';
import { UTM_SOURCE, UTM_SOURCES } from 'shared/utils/utm';

const AdsLayout = ({ children }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const { search } = useLocation();

  const urlParams = new URLSearchParams(search);
  const utmSource = urlParams.get(UTM_SOURCE);
  const GTM_ID = import.meta.env.VITE_GTM_ID;

  const alreadyRan = useRef(false);
  useEffect(() => {
    if (
      !GTM_ID ||
      import.meta.env.VITE_GTM_ENABLED !== 'true' ||
      alreadyRan.current ||
      utmSource !== UTM_SOURCES.GOOGLE
    ) {
      return;
    }

    alreadyRan.current = true;

    // Google Tag Manager
    ((w, d, s, l, i) => {
      w[l] = w[l] || [];
      w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js',
      });
      const f = d.getElementsByTagName(s)[0];
      const j = d.createElement(s);
      const dl = l != 'dataLayer' ? `&l=${l}` : '';
      j.async = true;
      j.src = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', GTM_ID);
  }, []);

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <PageLayout noPadding>
      <div className="px-4 md:px-10 pt-6 md:pt-10 pb-8 md:pb-12">
        <Link variant="none" to={ROUTES.HOME}>
          <LogoSvg className="w-44 md:w-56 text-white" />
        </Link>
      </div>
      {children}
      <SectionLayout as="footer" className="my-16">
        <div className="text-sm opacity-90">{`${new Date().getFullYear()}`} &copy; Crosscourt</div>
      </SectionLayout>
    </PageLayout>
  );
};

AdsLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdsLayout;
