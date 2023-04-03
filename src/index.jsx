import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga';

import App from 'shell/Root';
import * as serviceWorker from './serviceWorker';

import './assets/main.css';
import 'shared/utils/eventListeners';
import 'shared/styles/fonts.css';
import 'shared/styles/index.css';
import 'react-toastify/dist/ReactToastify.css';

import 'external-tools/gtm';
import 'external-tools/hotjar';
import 'external-tools/activeCampaign';
import 'external-tools/activeCampaignModal';

const GOOGLE_ANALYTICS_CODE = import.meta.env.VITE_GOOGLE_ANALYTICS_CODE;
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

ReactGA.initialize(GOOGLE_ANALYTICS_CODE);
root.render(<App />);
serviceWorker.unregister();
