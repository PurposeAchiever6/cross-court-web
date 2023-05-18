import React from 'react';

import SectionLayout from 'shared/components/layout/SectionLayout';
import Accordion from 'shared/components/Accordion';

const QUESTIONS = [
  {
    question: 'What are highlights?',
    answer:
      "Once you're a member, you have access to VOD content from your experience where you can find your personal highlights and clip them from your mobile device. Use your highlights to see where you can improve or share the gems on social. Instructions to access 'Pixellot' can be found in the footer of the website.",
  },
  {
    question: 'What are rollover credits?',
    answer:
      'To provide added flexibility to your busy schedule, memberships come with a rollover feature where a fixed amount of unused credits from the prior month rollover to the next month.',
  },
  {
    question: 'How much is it to rent a jersey and towel? Can I buy a jersey?',
    answer:
      'Our memberships include free rental of 1 jersey and 1 towel for the day at no extra cost. Additional towels can be rented per session or purchased in club. Jerseys for Day Pass players can be rented per session, or purchased in-club.',
  },
  {
    question: 'How does the waitlist work?',
    answer:
      'All members have priority on the waitlist over non members, however, MVP members have priority over all members, while VET members have priority over ROOKIE members.',
  },
  {
    question: 'If I have a membership, can I access any session?',
    answer:
      'Members have potential to book our tiered sessions, although certain, higher intensity sessions may be unaccessible to some members depending on the individual\'s score in "My Account". Non-members do not have access to higher tiered sessions.',
  },
  {
    question: 'How does membership freeze work?',
    answer:
      "If you're going out of town or just need to take a quick break to rest up, you can pause your membership. Some of the memberships may allow you to pause for free more than once. Once your free pauses have been used, you can still freeze your membership by paying a freeze fee. You can pause your membership through your 'My Account' portal. Free pauses reset each year. ",
  },
  {
    question: 'How many sessions can I book in a single day?',
    answer:
      'To ensure high quality play, and enable all members to have space on the court, we may restrict each member to booking a maximum number of sessions per day. This can change by location.',
  },
  {
    question: 'How does the Day Pass credit work?',
    answer:
      'Having a membership allows you to purchase additional Day Pass credits at a discount if the remaining credits in your account for that month have been used. Each additional Day Pass credit will be discounted for members, while non-members can purchase a Day Pas for regular price, which grants access to one experience and/or access to Office Hours on that day. Day Passes expire in 30 days.',
  },
  {
    question: 'How do I update my intensity level?',
    answer:
      "Members have the ability to request an intensity level update through the 'My Account' page. We're here to help you level up on and off the court. If you feel you've put in the time through Sessions, SKLZ, private training, our Shooting Machine, and Office Hours, then you can buy an evaluation credit or provide data to show you have played at a certain level of competitive basketball.",
  },
];

const FAQ = () => (
  <SectionLayout className="mb-12 md:mb-24">
    <h2 className="font-shapiro95_super_wide text-center text-lg mb-6 sm:mb-10">Membership FAQ</h2>
    <div className="max-w-5xl mx-auto">
      {QUESTIONS.map(({ question, answer }, index) => (
        <Accordion
          key={index}
          title={question}
          className="hover:bg-cc-blue-700 transition-all duration-300 mb-2"
        >
          {answer}
        </Accordion>
      ))}
    </div>
  </SectionLayout>
);

export default FAQ;
