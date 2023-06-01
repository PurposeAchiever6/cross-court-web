import React from 'react';
import { Link } from 'react-router-dom';

import appStoreDownloadImg from 'shared/images/app-store-download.png';
import playStoreDownloadImg from 'shared/images/play-store-download.png';
import instruction2Img1 from './images/instruction-2_1.png';
import instruction3Img1 from './images/instruction-3_1.png';
import instruction3Img2 from './images/instruction-3_2.png';
import instruction3Img3 from './images/instruction-3_3.png';
import instruction4Img1 from './images/instruction-4_1.png';
import instruction5Img1 from './images/instruction-5_1.png';
import instruction5Img2 from './images/instruction-5_2.png';
import instruction6Img1 from './images/instruction-6_1.png';
import instruction6Img2 from './images/instruction-6_2.png';
import instruction7Img1 from './images/instruction-7_1.png';
import instruction7Img2 from './images/instruction-7_2.png';
import instruction7Img3 from './images/instruction-7_3.png';
import playingBasket from './images/playing-basket.png';
import basketGroup from './images/basket-group.png';

import InstructionItem from './components/InstructionItem';
import PixellotLogo from './components/PixelotLogo';

const ContentPage = () => (
  <div className="bg-cc-black p-6 md:p-12 text-white">
    <h1 className="font-shapiro95_super_wide text-3xl md:text-7xl mb-5">CONTENT</h1>

    <p className="mb-16 text-sm md:text-lg">
      We have partnered with{' '}
      <span>
        <PixellotLogo />
      </span>{' '}
      to bring our members closer to the action. Using the{' '}
      <span>
        <PixellotLogo />
      </span>{' '}
      app, members can watch, clip, edit, and upload personalized highlights all from their mobile
      devices.
    </p>

    <ol className="pl-0 sm:pl-4">
      <InstructionItem number="01">
        <p className="mb-5 md:max-w-2xl">
          Download the{' '}
          <span>
            <PixellotLogo />
          </span>{' '}
          app from the APP Store or Google Play Store.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            to={{ pathname: 'https://apps.apple.com/us/app/pixellot/id1094242485' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img alt="app-store-download" src={appStoreDownloadImg} className="h-10" />
          </Link>
          <Link
            to={{
              pathname:
                'https://play.google.com/store/apps/details?id=com.pixellot.player&hl=es&gl=US',
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img alt="play-store-download" src={playStoreDownloadImg} className="h-10" />
          </Link>
        </div>
      </InstructionItem>

      <InstructionItem number="02" className="md:justify-end md:mr-72">
        <p className="mb-5 md:max-w-2xl">
          Tap <b>SIGN UP</b> and create an account.
        </p>
        <img alt="instruction-2-img-1" src={instruction2Img1} className="w-64" />
      </InstructionItem>

      <InstructionItem number="03">
        <img
          alt="basket-group"
          src={basketGroup}
          className="hidden md:block w-96 absolute -right-20 -top-32"
        />
        <p className="mb-5 md:max-w-3xl relative z-10">
          Go through the on screen onboarding flow and find our club by searching for "Crosscourt
          DTLA". Tap <b>ASK TO JOIN</b>.
          <br />
          <br />
          <span className="font-shapiro96_inclined_wide">PLEASE NOTE:</span> Only members will be
          allowed to access{' '}
          <span>
            <PixellotLogo />
          </span>{' '}
          content. You will see a pending notification until your account is approved. Please allow
          a few hours.
        </p>
        <div className="flex flex-wrap gap-4 relative z-10">
          <img alt="instruction-3-img-1" src={instruction3Img1} className="w-64" />
          <img alt="instruction-3-img-2" src={instruction3Img2} className="w-64" />
          <img alt="instruction-3-img-2" src={instruction3Img3} className="w-64" />
        </div>
      </InstructionItem>

      <InstructionItem number="04" className="md:justify-end">
        <p className="mb-5 md:max-w-2xl">
          Once your account is approved, tap <b>MY CLUBS</b> at the bottom of the page to access
          live and pre-recorded session content. The <b>VOD</b> tab is where all of your sessions
          will be available.
        </p>
        <img alt="instruction-4-img-1" src={instruction4Img1} className="w-64" />
      </InstructionItem>

      <InstructionItem number="05">
        <p className="mb-5 md:max-w-2xl">
          Find your session and tap on it to open the video player. Rotate your mobile device{' '}
          <span className="font-shapiro96_inclined_wide">HORIZONTALLY</span> to access the video
          player and clipping features.
        </p>
        <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start md:items-end">
          <img alt="instruction-3-img-1" src={instruction5Img1} className="w-64" />
          <div>
            <p className="mb-4">
              Find your highlight then tap <b>CLIP</b> to open clipping tool.
            </p>
            <img
              alt="instruction-3-img-2"
              src={instruction5Img2}
              className="w-100 sm:w-auto sm:h-72"
            />
          </div>
        </div>
      </InstructionItem>

      <InstructionItem number="06" className="md:justify-end">
        <p className="mb-5 md:max-w-2xl">
          Tap <b>START RECORDING</b> to begin clipping and then tap <b>STOP RECORDING</b> when your
          highlight ends. The app will take a few seconds to save your clip.
        </p>
        <div className="flex flex-col">
          <img
            alt="instruction-6-img-1"
            src={instruction6Img1}
            className="w-100 pb-4 md:pb-0 mb-4"
          />
          <img alt="instruction-6-img-2" src={instruction6Img2} className="w-100" />
        </div>
      </InstructionItem>

      <InstructionItem number="07" className="relative z-10">
        <p className="mb-5 md:max-w-2xl">
          Once you’re done clipping your highlights, tap the <b>MY AREA</b> icon in the footer menu
          and then tap <b>MY CLIPS</b> to see all of your saved clips. Tap the three dots in the top
          right of the clip to download your highlight to your camera roll.
        </p>
        <div className="flex flex-wrap gap-4">
          <img alt="instruction-7-img-1" src={instruction7Img1} className="w-64" />
          <img alt="instruction-7-img-2" src={instruction7Img2} className="w-64" />
          <img alt="instruction-7-img-3" src={instruction7Img3} className="w-64" />
        </div>
      </InstructionItem>

      <InstructionItem number="08" className="relative z-10">
        <p className="md:max-w-2xl">
          Show off your highlights! Send to friends, upload to Instagram, or make a mixtape for all
          your fans to see. If you have any issues or questions, feel free to email us at{' '}
          <span className="font-shapiro95_super_wide">ccteam@cross-court.com</span>.
        </p>
      </InstructionItem>

      <img
        alt="basket-group"
        src={playingBasket}
        className="hidden md:block w-96 absolute right-0 bottom-[31rem]"
      />
      <div className="relative z-10">
        <p className="font-shapiro95_super_wide text-3xl md:text-7xl text-center uppercase mb-10">
          Let's get it!
        </p>
        <p className="text-xs md:text-lg text-center uppercase mb-10">
          "Connect. Create. Compete."
        </p>
      </div>
    </ol>
  </div>
);

export default ContentPage;
