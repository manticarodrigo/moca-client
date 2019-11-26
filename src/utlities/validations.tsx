const getPasswordError = (password: string) => {
  // lowercase letters
  if (!password.match(/[a-z]/g)) return 'Password must have at least one lowercase letter.';
  // capital letters
  if (!password.match(/[A-Z]/g)) return 'Password must have at least one capital letter.';
  // numbers
  if (!password.match(/[0-9]/g)) return 'Password must have at least one number.';
  // length
  if (password.length < 8) return 'Password must have at least eight characters.';

  return undefined;
};

const getEmailError = (email: string) => {
  // eslint-disable-next-line no-useless-escape
  const regexpEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  if (!regexpEmail.test(email)) return 'Please enter a valid email address.';

  return undefined;
};

const getZipCodeError = (zipCode: string) => {
  if (!zipCode.match('^[+ 0-9]{5}$')) return 'Please enter a valid zip code.';

  return undefined;
};

const getNumberError = (price: string) => {
  if (!price.match('^[0-9]+$')) return 'Please enter a valid number.';

  return undefined;
};

export const getValidationError = (
  text: string,
  validation?: 'email' | 'password' | 'zip' | 'number',
  required?: boolean,
) => {
  switch (validation) {
    case 'email':
      return getEmailError(text);
    case 'password':
      return getPasswordError(text);
    case 'zip':
      return getZipCodeError(text);
    case 'number':
      return getNumberError(text);
    default:
      break;
  }

  if (required && !text.trim()) {
    return 'This field is required.';
  }

  return undefined;
};
