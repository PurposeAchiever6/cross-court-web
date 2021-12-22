import React from 'react';
import { Link } from 'react-router-dom';

import pixellotLogoImg from 'shared/images/pixellot-logo.png';
import appStoreDownloadImg from 'shared/images/app-store-download.png';
import playStoreDownloadImg from 'shared/images/play-store-download.png';
import instruction2Img1 from 'shared/images/content-page/instruction-2_1.png';
import instruction3Img1 from 'shared/images/content-page/instruction-3_1.png';
import instruction3Img2 from 'shared/images/content-page/instruction-3_2.png';
import instruction3Img3 from 'shared/images/content-page/instruction-3_3.png';
import instruction4Img1 from 'shared/images/content-page/instruction-4_1.png';
import instruction5Img1 from 'shared/images/content-page/instruction-5_1.png';
import instruction5Img2 from 'shared/images/content-page/instruction-5_2.png';
import instruction6Img1 from 'shared/images/content-page/instruction-6_1.png';
import instruction6Img2 from 'shared/images/content-page/instruction-6_2.png';
import instruction7Img1 from 'shared/images/content-page/instruction-7_1.png';
import instruction7Img2 from 'shared/images/content-page/instruction-7_2.png';
import instruction7Img3 from 'shared/images/content-page/instruction-7_3.png';

import InstructionItem from './components/InstructionItem';

const ContentPage = () => (
  <div className="p-4 pt-8 md:p-8">
    <h1 className="font-shapiro95_super_wide text-center text-xl md:text-3xl mb-6">CONTENT</h1>

    <p className="mb-6">
      We have partnered with{' '}
      <span>
        <img alt="pixellot-logo" src={pixellotLogoImg} className="inline-block h-4 -mt-1" />
      </span>{' '}
      to bring our members closer to the action. Using the{' '}
      <span>
        <img alt="pixellot-logo" src={pixellotLogoImg} className="inline-block h-4 -mt-1" />
      </span>{' '}
      app, members can watch, clip, edit, and upload personalized highlights all from their mobile
      devices.
    </p>

    <ol className="pl-0 sm:pl-4">
      <InstructionItem number={1}>
        <p className="mb-5">
          Download the{' '}
          <span>
            <img alt="pixellot-logo" src={pixellotLogoImg} className="inline-block h-4 -mt-1" />
          </span>{' '}
          app from the store.
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

      <InstructionItem number={2}>
        <p className="mb-5">Tap sign up and create an account.</p>
        <img alt="instruction-2-img-1" src={instruction2Img1} className="w-64" />
      </InstructionItem>

      <InstructionItem number={3}>
        <p className="mb-5">
          Go through the on screen onboarding flow and find our club by searching for "Crosscourt
          DTLA". Tap "Ask to join".
          <br />
          <span className="font-shapiro95_super_wide">Please note:</span> only members will be
          allowed to access pixelot content. You will see a pending notification until your account
          is approved. Please allow a few hours.
        </p>
        <div className="flex flex-wrap gap-4">
          <img alt="instruction-3-img-1" src={instruction3Img1} className="w-64" />
          <img alt="instruction-3-img-2" src={instruction3Img2} className="w-64" />
          <img alt="instruction-3-img-2" src={instruction3Img3} className="w-64" />
        </div>
      </InstructionItem>

      <InstructionItem number={4}>
        <p className="mb-5">
          Once your account is approved, tap "My clubs" at the bottom of the page to access live and
          pre recorded session content. The "vod" tab is where all of your sessions will be
          available.
        </p>
        <img alt="instruction-4-img-1" src={instruction4Img1} className="w-64" />
      </InstructionItem>

      <InstructionItem number={5}>
        <p className="mb-5">
          Find your session and tap on it to open the video player. Rotate your mobile device{' '}
          <span className="font-shapiro95_super_wide">horizontally</span> to access the video player
          and clipping features.
        </p>
        <div className="flex flex-wrap gap-4">
          <img alt="instruction-3-img-1" src={instruction5Img1} className="w-64" />
          <div>
            <p className="mb-4">Find your highlight then tap "clip" to open clipping tool</p>
            <img
              alt="instruction-3-img-2"
              src={instruction5Img2}
              className="w-100 sm:w-auto sm:h-72"
            />
          </div>
        </div>
      </InstructionItem>

      <InstructionItem number={6}>
        <p className="mb-5">
          Tap "start recording" to begin clipping and then tap "stop recording" when your highlight
          ends. The app will take a few seconds to save your clip.
        </p>
        <div className="md:flex">
          <img
            alt="instruction-6-img-1"
            src={instruction6Img1}
            className="w-100 md:w-1/2 md:pr-2 pb-4 md:pb-0"
          />
          <img
            alt="instruction-6-img-2"
            src={instruction6Img2}
            className="w-100 md:w-1/2 md:pl-2"
          />
        </div>
      </InstructionItem>

      <InstructionItem number={7}>
        <p className="mb-5">
          Once you’re done clipping your highlights, tap the "My area" icon in the footer menu and
          then tap "My clips" to see all of your saved clips. Tap the three dots in the top right of
          the clip to download your highlight to your camera roll.
        </p>
        <div className="flex flex-wrap gap-4">
          <img alt="instruction-7-img-1" src={instruction7Img1} className="w-64" />
          <img alt="instruction-7-img-2" src={instruction7Img2} className="w-64" />
          <img alt="instruction-7-img-3" src={instruction7Img3} className="w-64" />
        </div>
      </InstructionItem>
    </ol>
  </div>
);

export default ContentPage;
