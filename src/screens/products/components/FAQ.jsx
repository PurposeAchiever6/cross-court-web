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
    question: 'Do sessions rollover to the next month?',
    answer:
      'A certain number of unused session credits will rollover each month depending on membership type. ' +
      'See above for specifics.',
  },
  {
    question: 'Can I schedule back-to-back sessions?',
    answer:
      'Yes, you may book a spot in back to back sessions. You will need to re-check in at the ' +
      'front desk between sessions.',
  },
];

const FAQ = () => (
  <section className="px-4 md:px-14 xl:px-24 text-white">
    <div className="max-w-screen-xl mx-auto">
      <h2 className="font-shapiro95_super_wide text-3xl italic mb-8">MEMBERSHIP FAQ</h2>
      <div>
        {QUESTIONS.map(({ question, answer }, index) => (
          <QuestionAnswer key={index} question={question} className="mb-8">
            {answer}
          </QuestionAnswer>
        ))}
      </div>
    </div>
  </section>
);

export default FAQ;
