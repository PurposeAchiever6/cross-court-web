export const phoneRegExp = /^(1|)?(\d{3})(\d{3})(\d{4})$/;
export const zipcodeRegExp = /^(?!00000)\d{5}$/;

export const formatPhoneNumber = phoneNumberString => {
  const cleaned = phoneNumberString.replace(/\D/g, '');
  const match = cleaned.match(phoneRegExp);
  if (match) {
    const intlCode = match[1] ? '+1 ' : '';
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return phoneNumberString;
};
