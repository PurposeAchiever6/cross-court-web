const LEAD_MAGNET_KEY = 'lead-magnet-dont-show-key';

const getDontShowLeadMagnetConfirmation = () => localStorage.getItem(LEAD_MAGNET_KEY);

const setDontShowLeadMagnetConfirm = () => {
  localStorage.setItem(LEAD_MAGNET_KEY, 'true');
};

const confirmDontShowLeadMagnet = () => {
  setDontShowLeadMagnetConfirm();
};

const hasConfirmDontShowLeadMagnet = () => getDontShowLeadMagnetConfirmation() === 'true';

export { confirmDontShowLeadMagnet, hasConfirmDontShowLeadMagnet };
