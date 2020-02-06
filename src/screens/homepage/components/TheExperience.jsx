import React from 'react';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import Button from 'shared/components/Button';
import device from 'shared/styles/mediaQueries';
import TheExperienceImage from '../images/TheExperience-mobile.jpg';
import EveryonesAnAthleteImage from '../images/EveryonesAnAthlete.jpg';
import NoBullshitPic from '../images/NoBullshitPic.jpg';
import NothingButVibePic from '../images/NothingButVibePic.jpg';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 3rem;
  button {
    margin-bottom: 6rem;
  }
  .the-experience-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 2rem;
    margin-bottom: 4rem;
    h1 {
      font-size: 2rem;
      letter-spacing: 0.2rem;
      line-height: 2.5rem;
      margin-bottom: 1.5rem;
      align-self: flex-start;
      span {
        font-weight: 900;
        display: block;
      }
    }
    p {
      width: 90%;
      font-size: 0.9rem;
    }
    img {
      margin-bottom: 2rem;
    }
  }
  .box-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 3.5rem;
    img {
      margin-bottom: 3rem;
    }
    p {
      width: 82%;
      font-size: 0.9rem;
      margin-bottom: 0;
    }
  }
  .nothing-but-vibe-container {
    position: relative;
    h2 {
      text-transform: uppercase;
      color: ${colors.white};
      position: absolute;
      width: 45%;
      bottom: 5rem;
      left: 4rem;
      font-weight: 700;
      font-size: 2rem;
      letter-spacing: 0.1rem;
      text-align: center;
      span {
        font-weight: 500;

        background-color: ${colors.black};
        display: block;
        em {
          font-weight: 700;
          text-align: center;
        }
      }
    }
  }
  .no-bullshit-container {
    position: relative;
    text-align: right;
    h2 {
      text-transform: uppercase;
      color: ${colors.white};
      position: absolute;
      width: 50%;
      bottom: 7rem;
      right: 4rem;
      font-weight: 700;
      font-size: 2rem;
      letter-spacing: 0.1rem;
      text-align: right;
      em {
        font-weight: 700;
        color: ${colors.white};
        background-color: ${colors.polarPlum};
        display: block;
        padding-right: 1rem;
      }
    }
  }
  .everyones-an-athlete-container {
    position: relative;
    h2 {
      text-transform: uppercase;
      color: ${colors.white};
      position: absolute;
      width: 60%;
      bottom: 9.5rem;
      left: 2rem;
      font-weight: 700;
      font-size: 2rem;
      letter-spacing: 0.1rem;
      text-align: center;
      span {
        font-weight: 500;

        background-color: ${colors.black};
        display: block;
        em {
          font-weight: 700;
          text-align: center;
        }
      }
    }
  }
  @media ${device.mobile} {
    img {
      width: 100%;
    }
  }
`;
const TheExperience = () => {
  return (
    <PageContainer>
      <div className="the-experience-container">
        <h1>
          THE <span>EXPERIENCE</span>
        </h1>
        <img src={TheExperienceImage} alt="The Experience" />
        <p>
          CrossCourt is a high-intensity, team based fitness experience. An electric-yet-cathartic
          workout that’s accesible, shareable, and covetable.
        </p>
        <p>
          We exist to remove the barriers that make sports more work than workout. We bring the
          venue, staff, and equipment. You just sign up, show up and <strong>sweat.</strong>
        </p>
      </div>
      <div className=" box-container nothing-but-vibe-container">
        <h2>
          Nothing
          <span>
            but <em>Vibe</em>
          </span>
        </h2>
        <img src={NothingButVibePic} alt="The Experience" />
        <p>
          A Cross Court session is not just a workout. It should feel like a fully crafted
          experience from start to finish.
        </p>
      </div>
      <div className=" box-container no-bullshit-container">
        <img src={NoBullshitPic} alt="The Experience" />
        <h2>
          No <em>BULLSH*T</em>
        </h2>
        <p>
          Sports shouldn’t be more work than workout. No more underwhelming pickup sessions. No more
          long term commitments to leagues. No more lame cardio. Just sign up, show up and sweat
        </p>
      </div>
      <div className=" box-container everyones-an-athlete-container">
        <img src={EveryonesAnAthleteImage} alt="The Experience" />
        <h2>
          Everyone&apos;s
          <span>
            an <em>Athlete</em>
          </span>
        </h2>
        <p>
          The court is where overworked professionals, weekend warriors, and up-and-coming creatives
          come together to sweat as equals. We are building a community where it’s not the
          differences that define us, but what we have in common
        </p>
      </div>
      <Button>Learn More</Button>
    </PageContainer>
  );
};

TheExperience.propTypes = {};

export default TheExperience;
