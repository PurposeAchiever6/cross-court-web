const UTM_PARAMS_KEY = 'utm-params';

const UTM_SOURCE = 'utm_source';
const UTM_MEDIUM = 'utm_medium';
const UTM_CAMPAIGN = 'utm_campaign';
const UTM_TERM = 'utm_term';
const UTM_CONTENT = 'utm_content';

const parseUrlUtmParams = (searchParams) => {
  const query = new URLSearchParams(searchParams);

  const utmSource = query.get(UTM_SOURCE);
  const utmMedium = query.get(UTM_MEDIUM);
  const utmCampaign = query.get(UTM_CAMPAIGN);
  const utmTerm = query.get(UTM_TERM);
  const utmContent = query.get(UTM_CONTENT);

  return {
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
    utmContent,
  };
};

const getUtmParams = () => {
  const savedUtmParams = JSON.parse(localStorage.getItem(UTM_PARAMS_KEY));

  return {
    ...savedUtmParams,
    utmSource: savedUtmParams.utmSource || 'web',
  };
};

const setUtmParams = (utmParams) => {
  localStorage.setItem(UTM_PARAMS_KEY, JSON.stringify(utmParams));
};

const removeUtmParams = () => {
  localStorage.removeItem(UTM_PARAMS_KEY);
};

const isUtmParamsEmpty = () =>
  !Object.values(JSON.parse(localStorage.getItem(UTM_PARAMS_KEY)) || {}).some((e) => e);

export { parseUrlUtmParams, getUtmParams, setUtmParams, removeUtmParams, isUtmParamsEmpty };
