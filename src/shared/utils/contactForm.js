import { contactUsForm } from './activeCampaign';

const FIRST_NAME_ID = 'l5of37lq';
const LAST_NAME_ID = '629f0cdb66675';
const PHONE_ID = '629f0cdb666e3';
const EMAIL_ID = '629f0cdb6673d';
const MESSAGE_ID = '629f0cdb6677f';

export const openContactForm = () => {
  document.querySelector('.open-contact-us-form').click();
};

export const openContactFormForUser = (user, message = '') => {
  const { firstName, lastName, phoneNumber, email } = user;

  openContactForm();
  autoCompleteContactForm({ firstName, lastName, phoneNumber, email, message });
};

const setNativeValue = (element, value) => {
  let lastValue = element.value;
  element.value = value;
  let event = new Event('input', { target: element, bubbles: true });
  // React 15
  event.simulated = true;
  // React 16
  let tracker = element._valueTracker;
  if (tracker) {
    tracker.setValue(lastValue);
  }
  element.dispatchEvent(event);
};

export const autoCompleteContactForm = ({
  firstName = '',
  lastName = '',
  phoneNumber = '',
  email = '',
  message = '',
}) => {
  const firstNameInput = document.getElementById(FIRST_NAME_ID);
  const lastNameInput = document.getElementById(LAST_NAME_ID);
  const phoneNumberInput = document.getElementById(PHONE_ID);
  const emailInput = document.getElementById(EMAIL_ID);
  const messageInput = document.getElementById(MESSAGE_ID);

  if (firstNameInput) setNativeValue(firstNameInput, firstName);
  if (lastNameInput) setNativeValue(lastNameInput, lastName);
  if (phoneNumberInput) setNativeValue(phoneNumberInput, phoneNumber);
  if (emailInput) setNativeValue(emailInput, email);
  if (messageInput) setNativeValue(messageInput, message);
};

export const addEventListenerOnSubmitContactUsForm = () => {
  document.addEventListener('click', (e) => {
    const target = e.target;

    if (
      target &&
      target.tagName?.toLowerCase() === 'span' &&
      target.className?.includes('ButtonBase')
    ) {
      const firstName = document.getElementById(FIRST_NAME_ID)?.value;
      const lastName = document.getElementById(LAST_NAME_ID)?.value;
      const phoneNumber = document.getElementById(PHONE_ID)?.value;
      const email = document.getElementById(EMAIL_ID)?.value;

      if (email?.length > 0) {
        contactUsForm({ email, firstName, lastName, phoneNumber });
      }
    }
  });
};
