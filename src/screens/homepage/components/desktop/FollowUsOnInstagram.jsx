import React from 'react';
import {Helmet} from "react-helmet";

const FollowUsOnInstagram = () => (
  <section className="follow-us-on-instagram section-block text-purple">
    <section className="title-block">
      <p className="heading-sprite"></p>
    </section>
    <div className="instafeed">
      <Helmet>
        <script src="https://apps.elfsight.com/p/platform.js" defer></script>
      </Helmet>
      <div class="elfsight-app-65f4b4ad-3836-464b-a390-4922497c4d6d"></div>
    </div>
  </section>
);

export default FollowUsOnInstagram;
