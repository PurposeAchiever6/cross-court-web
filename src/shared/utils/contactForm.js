import { contactUsForm } from './klaviyo';

export const openContactForm = () => {
  document.querySelector('.eapps-form-floating-button').click();
};

export const openContactFormForUser = (user, message = '') => {
  const { firstName, lastName, phoneNumber, email } = user;

  openContactForm();
  autoCompleteContactForm({ firstName, lastName, phoneNumber, email, message });
};

export const autoCompleteContactForm = ({
  firstName = '',
  lastName = '',
  phoneNumber = '',
  email = '',
  message = '',
}) => {
  const firstNameInput = document.querySelector(".eapps-form-form input[name='first-name-0']");
  const lastNameInput = document.querySelector(".eapps-form-form input[name='last-name-1']");
  const phoneNumberInput = document.querySelector(".eapps-form-form input[name='phone-2']");
  const emailInput = document.querySelector(".eapps-form-form input[name='email-3']");
  const messageInput = document.querySelector(".eapps-form-form textarea[name='message-4']");

  if (firstNameInput) firstNameInput.value = firstName;
  if (lastNameInput) lastNameInput.value = lastName;
  if (phoneNumberInput) phoneNumberInput.value = phoneNumber;
  if (emailInput) emailInput.value = email;
  if (messageInput) messageInput.value = message;
};

export const addEventListenerOnSubmitContactUsForm = () => {
  document.addEventListener('click', (e) => {
    if (
      e.target &&
      (e.target.className === 'eapps-form-actions-button-label' ||
        e.target.className === 'eapps-form-actions-button eapps-form-button')
    ) {
      const email = document.querySelector(".eapps-form-form input[name='email-3']").value;

      if (email.length > 0) {
        contactUsForm({ email });
      }
    }
  });
};
