import { INDUSTRIES_AND_OCCUPATIONS } from 'screens/my-account/constants';

export const industriesSelectOptions = () =>
  INDUSTRIES_AND_OCCUPATIONS.map((industry) => ({
    label: industry.name,
    value: industry.name,
  })).sort((a, b) => (a.value > b.value ? 1 : -1));

export const occupationsSelectOptions = (byIndustry) => {
  const industry = INDUSTRIES_AND_OCCUPATIONS.find((industry) => industry.name === byIndustry);

  if (!industry) {
    return [];
  }

  return industry.occupations
    .map((occupation) => ({ label: occupation, value: occupation }))
    .sort((a, b) => (a.value > b.value ? 1 : -1));
};
