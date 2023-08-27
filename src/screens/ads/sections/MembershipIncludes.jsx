import React from 'react';
import PropTypes from 'prop-types';

import SectionLayout from 'shared/components/layout/SectionLayout';
import ExpandedLayout from 'shared/components/layout/ExpandedLayout';
import fullGymAccessImg from 'screens/ads/images/full-gym-access.png';
import shootingMachineImg from 'screens/ads/images/shooting-machine.png';
import trainingEquipmentImg from 'screens/ads/images/training-equipment.png';
import recoveryZoneImg from 'screens/ads/images/recovery-zone.png';
import skillsTrainingImg from 'screens/ads/images/skills-training.png';
import workspaceImg from 'screens/ads/images/workspace.png';
import memberEventsImg from 'screens/ads/images/member-events.png';
import freeParkingIconImg from 'screens/ads/images/free-parking-icon.png';
import onSiteStaffIconImg from 'screens/ads/images/on-site-staff-icon.png';
import officialsIconImg from 'screens/ads/images/officials-icon.png';
import wifiIconImg from 'screens/ads/images/wifi-icon.png';

const MembershipIncludes = ({ className }) => (
  <SectionLayout className={className}>
    <h3 className="font-shapiro95_super_wide text-center text-2xl mb-6">
      But wait, there’s more. Every <span className="text-cc-purple">membership</span> includes:
    </h3>
    <ExpandedLayout mdBreakpoint={false} lgBreakpoint={false} xlBreakpoint={false}>
      <div className="md:flex justify-between gap-3 lg:gap-6 md:h-[20rem] md:mb-3 lg:mb-6">
        <div className="w-full relative">
          <span className="absolute top-2 left-2 right-2 bg-cc-blue-700 text-sm p-3">
            Full Gym Access
          </span>
          <img
            alt="full-gym-access"
            src={fullGymAccessImg}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="shrink-0 md:w-40 bg-cc-blue-700 flex flex-col justify-center items-center text-center text-sm p-4">
          <img alt="free-parking-icon" src={freeParkingIconImg} className="-mt-6 md:-mt-10 w-28" />
          <span className="-mt-4">Free Parking</span>
        </div>
        <div className="w-full relative">
          <span className="absolute top-2 left-2 right-2 bg-cc-blue-700 text-sm p-3">
            Shooting Machine
          </span>
          <img
            alt="shooting-machine"
            src={shootingMachineImg}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="shrink-0 md:w-40 bg-cc-blue-700 flex flex-col justify-center items-center text-center text-sm p-4">
          <img alt="on-site-staff-icon" src={onSiteStaffIconImg} className="-mt-6 md:-mt-10 w-28" />
          <span className="-mt-4">On-site Staff</span>
        </div>
      </div>
      <div className="md:flex justify-between gap-3 lg:gap-6 md:h-[20rem] md:mb-3 lg:mb-6">
        <div className="w-full relative">
          <span className="absolute top-2 left-2 right-2 bg-cc-blue-700 text-sm p-3">
            Strength Training Equipment
          </span>
          <img
            alt="training-equipment"
            src={trainingEquipmentImg}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="shrink-0 md:w-40 bg-cc-blue-700 flex flex-col justify-center items-center text-center text-sm p-4">
          <img alt="free-parking-icon" src={freeParkingIconImg} className="-mt-6 md:-mt-10 w-28" />
          <span className="-mt-4">Lockers & Lounge</span>
        </div>
        <div className="w-full relative">
          <span className="absolute top-2 left-2 right-2 bg-cc-blue-700 text-sm p-3">
            Recovery Zone
          </span>
          <img alt="recovery-zone" src={recoveryZoneImg} className="w-full h-full object-cover" />
        </div>
        <div className="w-full relative">
          <span className="absolute top-2 left-2 right-2 bg-cc-blue-700 text-sm p-3">
            Group Skills Training
          </span>
          <img
            alt="skills-training"
            src={skillsTrainingImg}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="md:flex justify-between gap-3 lg:gap-6 md:h-[20rem]">
        <div className="shrink-0 md:w-40 bg-cc-blue-700 flex flex-col justify-center items-center text-center text-sm p-4">
          <img alt="officials-icon" src={officialsIconImg} className="-mt-6 md:-mt-10 w-28" />
          <span className="-mt-4">Experienced Officials</span>
        </div>
        <div className="w-full relative">
          <span className="absolute top-2 left-2 right-2 bg-cc-blue-700 text-sm p-3">
            Collaborative Workspace
          </span>
          <img alt="workspace" src={workspaceImg} className="w-full h-full object-cover" />
        </div>
        <div className="shrink-0 md:w-40 bg-cc-blue-700 flex flex-col justify-center items-center text-center text-sm p-4">
          <img alt="wifi-icon" src={wifiIconImg} className="-mt-6 md:-mt-10 w-28" />
          <span className="-mt-4">Free Wifi</span>
        </div>
        <div className="w-full relative">
          <span className="absolute top-2 left-2 right-2 bg-cc-blue-700 text-sm p-3">
            Member Events
          </span>
          <img alt="member-events" src={memberEventsImg} className="w-full h-full object-cover" />
        </div>
      </div>
    </ExpandedLayout>
  </SectionLayout>
);

MembershipIncludes.defaultProps = {
  className: '',
};

MembershipIncludes.propTypes = {
  className: PropTypes.string,
};

export default MembershipIncludes;
