import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ROUTES from 'shared/constants/routes';
//import FreeSessionBanner from 'shared/components/FreeSessionBanner';

const FaqContainer = styled.div``;

const Faq = () => {
  return (
    <FaqContainer className="faq">
      {/* <FreeSessionBanner /> */}
      <h1>CROSSCOURT FAQ</h1>
      <div className="section-links">
        <a href="#players">PLAYERS</a> |{' '}
        <a href="#session-experience-manager">SESSION EXPERIENCE MANAGER</a> |{' '}
        <a href="#session-official">SESSION OFFICIAL</a>
      </div>
      <a name="players">&nbsp;</a>
      <br />
      <br />
      <br />
      <br />
      <h2>PLAYERS</h2>
      <div className="question-block">
        <h3>What&apos;s Crosscourt?</h3>
        <p>
          Crosscourt&apos;s a team-sport based fitness concept. We offer a high-intensity,
          basketball-based fitness experience. Each session&apos;s one hour, 15 players, and has a
          dedicated Experience Team. Built for the modern athlete, we emphasize a seamless and
          sweat-inducing experience. Our continuous games to 11 have a 5-minute time limit to keep
          the session fast-paced, while the presence of our Experience Team ensures the vibes are
          always on point.
        </p>
      </div>
      <div className="question-block">
        <h3>What&apos;s the format of a session?</h3>
        <ul>
          <li>
            The 60 minute session is made up of games to 5 minutes or 11 points by 2&apos;s and
            3&apos;s, whichever happens first
          </li>
          <li>Winner stays on for a max of 3 in a row</li>
          <li>All fouls are taken out of bounds closest to the foul</li>
          <li>All And 1&apos;s result in the ball back, taken out of bounds</li>
          <li>
            Each team gets 4 fouls/game, then all additional fouls result in a free throw worth 2
            points
          </li>
          <li>All 1 and 1&apos;s are instead a single free throw that counts as 2 points</li>
          <li>All fouls under 10 seconds result in a free throw that counts as two points</li>
          <li>The clock only stops under 10 seconds</li>
          <li>
            If a game is tied after 5 minutes, then we tip off for a "next basket wins" scenario
          </li>
        </ul>
      </div>
      <div className="question-block">
        <h3>What if I&apos;m not good at basketball?</h3>
        <p>
          "Everybody&apos;s an athlete" is one of our core values because we believe everyone
          deserves space on the court, regardless of ability, identity, or status. The court is
          where up and coming creatives, overworked professionals, and former varsity standouts come
          to sweat as equals. Our holistic approach to fitness is physically challenging, socially
          engaging, and mentally recharging. We also have Level 2 sessions to give those looking for
          that competitive edge the opportunity to showcase their elite skills.
        </p>
      </div>
      <div className="question-block">
        <h3>How many calories are burned per session?</h3>
        <p>
          60 minutes of non stop action gets those competitive juices flowing and makes for a major
          burn. While it depends on the person, you can expect to burn 500 to 1,000+ calories per
          session. Can&apos;t spell &quot;ball out&quot; without all out!
        </p>
      </div>
      <div className="question-block">
        <h3>Do you offer membership or can I purchase a single session?</h3>
        <p>
          We offer three types of series and a drop in option. All credits are non-expiring, so you
          can use the credits how you want, when you want.
        </p>
      </div>
      <div className="question-block">
        <h3>Do I need to be on a team to join or can I sign up by myself?</h3>
        <p>
          We exist to remove the barriers that make sports more work than workout. All you have to
          do is find a session that works for your schedule and sign up. When you arrive, we create
          the teams--first 5 to the gym are in the first game against the next 5 people to arrive.
        </p>
      </div>
      <div className="question-block">
        <h3>How old do I need to be to join?</h3>
        <p>You must be 18 or older to participate.</p>
      </div>
      <div className="question-block">
        <h3>What do I need to wear and bring?</h3>
        <p>
          Please bring athletic shoes (preferably basketball shoes), water, a ball, and towel if
          you&apos;ve got &apos;em. We provide custom jerseys, so all you need is some athletic
          drip, and you&apos;re good to go!
        </p>
      </div>
      <div className="question-block">
        <h3>What&apos;s the cancellation policy?</h3>
        <p>
          You can cancel your reservation up to 5 hours before your session begins in order to
          receive a refund.
        </p>
      </div>
      <div className="question-block">
        <h3>What happens if I forget to confirm or confirm but don&apos;t show up?</h3>
        <p>
          Forgetting to confirm or canceling after the cancellation window (less than 5 hours before
          your session) will result in a charge for the amount of your session credit and will not
          result in a refund. Confirming and no showing will also result in lost session credit. If
          this happens twice, your account will be flagged. The other players in the session are
          relying on your attendance, so not showing up will affect the entire group&apos;s experience.
        </p>
      </div>
      <div className="question-block">
        <h3>How early should I arrive?</h3>
        <p>
          We suggest arriving at least 10 minutes early since the first 10 players checked into our
          system will begin the session.
        </p>
      </div>
      <div className="question-block">
        <h3>What happens when I arrive?</h3>
        <p>
          After signing up, we&apos;ll send you a &quot;What to Expect&quot; video. When you arrive, find one
          of our Experience Managers if you are not greeted at the door. They will check you in and
          hand you a jersey. After finding out what color to wear, we recommend stretching out,
          getting to know your teammates, or snapping a photo for the gram before we tip off.
        </p>
      </div>
      <div className="question-block">
        <h3>Can I request to be on a specific team?</h3>
        <p>
          We cannot make specific arrangements. Crosscourt is a social form of exercise, and as such
          we recommend getting to know some of the other players in your session. If you enjoy going
          to the same location at the same time each week, then you will likely see the same players
          frequently. Also note, teams will be rotated if there are less than 15 players in a
          session.
        </p>
      </div>
      <div className="question-block">
        <h3>How do I book a Session?</h3>
        <p>
          Go to the <a href="locations">schedule/locations</a> tab on our website and find a session
          that works for you. Either filter by location, date, or time and just click &quot;Reserve.&quot; If
          you don&apos;t have any session credits, then you&apos;ll be asked to purchase before
          confirming your reservation.
        </p>
      </div>
      <div className="question-block">
        <h3>How can I become a Session Experience Manager or Session Official?</h3>
        <p>
          We&apos;re always looking for brand advocates to join the Crosscourt Experience Team! Just
          click the <a href="sem">JOIN THE TEAM</a> button on our website and fill out an
          application.
        </p>
      </div>
      <div className="question-block">
        <h3>Do you offer corporate events or private parties?</h3>
        <p>
          Yes! Please email <a href="mailto:ccteam@cross-court.com">ccteam@cross-court.com</a> for
          all private event inquiries.
        </p>
      </div>
      <div className="question-block">
        <h3>How does the waitlist work?</h3>
        <p>
          Our waitlist is first come, first serve. Join the waitlist for a session you&apos;re
          interested in, and we&apos;ll notify you if someone cancels.
        </p>
      </div>
      <div className="question-block">
        <h3>Want to see our terms &amp; conditions?</h3>
        <p>
          Link <a href="terms-and-conditions">HERE</a>.
        </p>
      </div>
      <a name="session-experience-manager">&nbsp;</a>
      <br />
      <br />
      <br />
      <br />
      <h2>SESSION EXPERIENCE MANAGER</h2>
      <div className="question-block">
        <h3>What does the Session Experience Manager do?</h3>
        <p>
          Crosscourt&apos;s Session Experience Managers are THE FACE of Crosscourt at each session.
          Part DJ, part MC, and part hype man/girl, you represent Crosscourt at each session you
          manage. You bring the energy and maintain it. If you have a fresh and energetic swagger,
          then you may be a perfect fit for Crosscourt&apos;s Session Experience Manager role!
        </p>
      </div>
      <div className="question-block">
        <h3>Do I need a car?</h3>
        <p>Yes! A car is required.</p>
      </div>
      <div className="question-block">
        <h3>What are the benefits?</h3>
        <p>As a Session Experience Manager, you get:</p>
        <ul>
          <li>Paid well</li>
          <li>Free Sessions</li>
          <li>Performance Bonus&apos;</li>
          <li>Equity in company</li>
          <li>Exclusive Merch</li>
          <li>To be the face of Crosscourt</li>
        </ul>
      </div>
      <div className="question-block">
        <h3>Is this a part time role?</h3>
        <p>
          Most, if not all, sessions take place after the workday, so being an SEM should complement
          your full time job.
        </p>
      </div>
      <a name="session-official">&nbsp;</a>
      <br />
      <br />
      <br />
      <br />
      <h2>SESSION OFFICIAL</h2>
      <div className="question-block">
        <h3>What does the role require?</h3>
        <p>
          As a Session Official, you&apos;ll have fun enforcing the Crosscourt rules and maintaining
          order on the court. This isn&apos;t your average referee role. We encourage getting to
          know the players, hitting a dance move in between games, or adding some flair to a foul
          call. You are a leader on the Crosscourt team and will work side by side with the Session
          Experience Manager to deliver an electric in-session experience, every time.
        </p>
      </div>
      <div className="question-block">
        <h3>Do I need to be able to play basketball?</h3>
        <p>
          You do not have to be good at basketball to be an SO, but you will need to be mobile as
          this job requires you to run up and down the court. A thorough understanding of basic
          basketball rules, officiating terms, and essential hand signals is required however.
        </p>
      </div>
      <div className="question-block">
        <h3>Do I need to be certified or have prior basketball officiating experience?</h3>
        <p>
          While we do not require you to be certified, you must have at least one full year of
          previous basketball officiating experience in order to be eligible for the Session
          Official role.
        </p>
      </div>
      <div className="question-block">
        <h3>What are the perks of being a Crosscourt Session Official?</h3>
        <p>As a Session Official, you will get:</p>
        <ul>
          <li>Paid well</li>
          <li>Free Sessions</li>
          <li>Performance Bonus&apos;</li>
          <li>Equity in company</li>
          <li>Exclusive Merch</li>
          <li>To be the face of Crosscourt</li>
        </ul>
      </div>
      <div className="question-block">
        <h3>Is this a part time role?</h3>
        <p>
          Most, if not all, sessions take place after the workday, so being an SEM should complement
          your full time jobs! If not, you will be able to officiate more sessions!
        </p>
      </div>
    </FaqContainer>
  );
};

export default Faq;
