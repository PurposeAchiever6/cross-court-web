import { INDUSTRIES } from 'screens/my-account/constants';

export const SELECT_OTHER_VALUE = '_other';

export const industriesSelectOptions = () => {
  const options = INDUSTRIES.map((industry) => ({
    label: industry,
    value: industry,
  })).sort((a, b) => (a.value > b.value ? 1 : -1));

  options.push({ label: 'Other', value: SELECT_OTHER_VALUE });

  return options;
};
