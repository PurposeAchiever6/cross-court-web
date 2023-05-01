import React from 'react';

import ROUTES from 'shared/constants/routes';
import Button from 'shared/components/Button';
import SectionLayout from 'shared/components/layout/SectionLayout';
import ExpandedLayout from 'shared/components/layout/ExpandedLayout';
import LineDashedSvg from 'shared/components/svg/LineDashedSvg';
import CircleDashedSvg from 'shared/components/svg/CircleDashedSvg';

import unlockYourPotentialImg from 'screens/homepage/images/unlock-your-potential.png';
import gradientEffectBgImg from 'screens/homepage/images/unlock-your-potential-gradient-effect.png';

const UnlockYourPotential = () => (
  <SectionLayout className="relative pb-12 md:pt-20 md:pb-20">
    <img
      src={gradientEffectBgImg}
      alt="cc-basketball-balls"
      className="hidden md:block absolute -top-20 inset-x-0 w-full h-[75%]"
    />
    <div className="relative pb-10 md:pb-28">
      <div className="flex flex-col-reverse">
        <img
          alt="unlock-your-potential-img"
          src={unlockYourPotentialImg}
          className="md:absolute right-12 -bottom-20 w-[35rem]"
        />
        <div className="relative md:w-1/2 mb-10 md:mb-0">
          <h1 className="font-shapiro95_super_wide text-3xl md:text-4xl xl:text-5xl mb-3">
            Unlock your potential through team sport.
          </h1>
          <p className="leading-6 mb-3">
            A basketball inspired social club built around thoughtfully designed spaces, a community
            bonded by team-sport, and member driven experiences that enable professionals in the
            game of life to elevate personally and professionally.
          </p>
          <h3 className="font-shapiro95_super_wide uppercase mb-3">Trust The Progress</h3>
          <div>
            <Button to={ROUTES.MEMBERSHIPS} className="mr-5">
              Join
            </Button>
            <Button to={ROUTES.WHY_JOIN} variant="outline-purple">
              Why Join?
            </Button>
          </div>
        </div>
      </div>
    </div>
    <ExpandedLayout
      mdBreakpoint={false}
      lgBreakpoint={false}
      xlBreakpoint={false}
      className="bg-cc-blue-700 px-6 sm:px-16 py-16 relative"
    >
      <LineDashedSvg className="absolute left-0 top-0 w-1/2 text-cc-purple" />
      <CircleDashedSvg className="absolute-center-x top-0 -mt-8 w-16 h-16 text-cc-purple" />
      <div className="max-w-lg mx-auto text-center">
        <p className="font-shapiro95_super_wide mb-4">
          Are you consistently looking for places, people, and perspectives that will bring out the
          best in you?
        </p>
        <p className="text-sm px-8">
          Something that can help you make strides socially, mentally, and physically.
        </p>
      </div>
    </ExpandedLayout>
  </SectionLayout>
);

export default UnlockYourPotential;
