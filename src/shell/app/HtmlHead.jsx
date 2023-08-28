import React from 'react';
import { Helmet } from 'react-helmet';
import faqJson from 'shared/utils/faqJson';

const GOOGLE_ADS_CODE = import.meta.env.VITE_GOOGLE_ADS_CODE;

const HtmlHead = () => (
  <Helmet>
    <script type="application/ld+json">{faqJson}</script>
    {import.meta.env.VITE_GTM_ENABLED === 'true' && (
      <>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_CODE}`}
        ></script>
        <script>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', "${GOOGLE_ADS_CODE}");
        `}
        </script>
      </>
    )}
  </Helmet>
);

export default HtmlHead;
