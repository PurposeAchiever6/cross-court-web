import React from 'react';
import styled from 'styled-components';

import FreeIncludedIcon from 'shared/images/open-club/free-included-icon.png';
import StationaryBikeIcon from 'shared/images/open-club/stationary-bike-icon.png';
import TrainSoloIcon from 'shared/images/open-club/train-solo-icon.png';
import OwnRunsIcon from 'shared/images/open-club/own-runs-icon.png';

const StyledTitle = styled.div`
  .title {
    font-size: 45px;
    line-height: 45px;
  }

  .subtitle {
    font-size: 76px;
    line-height: 76px;
  }
`;

const HowItWorks = () => (
  <div className="h-full flex flex-col justify-evenly w-full bg-white text-center px-4 pb-12 md:pb-0">
    <StyledTitle>
      <p className="font-shapiro95_super_wide title mt-3 md:m-0">CC OPEN</p>
      <p className="font-shapiro95_super_wide text-stroke-width-2 text-white text-stroke-cc-black subtitle">
        CLUB
      </p>
    </StyledTitle>
    <div className="p-4 md:p-0">
      <div className="flex mb-10">
        <div className="flex flex-col items-center justify-center w-1/2">
          <img src={FreeIncludedIcon} alt="free-included" className="w-16 h-16 mb-2" />
          <p className="font-shapiro95_super_wide text-xs">INCLUDED WITH MEMBERSHIPS</p>
        </div>
        <div className="flex flex-col items-center justify-center w-1/2">
          <img src={TrainSoloIcon} alt="train-solo" className="w-20 h-20 mb-2" />
          <p className="font-shapiro95_super_wide text-xs">
            SHOOTAROUND/ <br /> TRAIN SOLO
          </p>
        </div>
      </div>
      <div className="flex mt-10">
        <div className="flex flex-col items-center justify-center w-1/2">
          <img src={StationaryBikeIcon} alt="bike" className="w-20 h-20 mb-2" />
          <p className="font-shapiro95_super_wide text-xs">
            HANG OUT/ <br /> STRETCH OUT
          </p>
        </div>
        <div className="flex flex-col items-center justify-center w-1/2">
          <img src={OwnRunsIcon} alt="own-runs" className="w-20 h-20 mb-2" />
          <p className="font-shapiro95_super_wide text-xs">
            SELF-ORGANIZE/ <br /> OWN RUNS
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default HowItWorks;
