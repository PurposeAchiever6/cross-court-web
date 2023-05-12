import React from 'react';

import SectionLayout from 'shared/components/layout/SectionLayout';
import Accordion from 'shared/components/Accordion';

const QUESTIONS = [
  {
    question: 'What are highlights and how do they work?',
    answer:
      'Once you’re a VET or MVP member, you have access to Session highlights where you can find your on court moments and clip them from your mobile device. Use your highlights to see where you can improve or share the gems on social. Instructions to access "Pixellot" can be found on the “content” page in our footer.',
  },
  {
    question: 'What are rollover credits?',
    answer:
      'To provide added flexibility, certain memberships, come with the rollover sessions where a fixed amount of unused Sessions from the prior month rollover to the next month.',
  },
  {
    question: 'What is the policy for cancelling a session or no showing?',
    answer:
      'In order to cancel a Reservation and return your purchased session to your account, you must cancel your Reservation at least 5 hours prior to the start time of such Reservation. Once your Reservation is cancelled on time, your purchased session will be returned to your account to be used at a future date. If you haven’t cancelled by the deadline listed above, your session will be used for the Reservation and will no longer be shown in your account. Any individual who cancels inside the 5 hour cancellation window will be automatically charged a $10 penalty in addition to losing a session credit. Booking a reservation and "no showing", or not cancelling a session you are signed up for, will result in a lost session credit (does not apply to MVP members) and a $20 no show penalty.',
  },
  {
    question: 'How much is it to rent a jersey? Can I buy a jersey instead?',
    answer:
      'Our VET and MVP memberships include free rental of a jersey and a towel for each session at no extra cost. Jerseys can be rented for $5 and towels for $3 for ROOKIE members/non-members or jerseys can purchased in club for $50.',
  },
  {
    question: 'How does the waitlist work?',
    answer:
      'All members have priority on the waitlist over non members, however, MVP members have priority over all members, while VET members have priority over ROOKIE members',
  },
  {
    question: 'If I have a membership, can I sign up for any session?',
    answer:
      'Members have potential to book our tiered sessions, although certain, higher intensity sessions may be unaccessible to some members depending on the individual\'s score in "My Account". Non-members do not have access to higher tiered sessions.',
  },
  {
    question: 'How does the membership freeze work?',
    answer:
      'If you’re going out of town or just need to take a quick break to recover, we have a pause membership feature for you. The Rookie and Vet Memberships allow you to pause your account for one month per year at no extra charge, while the MVP allows you to pause for two months per year for free. Once a free pause has been used, you can freeze your membership for a fee. You can pause your membership through your “My Account” portal.',
  },
  {
    question: 'How does private training work?',
    answer:
      'If you really want to take your game and confidence to the next level, you can book a 1:1 coaching session with one of our coaches by reaching out to us via email at ccteam@cross-court.com.',
  },
  {
    question: 'Is there a restriction on the number of sessions I can book in a single day?',
    answer:
      'Members can book two sessions per day max because we see that players reduce their intensity and effort if signed up for more than 2 sessions.',
  },
  {
    question: 'How does the drop in credit work? What do I get with that?',
    answer:
      'Drop in credits give you one credit that can be used for a session or SKLZ experience. You do not receive any membership perks.',
  },
  {
    question: 'How do I upgrade my skill level?',
    answer:
      'Members have the ability to request a skill level update through your "My Account" page by providing required information or requesting a "player evaluation". We’re here to help you level up on and off the court. If you feel you’ve put in the time through Sessions, SKLZ, private training, our Shooting Machine, and Office Hours to upgrade your skill level, then you can request an evaluation where hustle and skill will be evaluated in real time.',
  },
  {
    question: 'Can I cancel my membership at any time? ',
    answer:
      'You may cancel your membership at any time by going into "My Account" and completing the cancellation flow. Please note, we do require a 30 day notice for all cancellations and ask for certain information depending on the reason for cancelling. More information can be found in our "Terms of Service".',
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
