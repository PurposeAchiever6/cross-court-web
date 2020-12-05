import React from 'react';
import barMalikImg from 'screens/homepage/images/bar-malik.png';

const BarMalik = () => (
  <section className="bar-malik">
    <img alt="Bar Malik" className="bar-malik-image" src={barMalikImg}></img>
    <div className="info-box">
      <p className="title">
        THE POWER OF
        <br />
        TEAM SPORT
      </p>
      <p className="description">
        "Crosscourt's team-sport based workout engages the entire body through significant cardiovascular strain, constant plyometric movement, and natural high intensity-interval training. Mentally, our socially charged experience can boost mood, reduce anxiety, improve sleep quality, and contribute to longevity."
      </p>
      <p className="author">
        <a href="https://twitter.com/barbell82" target="_blank">BAR MALIK</a>
      </p>
      <p className="role">
        Former Director of Performance for the NY Knicks<br />
        Men's Health Partner<br />
        Crosscourt Advisor
      </p>
    </div>
  </section>
);

export default BarMalik;
