import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import App from 'shell/Root';
import * as serviceWorker from './serviceWorker';

import './assets/main.css';
import 'shared/styles/fonts.css';
import 'shared/styles/bootstrap.scss';
import 'shared/styles/index.css';
import 'react-toastify/dist/ReactToastify.css';

const env = runtimeEnv();
const GOOGLE_ANALYTICS_CODE = env.REACT_APP_GOOGLE_ANALYTICS_CODE;

ReactGA.initialize(GOOGLE_ANALYTICS_CODE);
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();
