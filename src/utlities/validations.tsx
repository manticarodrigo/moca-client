export const getPasswordError = (password: string) => {
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

export const getEmailError = (email: string) => {
  // eslint-disable-next-line no-useless-escape
  const regexpEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  if (!regexpEmail.test(email)) return 'Please enter a valid email address.';

  return undefined;
};

export const getZipCodeError = (zipCode: string) => {
  if (!zipCode.match('^[+ 0-9]{5}$')) return 'Please enter a valid Zip Code.';

  return undefined;
};

export const validateZipCode = (userInput: string) => {
  const regexpNumber = new RegExp('^[+ 0-9]{5}$');
  return regexpNumber.test(userInput);
};

export const validateEmailAddress = (email: string) => {
  // eslint-disable-next-line no-useless-escape
  const regexpEmail = new RegExp('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
  return regexpEmail.test(email);
};

export const validatePrice = (userInput: string) => {
  const regexpNumber = new RegExp('^[0-9]+$');
  return regexpNumber.test(userInput);
};

export const validateServiceArea = (userInput: string) => {
  const regexpNumber = new RegExp('^[0-9]+$');
  return regexpNumber.test(userInput);
};

export const validateYearsOfExperience = (userInput: string) => {
  const regexpNumber = new RegExp('^[0-9]{2}$');
  return regexpNumber.test(userInput);
};
