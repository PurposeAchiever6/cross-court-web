export const isOnboardingTourEnable = (id) => localStorage.getItem(id) !== 'true';

export const disableOnboardingTour = (id) => {
  localStorage.setItem(id, true);
};
