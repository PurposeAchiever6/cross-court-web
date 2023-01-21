import React from 'react';
import QuestionAnswer from 'shared/components/QuestionAnswer';
import runtimeEnv from '@mars/heroku-js-runtime-env';

const LINK_CLASSES = 'text-cc-purple hover:text-opacity-60';

const Faq = () => {
  const env = runtimeEnv();

  return (
    <div className="px-4 md:px-12 py-12 max-w-5xl self-center">
      <h1 className="font-shapiro95_super_wide text-center text-xl md:text-3xl mb-6">FAQ</h1>
      <QuestionAnswer question="What is Crosscourt?" className="mb-8">
        Crosscourt&apos;s a team-sport based fitness company. We offer a high-intensity,
        basketball-based fitness experience. Each session&apos;s one hour, limited to 15 players,
        and has a dedicated Experience Team. Built for the modern athlete, we emphasize a seamless
        and sweat-inducing experience. Our continuous games to 11 have a 5-minute time limit to keep
        the session fast-paced, while the presence of our Session Officials ensures the vibes are
        always on point.
      </QuestionAnswer>
      <QuestionAnswer question="What is the format of a session?" className="mb-8">
        <ul>
          <li>
            - The 60 minute session is made up of games to 5 minutes or 11 points by 2&apos;s and
            3&apos;s, whichever happens first
          </li>
          <li>- Winner stays on for a max of 3 games in a row</li>
          <li>- All fouls are taken out of bounds closest to the foul</li>
          <li>- All And 1&apos;s result in the basket and ball back, taken out of bounds</li>
          <li>
            - Each team gets 5 fouls/game, then all additional fouls result in a single free throw
            worth 2 points
          </li>
          <li>- All 1 and 1&apos;s are instead a single free throw that counts as 2 points</li>
          <li>- All fouls under 10 seconds result in a free throw that counts as two points</li>
          <li>- The clock only stops under 10 seconds</li>
          <li>
            - If a game is tied after 5 minutes, then we tip off for a "next basket wins" scenario
          </li>
        </ul>
        <p className="mt-4">
          If you&apos;d like to see the Crosscourt Rules and Format in more detail, click{' '}
          <a className={LINK_CLASSES} href="rules">
            HERE
          </a>
        </p>
      </QuestionAnswer>
      <QuestionAnswer question="What if I'm not good at basketball?" className="mb-8">
        "Everybody&apos;s an athlete" is one of our core values because we believe everyone deserves
        space on the court, regardless of ability, identity, or status. We provide sessions for all
        skill level ranges. Each session is categorized into a beginner, intermediate, or advanced
        tier. Use the skill level assessment questionnaire provided during profile creation or find
        it in the "My Account" section to see which sessions are right for you.
      </QuestionAnswer>
      <QuestionAnswer question="How many calories are burned per session?" className="mb-8">
        60 minutes of non stop action gets those competitive juices flowing and makes for quite a
        burn. While it depends on the person, you can expect to burn 500 to 1,000+ calories per
        session. Our team-sport based workout engages the entire body through significant
        cardiovascular strain, constant plyometric movement, and natural high-intensity interval
        training. Can&apos;t spell ball out without all out!
      </QuestionAnswer>
      <QuestionAnswer
        question="Do you offer membership or can I purchase a single session?"
        className="mb-8"
      >
        While we do offer a drop in option, the Crosscourt community is mostly comprised of members
        who either purchase our 4 sessions per month package, our 8 sessions per month package, or
        our Unlimited sessions package. Check out our Memberships page to learn more.
      </QuestionAnswer>
      <QuestionAnswer
        question="Do I need to be on a team to join or can I sign up by myself?"
        className="mb-8"
      >
        We exist to remove the barriers that make sports more work than workout. All you have to do
        is find a session that works for your schedule and sign up. When you arrive, we create the
        teams--first 5 members to the gym begin the session against the next 5 members to arrive.
      </QuestionAnswer>
      <QuestionAnswer
        question="How old do you need to be to sweat with the #ccteam?"
        className="mb-8"
      >
        You must be 18 or older to participate.
      </QuestionAnswer>
      <QuestionAnswer question="What do I need to wear and bring?" className="mb-8">
        Please bring athletic shoes (preferably basketball shoes), a water bottle (water filler
        station on site), and towel if you&apos;ve got &apos;em. If you purchased a jersey, bring
        that as well. If not, you can rent one when you check in, unless it&apos;s your first time,
        in that case we lend you one for no additional cost. Please leave your basketball at home.
        We set it up, you lay it up!
      </QuestionAnswer>
      <QuestionAnswer question="What's the cancellation policy?" className="mb-8">
        You can cancel your reservation up to 5 hours before your session begins in order to receive
        a refund. Cancellations made less than 5 hours before your session will result in a fee or
        lost session credit.
      </QuestionAnswer>
      <QuestionAnswer
        question="What happens if I forget to cancel outside the cancellation window or don't show up?"
        className="mb-8"
      >
        In order to cancel a reservation and return your purchased session to your account, you must
        cancel your reservation at least 5 hours prior to the start time of such reservation. Once
        your reservation is cancelled on time, your session credit will be returned to your account
        to be used at a future date. If you haven’t cancelled by the deadline listed above, your
        session credit will be used for the reservation and will no longer be shown in your account.
        Any individual who cancels inside the 5 hour cancellation window will be automatically
        charged a ${env.REACT_APP_CANCELED_OUT_OF_TIME_PRICE} penalty in addition to losing a
        session credit. In case you're cancelling your first free session out of time, your session
        credit will be returned to your account for later use, but you will be charged a $
        {env.REACT_APP_FREE_SESSION_CANCELED_OUT_OF_TIME_PRICE} fee. Booking a reservation and "no
        showing" without cancelling a session you are signed up for, will result in a lost of the
        session credit and a ${env.REACT_APP_NO_SHOW_UP_FEE} no show penalty.
      </QuestionAnswer>
      <QuestionAnswer question="How early should I arrive?" className="mb-8">
        We suggest arriving at least 10 minutes early since the first 10 players checked into our
        system will begin the session.
      </QuestionAnswer>
      <QuestionAnswer question="What happens when I arrive?" className="mb-8">
        After signing up, we&apos;ll send you a “What to Expect” video. When you arrive, our Session
        Experience Manager will check you in and give you the low down. After finding out what color
        jersey to wear, we recommend putting your stuff in a locker, using the restrooms, stretching
        out, and getting to know your teammates.
      </QuestionAnswer>
      <QuestionAnswer question="Can I request to be on a specific team?" className="mb-8">
        We cannot make specific arrangements. Crosscourt is a social form of exercise, and as such
        we recommend getting to know some of the other players in your session. If you enjoy going
        to the same location at the same time each week, then you will likely see the same players
        frequently. Also note, teams will be rotated if there are less than 15 players in a session.
        We do offer private rentals if you and your friends want to book the facility.
      </QuestionAnswer>
      <QuestionAnswer question="How do I book a Session?" className="mb-8">
        Go to the <a href="locations">Schedule</a> tab on our website and find a session that works
        for you. Filter by date/time and just click “Reserve.” If you don&apos;t have any session
        credits, then you&apos;ll be asked to purchase before confirming your reservation.
      </QuestionAnswer>
      <QuestionAnswer
        question="How can I become a Session Experience Manager or Session Official?"
        className="mb-8"
      >
        We&apos;re always looking for brand advocates to join the Crosscourt Experience Team! Just
        click the JOIN THE TEAM button on our website and fill out an application.
      </QuestionAnswer>
      <QuestionAnswer question="Do you offer corporate events or private parties?" className="mb-8">
        Yes, please email{' '}
        <a className={LINK_CLASSES} href="mailto:ccteam@cross-court.com">
          ccteam@cross-court.com
        </a>{' '}
        or hit the CONTACT button below for all private event inquiries.
      </QuestionAnswer>
      <QuestionAnswer question="How does the waitlist work?" className="mb-8">
        Our waitlist is first come first serve. Join the waitlist for a session you&apos;re
        interested in, and we&apos;ll notify you if someone cancels!
      </QuestionAnswer>
      <QuestionAnswer
        question="How does upgrading or downgrading your membership works?"
        className="mb-8"
      >
        Changes to a membership such as upgrading or downgrading can result in prorated charges. For
        example, if a member upgrades from a 10 USD per month membership to a 20 USD option,
        they&apos;re charged prorated amounts for the time spent on each option. Assuming the change
        occurred halfway through the billing period, the member is billed an additional 5 USD: -5
        USD for unused time on the initial price, and 10 USD for the remaining time on the new
        price.
      </QuestionAnswer>
      <QuestionAnswer question="How did Crosscourt start?" collapsable className="mb-8">
        Crosscourt was started by two friends who were passionate about solving a problem they dealt
        with all too often: finding an efficient way to play pickup basketball. Both founders grew
        up around athletics and, after meeting at USC, bonded over their shared appreciation for
        sport, fitness, and culture. Following graduation from school and struggling to find a way
        to easily play pick up basketball, considering their busy work schedules, the founders
        decided to explore an original concept that would not only break the mold around pick-up
        basketball, but also redefine group fitness. Something that would allow the modern athlete
        to continue engaging in the sports they loved in an indoor gym setting, while improving
        their physical and mental wellbeing. Today, Crosscourt’s a diverse destination where modern
        athletes come to sweat and shed stress as equals.
      </QuestionAnswer>
      <QuestionAnswer question="Want to see our terms & conditions?">
        Link{' '}
        <a className={LINK_CLASSES} href="terms-and-conditions">
          HERE
        </a>
        .
      </QuestionAnswer>
    </div>
  );
};

export default Faq;
