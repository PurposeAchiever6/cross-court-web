import React from 'react';

import ROUTES from 'shared/constants/routes';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const AnyQuestions = () => (
  <section className="any-questions section-block text-white">
    <div className="title-and-button-block">
      <p className="title-1">ANY QUESTIONS?</p>
      <a className="title-2" href="mailto:ccteam@cross-court.com">
        EMAIL CCTEAM@CROSS-COURT.COM
      </a>
      <div className="button-wrapper">
        <PrimaryButton to={ROUTES.FAQSEM} double>
          FAQ
        </PrimaryButton>
      </div>
    </div>
  </section>
);

export default AnyQuestions;
