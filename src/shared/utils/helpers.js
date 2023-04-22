export const phoneRegExp = /^(1|)?(\d{3})(\d{3})(\d{4})$/;
export const zipcodeRegExp = /^(?!00000)\d{5}$/;
export const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const formatPhoneNumber = (phoneNumberString) => {
  const cleaned = phoneNumberString.replace(/\D/g, '');
  const match = cleaned.match(phoneRegExp);
  if (match) {
    const intlCode = match[1] ? '+1 ' : '';
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return phoneNumberString;
};

export const validateEmail = (email) => emailRegExp.test(String(email).toLowerCase());

export const capitalize = (string) => {
  if (!string) {
    return null;
  }

  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const titleize = (string) => {
  if (!string) {
    return;
  }

  return string
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
};

export const pluralize = (string, count, suffix = 's') =>
  count === 1 ? string : `${string}${suffix}`;

export const ordinalSuffix = (number) => {
  let suffix = '';

  if (number === 1) {
    suffix = 'st';
  } else if (number === 2) {
    suffix = 'nd';
  } else if (number === 3) {
    suffix = 'rd';
  } else {
    suffix = 'th';
  }

  return `${number}${suffix}`;
};

export const genderSelectOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];
