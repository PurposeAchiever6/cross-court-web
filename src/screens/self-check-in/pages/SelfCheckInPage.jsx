import React, { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';

import PhoneSvg from 'shared/components/svg/PhoneSvg';
import LogoSvg from 'shared/components/svg/LogoSvg';
import PageLayout from 'shared/components/layout/PageLayout';
import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';
import textureBgImg from 'shared/images/backgrounds/black-paper-texture.jpg';
import ccBallPurple from 'shared/images/logos/cc-ball-purple.png';
import { getQrData } from 'screens/self-check-in/actionCreators';
import { qrData, selectRefreshTime } from 'screens/self-check-in/reducer';
import { getAvailableLocations } from 'screens/locations/reducer';
import { getLocations } from 'screens/locations/actionCreators';
import { getUserProfile, getPageLoading } from 'screens/my-account/reducer';
import ROUTES from 'shared/constants/routes';

import theme from '~/tailwind.theme';

const APP_URL = import.meta.env.VITE_URL;

const SelfCheckInPage = () => {
  const dispatch = useDispatch();
  const { params } = useRouteMatch();
  const history = useHistory();
  const locationId = params?.id;

  const qrUrldata = useSelector(qrData);
  const refreshTimeMs = useSelector(selectRefreshTime);
  const availableLocations = useSelector(getAvailableLocations);
  const pageLoading = useSelector(getPageLoading);
  const { employee } = useSelector(getUserProfile);

  const location = availableLocations.find((loc) => loc?.id?.toString() === locationId);

  useEffect(() => {
    if (!pageLoading) {
      if (!employee) {
        history.push(ROUTES.HOME);
      }
      dispatch(getLocations());
      dispatch(getQrData(locationId));
    }
  }, [dispatch, pageLoading, employee]);

  useEffect(() => {
    if (!refreshTimeMs) {
      return;
    }

    const interval = setInterval(() => {
      dispatch(getQrData());
    }, refreshTimeMs);
    return () => {
      clearInterval(interval);
    };
  }, [refreshTimeMs]);

  return (
    <PageLayout noPadding>
      <LazyBackgroundImage
        as="div"
        img={textureBgImg}
        className="relative min-h-screen bg-no-repeat bg-cover bg-center"
      >
        <LogoSvg className="-rotate-90 w-48 absolute top-28 -left-8" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="font-shapiro95_super_wide text-5xl text-center text-white mb-4">
            Check In
          </h1>
          {location && qrUrldata ? (
            <QRCodeSVG
              value={`${APP_URL}${ROUTES.SELF_CHECK_IN_CONFIRM.replace(
                ':id',
                locationId
              )}?qrData=${qrUrldata}`}
              size={450}
              bgColor={theme.colors.white}
              fgColor={theme.colors['cc-black']}
              includeMargin
              level="H"
              imageSettings={{
                src: ccBallPurple,
                height: 80,
                width: 80,
                excavate: true,
              }}
            />
          ) : (
            <div className="w-[450px] h-[450px] bg-white flex items-center justify-center p-4">
              <p className="text-black text-center text-lg">
                Couldn't fetch data. Check url and try again.
              </p>
            </div>
          )}
          <div className="flex items-center justify-center text-cc-purple mt-8">
            <PhoneSvg className="w-20 h-20" />
            <h3 className="font-shapiro95_super_wide text-3xl text-center">Scan with phone</h3>
          </div>
        </div>
        <p className="absolute font-dharma_gothic_cheavy text-white/60 text-7xl -rotate-90 bottom-6 right-6">
          {location?.name}
        </p>
      </LazyBackgroundImage>
    </PageLayout>
  );
};

export default SelfCheckInPage;
