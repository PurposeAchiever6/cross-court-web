import React from 'react';

import { MEMBERSHIPS_EXPERIENCES, MEMBERSHIPS_PERKS } from 'screens/products/constants';
import SectionLayout from 'shared/components/layout/SectionLayout';
import BackgroundSquare from 'shared/components/BackgroundSquare';
import ClickableInformationBox from 'shared/components/ClickableInformationBox';
import ccBasketballBallsImg from 'shared/images/membership-features/cc-basketball-balls.jpeg';

const MembershipsFeatures = () => (
  <SectionLayout className="relative pt-8 mb-24">
    <BackgroundSquare className="-mt-8 trasform -translate-x-20 lg:translate-x-60" />
    <div className="relative mb-32">
      <h2 className="font-shapiro95_super_wide uppercase text-3xl sm:text-4xl mb-6 sm:mb-10">
        Experiences
      </h2>
      <div className="flex flex-wrap sm:-m-2">
        {MEMBERSHIPS_EXPERIENCES.map(
          (
            {
              skip,
              icon,
              description,
              label,
              clipCorner,
              backgroundImage,
              darkenBackground,
              iconClassName,
            },
            index
          ) => (
            <div
              key={index}
              className={`w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 ${skip ? '' : 'mb-4 sm:mb-0 sm:p-2'}`}
            >
              {!skip && (
                <ClickableInformationBox
                  icon={icon}
                  description={description}
                  label={label}
                  clipCorner={clipCorner}
                  backgroundImage={backgroundImage}
                  darkenBackground={darkenBackground}
                  iconClassName={iconClassName}
                  className="h-72"
                />
              )}
            </div>
          )
        )}
      </div>
    </div>
    <div className="absolute right-20 trasform -translate-y-32 lg:-translate-y-24">
      <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent" />
      <img src={ccBasketballBallsImg} alt="cc-basketball-balls" className="w-[20rem]" />
    </div>
    <BackgroundSquare className="-mt-8 trasform -translate-x-20 lg:translate-x-24" />
    <div className="relative">
      <h2 className="font-shapiro95_super_wide uppercase text-3xl sm:text-4xl mb-6 sm:mb-10">
        Perks
      </h2>
      <div className="flex flex-wrap sm:-m-2">
        {MEMBERSHIPS_PERKS.map(
          ({ skip, name, description, clipCorner, backgroundImage }, index) => (
            <div
              key={index}
              className={`w-full sm:w-1/2 xl:w-1/4 ${skip ? '' : 'mb-4 sm:mb-0 sm:p-2'}`}
            >
              {!skip && (
                <ClickableInformationBox
                  title={name}
                  description={description}
                  clipCorner={clipCorner}
                  backgroundImage={backgroundImage}
                  className="h-72"
                />
              )}
            </div>
          )
        )}
      </div>
    </div>
  </SectionLayout>
);

export default MembershipsFeatures;
