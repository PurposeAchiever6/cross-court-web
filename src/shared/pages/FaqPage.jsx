import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ROUTES from 'shared/constants/routes';
import FreeSessionBanner from 'shared/components/FreeSessionBanner';

const SemHandbookPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  ol,
  ul {
    li {
      margin-bottom: 0.5rem;
    }
  }
`;

const SemHandbookPage = () => {
  return (
    <SemHandbookPageContainer>
      <FreeSessionBanner />
      <h2>CrossCourt FAQ</h2>
      <h3>Players</h3>
      <ul>
        <li>
          <h4>What is CrossCourt?</h4>
          <p>
            CrossCourt is a premium high-intensity fitness experience achieved through team-based
            sports. We host basketball sessions geared to help athletes of all abilities shed sweat
            and stress with a fast-paced one-hour workout. CrossCourt connects teammates via an
            innovative digital experience, and crafts the ultimate vibe with certified session
            officials, quality facilities, and fresh soundtracks. You just have to sign up, show up,
            and sweat.
          </p>
        </li>
        <li>
          <h4>What is a session like?</h4>
          <p>
            A Cross Court session is not just a workout. It is a fully crafted experience from start
            to finish. Our workouts are electric and fast-paced, focusing on agility, cardio,
            endurance, balance, and coordination. Each one hour session is made up of games to 11 by
            2’s and 3’s or 5 minutes, whichever comes first.{' '}
          </p>
        </li>
        <li>
          <h4>What is the format of a session?</h4>
          <p>
            Each session is one hour and limited to 15 participants to make sure everyone leaves
            dripping in sweat. The first 10 players to check in will begin the first game. The
            winning team stays for a max of 3 wins in a row. We aim for 10-15 games per Session.{' '}
          </p>
        </li>
        <li>
          <h4>What if I’m not good at basketball?</h4>
          <p>
            “Everybody is an athlete” is one of our core values because we believe everyone deserves
            space on the court, regardless of ability, identity, or status. The court is where
            overworked professionals, off-season athletes, and up-and-coming creatives come together
            to sweat as equals. We are building a community where it’s not the differences that
            define us, but what we have in common. Our Level 2 sessions exist to give those looking
            for that competitive edge the opportunity to showcase some of their elite skills.
          </p>
        </li>
        <li>
          <h4>How many calories are burned per class?</h4>
          <p>
            60 minutes of non stop action gets those competitive juices flowing and makes for a
            major burn. While it depends on the person, you can expect to burn{' '}
            <strong>400 to 700 calories per session</strong>.
          </p>
        </li>
        <li>
          <h4>Do you offer membership or can I purchase a single session?</h4>
          <p>
            We offer three types of series and a drop in option. All credits are non expiring, so
            use how you want, when you want.
          </p>
        </li>
        <li>
          <h4>Do I need to be on a team to join or can I sign up by myself?</h4>
          <p>
            We exist to remove the barriers that make sports more work than workout, which is why we
            make it as easy as possible to get involved. Show up solo or sign up with friends. We’ll
            handle the teams.
          </p>
        </li>
        <li>
          <h4>How old do you need to be to join?</h4>
          <p>You must be 18 or older to participate.</p>
        </li>
        <li>
          <h4>What do I need to wear and bring?</h4>
          <p>
            Please bring athletic shoes (preferably basketball shoes), water, and ball and towel if
            you have them. We provide the jerseys, so just wear athletic gear, show up on time, and
            you’ll be good to go!
          </p>
        </li>
        <li>
          <h4>What are the rules and format?</h4>
          <ul>
            <li>
              The 60 minute Session is made up of games to 5 minutes or 11 points by 2&apos;s and
              3&apos;s, whichever happens first
            </li>
            <li>Winner stays on for a max of 3 in a row</li>
            <li>All fouls are taken out of bounds closest to the foul</li>
            <li>All And 1&apos;s result in the ball back, taken out of bounds</li>
            <li>Each team gets 4 fouls, then all additional result in a 1 and 1 scenario</li>
            <li>
              At CrossCourt, all 1 and 1&apos;s are instead a single free throw that counts as 2
              points
            </li>
            <li>
              All fouls under 10 seconds result in a CrossCourt 1 and 1The clock only stops under 10
              seconds
            </li>
            <li>
              If a game is tied after 5 minutes, we tip off for a &quot;next basket wins&quot;
              scenario
            </li>
          </ul>
        </li>
        <li>
          <h4>What’s the cancellation policy?</h4>
          <p>
            <strong>
              You can cancel your reservation up to 8 hours before your session begins in order to
              receive a refund.
            </strong>{' '}
            CrossCourt being a team sports based fitness experience means that your teammates are
            relying on your presence, so our cancellation policy is strict
          </p>
        </li>
        <li>
          <h4>What happens if I forget to confirm or confirm but don’t show up?</h4>
          <p>
            Forgetting to confirm or canceling after the cancellation window (less than 8 hours
            before your session) will result in a charge for the amount of your session credit and
            will not result in a refund. Confirming and no showing will also result in lost session
            credit. If this happens twice, your account will be flagged. The other players in the
            session are relying on your attendance so not showing up will affect the entire group’s
            experience
          </p>
        </li>
        <li>
          <h4>How early should I arrive?</h4>
          <p>
            We suggest arriving at least 10 minutes early since the first 10 players checked into
            our system will begin the first game.
          </p>
        </li>
        <li>
          <h4>What happens when I arrive?</h4>
          <p>
            After signing up, we will send you a “What to Expect” video. When you arrive, find one
            of our Experience Managers if you are not greeted at the door. They will check you in
            and hand you a jersey. After finding out what color to wear, we recommend stretching
            out, getting to know your teammates, or snapping a photo for the gram before we tip off.
          </p>
        </li>
        <li>
          <h4>Can I request to be on a specific team?</h4>
          <p>
            As of today, we cannot make specific arrangements. CrossCourt is a social form of
            exercise, and as such we recommend getting to know some of the other players in your
            session. If you enjoy going to the same location at the same time each week, then you
            will likely see the same players frequently.
          </p>
        </li>
        <li>
          <h4>How far in advance can I reserve a session?</h4>
          <p>Our sessions are available to sign up a month in advance.</p>
        </li>
        <li>
          <h4>Do my sessions expire?</h4>
          <p>Our sessions and series do not expire.</p>
        </li>
        <li>
          <h4>How do I book a Session?</h4>
          <p>
            Go to our <Link to={ROUTES.LOCATIONS}>schedule/locations</Link> tab on our website and
            find a session that works for you. Either filter by location, date, or time and just
            click “Reserve.” If you do not have any session credits, you will be asked to purchase
            before confirming your reservation.
          </p>
        </li>
        <li>
          <h4>How can I become a Session Experience Manager or Session Official?</h4>
          <p>
            We are always looking for brand advocates to join the CrossCourt Experience Team. Just
            click the <Link to={ROUTES.SEM}>Become an SEM/SO</Link> button on our website and fill
            out an application.
          </p>
        </li>
        <li>
          <h4>If I join, can I go to any location?</h4>
          <p>Yes, our series are location transferable.</p>
        </li>
        <li>
          <h4>Do you offer corporate events or private parties?</h4>
          <p>Yes, please email info@crosscourtball.com for all private event inquiries</p>
        </li>
        <li>
          <h4>How does the waitlist work?</h4>
          <p>
            Our waitlist is first come first serve. Join the waitlist for a session you’re
            interested in, and we’ll notify you if someone cancels.
          </p>
        </li>
        <li>
          <h4>Do you have lockers or showers?</h4>
          <p>
            We do not have lockers or showers available so we ask you neatly and safely store your
            belongings before the session
          </p>
        </li>
        <li>
          <h4>Want to see our terms & conditions?</h4>
          <p>
            Link <Link to={ROUTES.TERMS}>HERE</Link>
          </p>
        </li>
        <li>
          <h4>Want to see our cancelation policy?</h4>
          <p>
            Link <Link to={ROUTES.CANCELATIONPOLICY}>HERE</Link>
          </p>
        </li>
        <li>
          <h4>How can I become a Session Experience Manager or Session Official?</h4>
          <p>
            We are always looking for brand advocates to join the CrossCourt Experience Team. Just
            click the <Link to={ROUTES.SEM}>Become an SEM/SO</Link> button on our website and fill
            out an application.
          </p>
        </li>
      </ul>

      <h3>Session Experience Manager </h3>

      <ol>
        <li>
          <h4>What does the Session Experience Manager do?</h4>
          <p>
            The Session Experience Manager is the face of CrossCourt at each session and is
            responsible for managing the session from beginning to end. That includes being early to
            set up the kit, greeting players as they arrive, keeping score/time, and motivating
            players throughout Session.
          </p>
        </li>
        <li>
          <h4>Do I need a car?</h4>
          <p>Yes, a car is required.</p>
        </li>
        <li>
          <h4>Do I need to be good at basketball or in great shape?</h4>
          <p>
            You do not have to be good at basketball or in good shape to be an SEM. You just need to
            be accountable, charismatic, and empowering.
          </p>
        </li>
        <li>
          <h4>What are the benefits?</h4>
          <p>As a Session Experience Manager, you get:</p>
          <ul>
            <li>Paid well</li>
            <li>Free Sessions</li>
            <li>Performance Bonus’</li>
            <li>Equity in company </li>
            <li>Exclusive Merch </li>
            <li>To be the face of CrossCourt </li>
          </ul>
        </li>
        <li>
          <h4>Is this a part time role?</h4>
          <p>
            Yes this role is designed to fit your schedule and give you the ability to be flexible.
            Most, if not all, sessions take place after the workday, so being an SEM should
            complement your full time job
          </p>
        </li>
      </ol>

      <h3>Session Official </h3>

      <ul>
        <li>
          <h4>What does the role require?</h4>
          <p>
            The Session Official is at each Session and plays an important role as a member of the
            Experience Team. The SO is responsible for checking players in, handing out jerseys, and
            making sure the Session runs smoothly. You will enforce the rules and maintain order on
            the court, which will require you to be highly active throughout the session, running
            down the court and getting to the right spots.
          </p>
        </li>
        <li>
          <h4>Do I need to be able to play basketball?</h4>
          <p>
            You do not have to be good at basketball to be an SO, but you will need to be mobile as
            this job requires you to
          </p>
        </li>
        <li>
          <h4>What are the benefits</h4>
          <p>As a Session Official, you will get:</p>
          <ul>
            <li>Paid well</li>
            <li>Free Sessions</li>
            <li>Performance Bonus’</li>
            <li>Equity in company </li>
            <li>Exclusive Merch </li>
            <li>To be the face of CrossCourt </li>
          </ul>
        </li>
        <li>
          <h4>Is this a part time role?</h4>
          <p>
            Yes this role is designed to fit your schedule and give you the ability to be flexible.
            Most, if not all, sessions take place after the workday, so being an SEM should
            complement your full time job
          </p>
        </li>
      </ul>
    </SemHandbookPageContainer>
  );
};

export default SemHandbookPage;
