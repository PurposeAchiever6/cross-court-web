import React from 'react';

import QuestionAnswer from 'shared/components/QuestionAnswer';

const QUESTIONS = [
  {
    question: "What's a session?",
    answer:
      'A session is our 60 minute basketball-based fitness experience. You can find available ' +
      'sessions on our schedule page.',
  },
  {
    question: 'Do sessions carryover to the next month?',
    answer:
      'Unused sessions do not carryover to the next month. Choose a Membership that works with ' +
      'your lifestyle.',
  },
  {
    question: 'Can I schedule back-to-back sessions?',
    answer:
      'Yes, you may book a spot in back to back sessions. You will need to re-check in at the ' +
      'front desk between sessions.',
  },
  {
    question: 'Are there any additional fees or add on items?',
    answer:
      'There are no initiation or cancellation fees. However, you will need to either rent or ' +
      "purchase a jersey, unless it's your first session (Free). We sell personal Crosscourt " +
      'water bottles and towels at the front desk if you need them.',
  },
  {
    question:
      'Does purchasing a membership mean I have access to the club during all business hours?',
    answer:
      'Unfortunately not. You will need to have a session booked within 30 minutes of arrival ' +
      'to be able to access the club.',
  },
];

const FAQ = () => (
  <section className="p-4 md:p-12 pt-0 md:pt-0 text-white">
    <h2 className="font-shapiro95_super_wide text-3xl italic mb-8">MEMBERSHIP FAQ</h2>
    <div>
      {QUESTIONS.map(({ question, answer }, index) => (
        <QuestionAnswer key={index} question={question} className="mb-8">
          {answer}
        </QuestionAnswer>
      ))}
    </div>
  </section>
);

export default FAQ;
