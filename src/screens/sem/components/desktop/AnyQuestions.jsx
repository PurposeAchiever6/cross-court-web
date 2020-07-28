import React from 'react';

import ROUTES from 'shared/constants/routes';
import ArButton from 'shared/components/ArButton';

const AnyQuestions = () => (
  <section className="any-questions section-block text-white">
    <div className="title-and-button-block">
      {/* <a href="mailto:ccteam@cross-court.com">
        <p className="heading-sprite"></p>
      </a> */}
      <p className="title-1">ANY QUESTIONS?</p>
      <a className="title-2" href="mailto:ccteam@cross-court.com">
        EMAIL CCTEAM@CROSS-COURT.COM
      </a>
      <div className="button-wrapper">
        <ArButton link={ROUTES.FAQSEM} double>
          FAQ
        </ArButton>
      </div>
    </div>
  </section>
);

export default AnyQuestions;
