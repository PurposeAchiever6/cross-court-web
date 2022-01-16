import React, { forwardRef } from 'react';

const TheSessionVideo = forwardRef((_, ref) => (
  <section>
    <video
      className="w-full"
      src="/how-it-works.mp4"
      autoPlay
      muted
      playsInline
      controls
      loop
      type="video/mp4"
      ref={ref}
    />
  </section>
));

export default TheSessionVideo;
