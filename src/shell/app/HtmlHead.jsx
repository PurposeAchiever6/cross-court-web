import React from 'react';
import { Helmet } from 'react-helmet';
import faqJson from 'shared/utils/faqJson';

const HtmlHead = () => (
  <Helmet>
    <script type="application/ld+json">{faqJson}</script>
  </Helmet>
);

export default HtmlHead;
