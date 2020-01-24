import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import App from 'shell/Root';

import 'shared/styles/fonts.css';
import 'shared/styles/bootstrap.scss';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const GOOGLE_ANALYTICS_CODE = process.env.REACT_APP_GOOGLE_ANALYTICS_CODE;

ReactGA.initialize(GOOGLE_ANALYTICS_CODE);
ReactDOM.render(<App />, document.getElementById('root'));
